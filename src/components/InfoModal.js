import React from "react";
import { motion } from "framer-motion";
import "../scss/infomodal.css";

const flag = {
  hidden: {
    rotateZ: 0,
    translateX: 0,
    scaleX: 1,
  },
  active: {
    rotateZ: [-5, 8, 10, 8, -5],
    translateX: [-20, 15, 25, 15, -20],
    translateY: [0, -10, 5, -10, 0],
    transition: {
      duration: 2.3,
      times: [0, 0.3, 0.5, 0.7, 1],
      ease: "linear",
      repeat: Infinity,
    },
  },
};
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
  return (
    <div className="svg-container">
      <h2>No Data</h2>
      <motion.svg
        className="svg-wrapper"
        variants={flag}
        initial="hidden"
        animate="active"
        width="150"
        height="250"
        viewBox="0 0 255 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="255" height="320" fill="white" />
        <motion.path
          d="M35 57.3694V175.182C35 175.182 114.821 162.092 130.5 175.182C146.179 188.272 226 175.182 226 175.182V57.3694C226 57.3694 130.5 73.9504 130.5 57.3694C130.5 40.7883 35 57.3694 35 57.3694Z"
          fill="#64ADD7"
          stroke="black"
        />
        <motion.line
          x1="31.5008"
          y1="62.4992"
          x2="31.8739"
          y2="288.5"
          stroke="black"
          stroke-linecap="square"
        />
      </motion.svg>
    </div>
  );
};

export default InfoModal;
