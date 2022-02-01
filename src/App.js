import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import InfoModal from "./components/InfoModal";
import "./scss/home.css";
import CovidTips from "./components/CovidTips";
import axios from "axios";
import InfoBox from "./components/InfoBox";

function App() {
  //use state for tooltip content
  const [content, setContent] = useState("");
  //use state for api data
  const [stats, setStats] = useState("");

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);

  return (
    <>
      <div className="app-container">
        <div className="info">
          <h1>COVID-19 Tracker</h1>
          <InfoModal stats={stats} />
        </div>
        <div className="map-container">
          <ReactTooltip>{content}</ReactTooltip>
          <MapChart setToolTipContent={setContent} setStats={setStats} />
        </div>
        <div className="info-box">
          <InfoBox />
        </div>
        <div className="covid-tips">
          <CovidTips />
        </div>
      </div>
    </>
  );
}
export default App;
