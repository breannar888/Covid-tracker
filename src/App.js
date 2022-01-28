import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import MapContextProvider from "./context/Context";
import InfoModal from "./components/InfoModal";
import SearchBar from "./components/SearchBar";
import "./scss/home.css";
import CovidTips from "./components/CovidTips";

function App() {
  const [content, setContent] = useState("");
  //use state for covid info here
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);
  return (
    <>
      <MapContextProvider>
        <h1>Covid Tracker</h1>
        <div className="app-container">
          <div className="info">
            <div className="search-bar">
              <SearchBar />
            </div>
            <InfoModal />
          </div>
          <div className="map-container">
            <ReactTooltip>{content}</ReactTooltip>
            <MapChart setToolTipContent={setContent} />
          </div>
          <div className="covid-tips"><CovidTips/></div>
        </div>
      </MapContextProvider>
    </>
  );
}
export default App;
