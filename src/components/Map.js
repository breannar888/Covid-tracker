import React, { useEffect, useState } from "react";
import axios from "axios";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { memo } from "react";
import { MapState } from "../context/Context";
import "../scss/map.css";
import InfoModal from "./InfoModal";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 3000000])
  .range(["#ffeedb", "#ff8800"]);

const mapWidth = 400;
const mapHeight = 200;

const MapChart = ({ setToolTipContent }) => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const { covidINFO, showINFO, setcovidINFO } = MapState();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);

  if (country) {
    return (
      <div className="map-container">
        <h1>Covid Tracker</h1>
        <ComposableMap
          data-tip=""
          width={mapWidth}
          height={mapHeight}
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 70,
          }}
          style={{
            backgroundColor: "pink",
          }}
        >
          <ZoomableGroup
            translateExtent={[
              [0, -mapHeight],
              [mapWidth, mapHeight],
            ]}
          >
            {country.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = country.find(
                      (s) => s.countryInfo.iso3 === geo.properties.ISO_A3
                    );
                   //if (d) null, return "no data"
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d["cases"]) : "#F5F4F6"}
                        onMouseEnter={() => {
                          const { NAME } = geo.properties;
                          setToolTipContent(
                            `${NAME} - Cases ${d.cases.toLocaleString()} - Deaths ${d.deaths.toLocaleString()}`
                          );
                        }}
                        onMouseLeave={() => {
                          setToolTipContent("");
                        }}
                        onClick={() => {
                          setcovidINFO(d);
                        }}
                        style={{
                          hover: {
                            fill: "black",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
        <InfoModal />
      </div>
    );
  }
  return <span>loading...</span>;
};

export default memo(MapChart);
