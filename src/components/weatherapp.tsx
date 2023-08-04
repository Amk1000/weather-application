import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherApp() {
  const [data, setData] = useState<any>({});
  let [location, setLocation] = useState("");
  let urlUsingCity = `https://api.openweathermap.org/data/2.5/weather?q=param1&units=imperial&appid=ca5284c995299429d40a6a08d2af2606`;
  let urlUsingCoords = `https://api.openweathermap.org/data/2.5/weather?lat=param1&lon=param2&appid=ca5284c995299429d40a6a08d2af2606`;
  let latitude = 0;
  let longitude = 0;
  useEffect(() => {
    getCurrLocation();
  }, []);

  const getCurrLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        urlUsingCoords = urlUsingCoords.replace("param1", String(latitude));
        urlUsingCoords = urlUsingCoords.replace("param2", String(longitude));
        axios
          .get(urlUsingCoords)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            window.alert("No city with such name exists!");
          });
      });
    } else {
      window.alert(
        "Cannot fetch current location using geolocation, check your browser settings"
      );
    }
  };

  const searchLocation = (event: any) => {
    if (event.key === "Enter") {
      urlUsingCity = urlUsingCity.replace("param1", location);
      axios
        .get(urlUsingCity)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          window.alert("No city with such name exists!");
        });
    }
  };
  const getTime = (timestamp: number) => {
    timestamp = timestamp*1000
    const date = new Date(timestamp);
    const istTimeString = date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    return istTimeString;
  };

  return (
    <div className="app-wrapper">
      <div className="search">
        <input
          className="searchbox"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter City name"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.main ? (
              <p>
                {data.name} , {data.sys.country}
              </p>
            ) : null}
            {data.main ? (
              <p className="coordinate">
                Lat: {data.coord.lat},Lon: {data.coord.lon}
              </p>
            ) : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.main.pressure} Pa</p>
              ) : null}
              <p>Pressure</p>
            </div>
            <div className="wind">
              {data.main ? <p>{getTime(data.sys.sunrise)}</p> : null}
              <p>Sunrise</p>
            </div>
            <div className="wind">
              {data.main ? <p>{getTime(data.sys.sunset)}</p> : null}
              <p>Sunset</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
