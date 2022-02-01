import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import numeral from "numeral";

import "../scss/infobox.css";

const worldwide = "https://corona.lmao.ninja/v2/all?yesterday";

const InfoBox = ({}) => {
  const [worldwidedata, setWorldwidedata] = useState(null);

  const formatStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  //get covid worldwide data from api
  useEffect(() => {
    let isMounted = true;

    axios.get(worldwide).then((responses) => {
      if (isMounted) {
        setWorldwidedata(responses.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [worldwide]);

  const useStyles = makeStyles({
    worldwideStats: {
      borderRadius: "5%",
      border: "1px solid rgba(128, 128, 128, 0.432)",
      borderTop: "0px",
      backgroundColor: "white",
      color: "gray",
      "& p": {
        borderTop: "7px solid #ff8800",
        borderRadius: 8,
        paddingBottom: 3,
        paddingTop: 10,
        fontSize: 18,
      },
      "& div": {
        color: "red",
        paddingTop: 10,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold",
      },
    },
  });
  const classes = useStyles();
  if (worldwidedata) {
    return (
      <div className="worldwide-stats">
        <Box className={classes.worldwideStats}>
          <Typography>Worldwide Cases</Typography>
          <div>{formatStat(worldwidedata.todayCases)}</div>
          <span>{worldwidedata.cases.toLocaleString()}</span>
        </Box>
        <Box className={classes.worldwideStats}>
          <Typography>Worldwide Deaths</Typography>
          <div>{formatStat(worldwidedata.todayDeaths)}</div>
          <span>{worldwidedata.deaths.toLocaleString()}</span>
        </Box>
        <Box className={classes.worldwideStats}>
          <Typography>Worldwide Recovered</Typography>
          <div>{formatStat(worldwidedata.todayRecovered)}</div>
          <span>{worldwidedata.recovered.toLocaleString()}</span>
        </Box>
      </div>
    );
  }
  return <div>Loading...</div>;
};
export default InfoBox;
