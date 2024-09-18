import React, { useContext } from 'react';
// import "../css/weather.css"; // Ensure path to CSS file is correct
import { WeatherContext } from '../WeatherContext'; // Import context
import styles from '../css/weather.module.css'; 
function WeatherForecast({ forecast }) {
  const { city, country } = useContext(WeatherContext); // Get city and country from context
  const { currentConditions } = forecast.data;
  const {
    temperature,
    feelsLikeTemperature,
    humidity,
    wind,
    description,
    sunriseTime,
    sunsetTime,
    iconCode,
  } = currentConditions;

  return (
    <div className="weather-container">
      <h2>Weather Forecast for {city}, {country}</h2> {/* Display city and country */}
      <div className="weather-info">
        <div className="weather-main">
          <div className="weather-details">
            <p>Temperature: {temperature}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Feels like: {feelsLikeTemperature}°C</p>
            <p>Weather Condition: {description}</p>
          </div>
        </div>

        <div className="weather-extra">
          <p>Wind: {wind}</p>
          <p>Sunrise: {sunriseTime.time}</p>
          <p>Sunset: {sunsetTime.time}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
