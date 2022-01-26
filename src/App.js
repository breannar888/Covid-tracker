import MapChart from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import MapContextProvider from "./context/Context";
import { Modal } from "bootstrap";
import "./scss/home.css";

function App() {
  const [content, setContent] = useState("");
  //use state for covid info here
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);
  return (
    <>
      <MapContextProvider>
        <ReactTooltip>{content}</ReactTooltip>
        <MapChart setToolTipContent={setContent} />
      </MapContextProvider>
    </>
  );
}
export default App;
