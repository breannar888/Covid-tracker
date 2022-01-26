import { createContext, useContext, useState } from "react";

const MapContext = createContext();

function MapContextProvider(props) {
  const [covidINFO, setcovidINFO] = useState("");
  const [showINFO, setshowINFO] = useState(false);

  const value = {
    covidINFO,
    showINFO,
    setcovidINFO,
  };

  return (
    <MapContext.Provider value={value}>{props.children}</MapContext.Provider>
  );
}
export default MapContextProvider;

export const MapState = () => {
  return useContext(MapContext);
};
