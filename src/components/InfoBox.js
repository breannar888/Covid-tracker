import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import "../scss/infobox.css";

const worldwide = "https://corona.lmao.ninja/v2/all?yesterday";

const InfoBox = ({}) => {
  const [worldwidedata, setWorldwidedata] = useState(null);
  console.log(worldwide);

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
if (worldwidedata) {
  return (
    <div className="worldwide-stats">
      <Box className={classes.worldwideStats}>
        <Typography>Worldwide Cases</Typography>
        <div>{worldwidedata.todayCases}</div>
        <span>{worldwidedata.cases}</span>
      </Box>
      <Box className={classes.worldwideStats}>
        <Typography>Worldwide Deaths</Typography>
        <div>{worldwidedata.todayDeaths}</div>
        <span>{worldwidedata.deaths}</span>
      </Box>
      <Box className={classes.worldwideStats}>
        <Typography>Worldwide Recovered</Typography>
        <div>{worldwidedata.todayRecovered}</div>
        <span>{worldwidedata.recovered}</span>
      </Box>
    </div>
  );
}
return (<div>Loading...</div>)
  
};
export default InfoBox;
