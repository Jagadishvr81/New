import React, { useState, useContext, useEffect } from 'react';
import styles from './App.module.css'; // Import CSS Modules stylesheet
import { fetchWeather, fetchWeatherByLocation } from './components/weather';
import WeatherForecast from './components/WeatherForecast';
import { WeatherContext } from './WeatherContext';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    setCity: setContextCity,
    setCountry: setContextCountry,
    setWeather: setContextWeather,
    setForecast: setContextForecast,
    setLoadingStates: setContextLoadingStates,
    setSearchLoading: setContextSearchLoading,
    setErrorMessage: setContextErrorMessage,
  } = useContext(WeatherContext);

  useEffect(() => {
    setContextCity(city);
  }, [city]);

  const handleSearch = async () => {
    setSearchLoading(true);
    setErrorMessage('');
    try {
      const data = await fetchWeather(city);

      if (!data.data || data.data.length === 0) {
        setErrorMessage('City not found. Please try again.');
        setWeather(null);
      } else {
        setWeather(data.data);
        if (data.data.length > 0) {
          const firstCity = data.data[0];
          handleGetForecast(firstCity.latitude, firstCity.longitude, 0, firstCity.city, firstCity.stateOrCountry);
        }
      }
    } catch (error) {
      console.error('Error fetching city weather:', error);
      setErrorMessage('An error occurred while fetching the data.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleGetForecast = async (latitude, longitude, index, city, country) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));

    try {
      const forecastData = await fetchWeatherByLocation(latitude, longitude);
      setForecast(forecastData);

      setContextCity(city);
      setContextCountry(country);
    } catch (error) {
      console.error('Error fetching location forecast:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.searchSection}>
        <h1>Discover Today’s Weather</h1>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          {searchLoading ? (
            <div className={styles.loading}></div>
          ) : (
            'Get Weather'
          )}
        </button>
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={styles.weatherForecastContainer}>
        {weather && weather.length > 0 && (
          <div className={styles.weatherList}>
            {weather.map((cityWeather, index) => (
              <div key={index} className={styles.weatherDetails}>
                <h2>Weather Details:</h2>
                <p>City: {cityWeather.city}</p>
                <p>State or Country: {cityWeather.stateOrCountry}</p>
                <p>Latitude: {cityWeather.latitude}</p>
                <p>Geocode: {cityWeather.geocode}</p>

                <button 
                  onClick={() => handleGetForecast(cityWeather.latitude, cityWeather.longitude, index, cityWeather.city, cityWeather.stateOrCountry)}
                  className={styles.forecastButton}
                  disabled={loadingStates[index]}
                >
                  {loadingStates[index] ? (
                    <div className={styles.loading}></div>
                  ) : (
                    'Get Forecast'
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {forecast && weather && (
          <div className={styles.forecastSection}>
            <WeatherForecast forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
