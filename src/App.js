import useFetch from "./useFetch";

function App() {
  const { data, loading, error } = useFetch(
    "https://api.covidtracking.com/v1/states/info.json"
  );

  if (loading) return <h1>loading...</h1>;

  if (error) console.log(error);

  if(data) return <div>data loaded</div>
  return (
    <div>
      <header>
        <p>Covid Tracker - no data</p>
      </header>
      
    </div>
  );
}

export default App;
