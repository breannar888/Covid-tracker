import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import "./scss/home.css";

function App() {
  const [content, setContent] = useState("");
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);
  return (
    <div className="home">
      <ReactTooltip>{content}</ReactTooltip>
      <MapChart setToolTipContent={setContent} />
    </div>
  );
}
export default App;
