import { createContext, useContext, useState } from "react";

const MapContext = createContext();

function MapContextProvider(props) {
  const [covidINFO, setcovidINFO] = useState("");
  const [mapData, setmapData] = useState();

  const value = {
    covidINFO,
    setcovidINFO,
    setmapData,
    mapData,
  };

  return (
    <MapContext.Provider value={value}>{props.children}</MapContext.Provider>
  );
}
export default MapContextProvider;

export const MapState = () => {
  return useContext(MapContext);
};
