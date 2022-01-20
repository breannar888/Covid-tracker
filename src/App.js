import { useState, useEffect } from "react";
import axios from "axios";
import MapChart from "./components/Map";

function App() {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);
  console.log("countries:", country);

return <div> <MapChart /></div> 
}

export default App;
/*
 if (country) {
    return (
      <div>
       
        {country.map((countries) => (
          <div key={countries.country}>
            <p>
              {countries.country}: {countries.cases}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return <div>loading...</div>; */