import { useState, useEffect } from "react";
import axios from "axios";
import MapChart from "./components/Map";

function App() {
  const url = "https://api.covid19api.com/summary";
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);
  console.log("countries:", country);

  if (country) {
    return (
      <div>
        <MapChart />
        {country.Countries.map((countries) => (
          <div key={countries.ID}>{countries.Country}</div>
        ))}
      </div>
    );
  }
  return <div>loading...</div>;
}

export default App;
