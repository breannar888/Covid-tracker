import React, { useEffect, useState } from "react";
import axios from "axios";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 100000])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);
  console.log("countries:", country);
  if (country) {
    return (
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 130,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {country.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = country.find((s) => s.country === geo.properties.NAME);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["cases"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    );
  }
  return <div>loading...</div>;
};

export default MapChart;

/*
const MapChart = () => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);
  console.log("countries:", country);
  if (country) {
    return (
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 130,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {country.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = country.find(
                  (s) => s.cases === geo.properties.country
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    );
  }
  return <div>loading...</div>;
};
*/
