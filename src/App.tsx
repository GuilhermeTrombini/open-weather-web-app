import React from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import CloudWaves from "./components/CloudWaves/cloudWaves";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <WeatherCard />
        <CloudWaves />
      </div>
    </div>
  );
}

export default App;
