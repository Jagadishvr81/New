// WeatherContext.js
import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  return (
    <WeatherContext.Provider value={{
      weather, setWeather,
      forecast, setForecast,
      loadingStates, setLoadingStates,
      searchLoading, setSearchLoading,
      errorMessage, setErrorMessage,
      city, setCity,
      country, setCountry
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
