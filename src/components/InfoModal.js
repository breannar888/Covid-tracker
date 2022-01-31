import React from "react";
import "../scss/infomodal.css";

const InfoModal = ({stats}) => {
  if (stats) {
    return (
      <div className="info-wrapper">
        <h2>{stats.country}</h2>
        <img src={stats.countryInfo.flag} alt={stats.country}/>
        <div className="data">
          <h4>Cases:</h4> <p>{stats.cases}</p>
        </div>
        <div className="data">
          <h4>Deaths:</h4> <p>{stats.deaths}</p>
        </div>
        <div className="data">
          <h4>Recovered:</h4> <p>{stats.recovered}</p>
        </div>
        <div className="data">
          <h4>Tests:</h4> <p>{stats.tests}</p>
        </div>
        <div className="data">
          <h4>Cases Today:</h4> <p>{stats.todayCases}</p>
        </div>
        <div className="data">
          <h4>Deaths Today:</h4> <p>{stats.todayDeaths}</p>
        </div>
        <div className="data">
          <h4>Recovered Today:</h4>
          <p>{stats.todayRecovered}</p>
        </div>
      </div>
    );
  }
  return (<div>No Data</div>);
    
};

export default InfoModal;
