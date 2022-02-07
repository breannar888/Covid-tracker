import React from "react";
import "../scss/infomodal.css";

const InfoModal = ({ stats }) => {
  if (stats) {
    return (
      <div className="info-wrapper">
        <h2>{stats.country}</h2>
        <img src={stats.countryInfo.flag} alt={stats.country} />
        <div className="data">
          <h4>Cases:</h4> <p>{stats.cases.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Deaths:</h4> <p>{stats.deaths.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Recovered:</h4> <p>{stats.recovered.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Tests:</h4> <p>{stats.tests.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Cases Today:</h4> <p>{stats.todayCases.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Deaths Today:</h4> <p>{stats.todayDeaths.toLocaleString()}</p>
        </div>
        <div className="data">
          <h4>Recovered Today:</h4>
          <p>{stats.todayRecovered.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  return <div>No Data</div>;
};

export default InfoModal;
