import React from "react";
import { MapState } from "../context/Context";
import "../scss/infomodal.css";

const InfoModal = ({}) => {
  const { covidINFO } = MapState();
  if (covidINFO) {
    return (
      <div className="info-wrapper">
        <h2>{covidINFO.country}</h2>
        <img src={covidINFO.countryInfo.flag} alt={covidINFO.country} />
        <div className="data">
          <h4>Cases:</h4> <p>{covidINFO.cases.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Deaths:</h4> <p>{covidINFO.deaths.toLocaleString()}<p/></p>
        </div>
        <div className="data">
          <h4>Recovered:</h4> <p>{covidINFO.recovered.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Tests:</h4> <p>{covidINFO.tests.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Cases Today:</h4> <p>{covidINFO.todayCases.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Deaths Today:</h4> <p>{covidINFO.todayDeaths.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Recovered Today:</h4> <p>{covidINFO.todayRecovered.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  return <div>No Data</div>;
};

export default InfoModal;
/* <div>
          <p>Deaths:</p> {covidINFO.deaths.toLocaleString()}
        </div>
        <div>
          <p>Recovered:</p> {covidINFO.recovered.toLocaleString()}
        </div>
        <div>
          <p>Tests:</p> {covidINFO.tests.toLocaleString()}
        </div>
        <div>
          <p>Cases Today:</p> {covidINFO.todayCases.toLocaleString()}
        </div>
        <div>
          <p>Deaths Today:</p> {covidINFO.todayDeaths.toLocaleString()}
        </div>
        <div>
          <p>Recovered Today:</p> {covidINFO.todayRecovered.toLocaleString()}
        </div> */
