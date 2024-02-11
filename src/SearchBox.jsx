import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBox({ updateInfo, showInfo }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [ CurrentLocation, setCurrentLocation ] =useState("");
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_KEY = "0a53f46e946e5ff22df4b471f28f8487";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const limit = 10;

  // Geolocation code, Fetching Current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

        if (lat && lng) {
          try {
            let response = await axios.get(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${API_KEY}`
            );
            console.log(response);
            setCity(response.data[0].name);
            setCurrentLocation(response.data[0].name);
            console.log(CurrentLocation,"This is current location")
          } catch (err) {
            console.error(err);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, [lat, lng]);

  useEffect(() => {
    if (city) {
      console.log(city, "This is second useEffect");
    }
  }, [city]);
  
  useEffect(() => {
    if (CurrentLocation) {
      console.log(city, "This is second useEffect");
    }
  }, [CurrentLocation]);

  // Fetching weather info
  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          // label="City"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists!</p>}
      </form>
    </div>
  );
}
