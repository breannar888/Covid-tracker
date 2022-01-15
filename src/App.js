import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const url = "https://api.covidtracking.com/v1/states/info.json";
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setCountry(response.data);
    });
  }, [url]);
  console.log(country);

  if (country) {
    return (
      <div>
        {country.map((countries) => (
          <h3>State: {countries.name}</h3>
        ))}
      </div>
    );
  }
  return <div>no data</div>;
}

export default App;
