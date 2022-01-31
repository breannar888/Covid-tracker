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
import "../scss/map.css";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

//get map data
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
const colorScale = scaleLinear()
  .domain([1, 3000000])
  .range(["#ffeedb", "#ff8800"]);
//set map width and height
const mapWidth = 550;
const mapHeight = 210;

const MapChart = ({ setToolTipContent, setStats }) => {
  const [country, setCountry] = useState(null);
  const [mapData, setmapData] = useState("cases");
  console.log(country);

  //get covid country data from api
  useEffect(() => {
    //isMounted boolean flag to prevent memory leaks
    let isMounted = true;
    axios.get(url).then((response) => {
      if (isMounted) {
        setCountry(response.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [url]);

  //style for mui components
  const useStyles = makeStyles({
    //!button styles not rendering
    btnsMap: {
      color: "white",
      background: "black",
    },
  });
  const classes = useStyles();
  if (country) {
    return (
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
                            setStats(d);
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
            className={classes.btnsMap}
            onClick={() => {
              setmapData("cases");
            }}
          >
            Cases
          </Button>
          <Button
            className={classes.btnsMap}
            onClick={() => {
              setmapData("deaths");
            }}
          >
            Deaths
          </Button>
          <Button
            className={classes.btnsMap}
            onClick={() => {
              setmapData("tests");
            }}
          >
            Vaccinations
          </Button>
          <Button
            className={classes.btnsMap}
            onClick={() => {
              setmapData("recovered");
            }}
          >
            Recovered
          </Button>
        </div>
      </div>
    );
  }
  return <span>loading...</span>;
};

export default memo(MapChart);
