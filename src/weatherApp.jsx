import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";
import React, { useEffect, useState } from "react";

export default function WeatherApp({ city }) {
  let [weatherInfo, setWeatherInfo] = useState({
    city: "Ahmedabad",
    temp: 26.02,
    tempMin: 26.02,
    tempMax: 26.02,
    humidity: 50,
    weather: "smoke",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Search Weather for any city</h2>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
