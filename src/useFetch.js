import axios from "axios";
import { useState, useEffect } from "react";

function useFetch() {
  const url = "https://api.covidtracking.com/v1/states/info.json";
  const [data, setdata] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setdata(response.data);
    });
  }, [url]);

  if (data) {
    return <div>{data.state}</div>;
  }

  return <></>;
}

export default useFetch;
