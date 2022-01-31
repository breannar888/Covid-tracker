import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import InfoModal from "./components/InfoModal";
import SearchBar from "./components/SearchBar";
import "./scss/home.css";
import CovidTips from "./components/CovidTips";
import InfoBox from "./components/InfoBox";

function App() {
  const [content, setContent] = useState("");
  const [stats, setStats] = useState("");
  //use state for covid info here
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);
  return (
    <>
      <div className="app-container">
        <div className="info">
          <div className="search-bar">
            <SearchBar />
          </div>
          <InfoModal stats={stats}/>
        </div>
        <div className="map-container">
          <ReactTooltip>{content}</ReactTooltip>
          <MapChart setToolTipContent={setContent} setStats={setStats}/>
        </div>
        <div className="info-box">
        <h1>Covid Tracker</h1>
          <InfoBox/>
        </div>
        <div className="covid-tips">
          <CovidTips />
        </div>
      </div>
    </>
  );
}
export default App;
