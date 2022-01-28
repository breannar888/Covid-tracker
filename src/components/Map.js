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
import Box from '@mui/material/Box';
import InfoModal from "./InfoModal";
import { Button } from "@mui/material";
import SearchBar from "./SearchBar";
//get map data
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 3000000])
  .range(["#ffeedb", "#ff8800"]);

const mapWidth = 550;
const mapHeight = 220;

const MapChart = ({ setToolTipContent }) => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const { setcovidINFO } = MapState();

  const [country, setCountry] = useState(null);
  const [mapData, setmapData] = useState("cases");

  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);

  if (country) {
    return (
      <div className="map-container">
        <div className="map-wrapper">
          <div className="map">
          
            <ComposableMap
              data-tip=""
              width={mapWidth}
              height={mapHeight}
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 70,
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
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={d ? colorScale(d[mapData]) : "#F5F4F6"}
                            onMouseEnter={() => {
                              const { NAME } = geo.properties;
                              if (d) {
                                setToolTipContent(
                                  `${NAME}: ${mapData} - ${d[
                                    mapData
                                  ].toLocaleString()}`
                                );
                              }
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
          </div>
          <div className="buttons">
            <Button
              onClick={() => {
                setmapData("cases");
              }}
            >
              Cases
            </Button>
            <Button
              onClick={() => {
                setmapData("deaths");
              }}
            >
              Deaths
            </Button>
            <Button
              onClick={() => {
                setmapData("tests");
              }}
            >
              Vaccinations
            </Button>
            <Button
              onClick={() => {
                setmapData("recovered");
              }}
            >
              Recovered
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return <span>loading...</span>;
};

export default memo(MapChart);
