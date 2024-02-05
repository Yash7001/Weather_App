import React, { useEffect, useState } from "react";
import WeatherApp from "./weatherApp";
import SearchBox from "./SearchBox";
import axios from "axios";

let API_KEY = "0a53f46e946e5ff22df4b471f28f8487";
const limit = 10;
const Geolocation = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [city, setCity] = useState("");
  
// My name is yash
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
    let currLocation = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${API_KEY}`;
    axios.get(currLocation).then((response) => {
      console.log(response);
      console.log(response.data[0].name);
      setCity(response.data[0].name)
    });
  }, [lat , lng]);

  return (
    <div>
      {location ? (
        <div>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <p>City: {city}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Geolocation;

