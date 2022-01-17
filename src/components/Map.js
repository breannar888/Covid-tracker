import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { csv } from "d3-fetch";
import axios from "axios";
import { scaleLinear } from "d3-scale";
import { useState, useEffect } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const coviddata =
    "https://covid.ourworldindata.org/data/latest/owid-covid-latest.csv";
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(coviddata).then((response) => {
      setData(response.data);
    });
  }, [coviddata]);
  console.log("coviddata", data);

  return <div></div>;
};

export default MapChart;
/*
<ComposableMap>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["2017"]) : "#986bc2"}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
*/
