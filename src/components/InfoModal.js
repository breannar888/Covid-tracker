import React, { useEffect, useState } from "react";
import { MapState } from "../context/Context";

const InfoModal = ({}) => {
  const { covidINFO, showINFO } = MapState();
  if (covidINFO) {
    return (
      <div className="info-wrapper">
        Info Modal
        <div>
          Country Flag: <img src={covidINFO.countryInfo.flag} />
        </div>
        <div>Country: {covidINFO.country}</div>
        <div>Cases: {covidINFO.cases}</div>
        <div>Deaths: {covidINFO.deaths}</div>
        <div>Recovered: {covidINFO.recovered}</div>
        <div>Population % infected: </div>
        <div>Tests: {covidINFO.tests}</div>
        <div>Cases Today: {covidINFO.todayCases}</div>
        <div>Deaths Today: {covidINFO.todayDeaths}</div>
        <div>Recovered Today: {covidINFO.todayRecovered}</div>
      </div>
    );
  }
  return (<div>No Data Available</div>)
};

export default InfoModal;
