// index.js or index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WeatherProvider } from './WeatherContext';

ReactDOM.render(
  <WeatherProvider>
    <App />
  </WeatherProvider>,
  document.getElementById('root')
);
