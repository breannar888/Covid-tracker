import React from "react";
import { MapState } from "../context/Context";
import "../scss/infomodal.css";

const InfoModal = ({}) => {
  const { covidINFO } = MapState();
  if (covidINFO) {
    return (
      <div className="info-wrapper">
        <h2>{covidINFO.country}</h2>
        <div>
          <img src={covidINFO.countryInfo.flag} alt={covidINFO.country} />
        </div>
        <div>Cases: {covidINFO.cases.toLocaleString()}</div>
        <div>Deaths: {covidINFO.deaths.toLocaleString()}</div>
        <div>Recovered: {covidINFO.recovered.toLocaleString()}</div>
        <div>Tests: {covidINFO.tests.toLocaleString()}</div>
        <div>Cases Today: {covidINFO.todayCases.toLocaleString()}</div>
        <div>Deaths Today: {covidINFO.todayDeaths.toLocaleString()}</div>
        <div>Recovered Today: {covidINFO.todayRecovered.toLocaleString()}</div>
      </div>
    );
  }
  return <div>No Data</div>;
};

export default InfoModal;
