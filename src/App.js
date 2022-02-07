import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import InfoModal from "./components/InfoModal";
import "./scss/home.css";
import CovidTips from "./components/CovidTips";
import DropdownCountry from "./components/Dropdown";
import InfoBox from "./components/InfoBox";
import axios from "axios";

function App() {
  //get country api
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const [country, setCountry] = useState(null);

  //get covid country data from api
  useEffect(() => {
    //isMounted boolean flag to catch memory leaks
    let isMounted = true;
    axios
      .get(url)
      .then((response) => {
        if (isMounted) {
          setCountry(response.data);
          console.log(isMounted);
        }
        return () => {
          isMounted = false;
          console.log(isMounted);
        };
      })
      .catch((error) => {
        console.log(error.response);
      });
  });

  //use state for tooltip content
  const [content, setContent] = useState("");
  //use state for stats displayed from selected api data
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
          <MapChart
            setToolTipContent={setContent}
            setStats={setStats}
            country={country}
          />
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
/*<DropdownCountry
            country={country}
            setStats={setStats}
            stats={stats}
          /> */