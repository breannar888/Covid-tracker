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
import { Button, ButtonBase } from '@mui/material';
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

//get map data
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 3000000])
  .range(["#ffeedb", "#ff8800"]);

const mapWidth = 550;
const mapHeight = 210;

const MapChart = ({ setToolTipContent }) => {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const { setcovidINFO } = MapState();

  const [country, setCountry] = useState(null);
  const [mapData, setmapData] = useState("cases");

  //get covid data from api
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);

  //style for mui components
  const useStyles = makeStyles({
    //!button styles not rendering
    btnsMap: {
      color: "white",
      background: "black",
    },
    worldwideStats: {
      borderRadius: "5%",
      border: "1px solid rgba(128, 128, 128, 0.432)",
      borderTop: "0px",
      "& p": {
        borderTop: "10px solid red",
        borderRadius: 8,
        paddingBottom: 3,
        paddingTop: 10,
        fontSize: 18,
      },
      "& div": {
        color: "grey",
        paddingTop: 10,
        marginBottom: 25,
        fontSize: 25,
      },
    },
  });
  const classes = useStyles();
  if (country) {
    return (
      <div className="map-wrapper">
        <h1>Covid Tracker</h1>
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
        <div className="worldwide-stats">
          <Box className={classes.worldwideStats}>
            <Typography>Worldwide Cases</Typography>
            <div>37mil+</div>
            <span>140mil total</span>
          </Box>
          <Box className={classes.worldwideStats}>
            <Typography>Worldwide Deaths</Typography>
            <div>hihi</div>
            <span>140mil total</span>
          </Box>
          <Box className={classes.worldwideStats}>
            <Typography>Worldwide Vaccinations</Typography>
            <div>hihi</div>
            <span>140mil total</span>
          </Box>
        </div>
      </div>
    );
  }
  return <span>loading...</span>;
};

export default memo(MapChart);
