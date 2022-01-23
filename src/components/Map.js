import React, { useEffect, useState } from "react";
import axios from "axios";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import { memo } from "react";
import "../scss/home.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([10000, 2000000])
  .range(["#ffeedb", "#ff8800"]);
const MapChart = ({ setToolTipContent }) => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const [country, setCountry] = useState(null);
  console.log(country);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);

  if (country) {
    return (
      <>
        <ComposableMap
          data-tip=""
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 137,
          }}
        >
          <ZoomableGroup>
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
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
                        fill={d ? colorScale(d["cases"]) : "#F5F4F6"}
                        onMouseEnter={() => {
                          const { NAME } = geo.properties;
                          setToolTipContent(`${NAME} - Cases ${d.cases}`);
                        }}
                        onMouseLeave={() => {
                          setToolTipContent("");
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </>
    );
  }
  return <span>loading...</span>;
};

export default memo(MapChart);
/*
country.map((countries) => {
                            
                          })
  
*/
