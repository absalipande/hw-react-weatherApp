import { useState } from 'react';
import './App.css';
import City from './components/City';
import AirTemperature from './components/AirTemperature';
import WeatherType from './components/WeatherType';
import AirPressure from './components/AirPressure';
import CloudAreaFraction from './components/CloudAreaFraction';
import RelativeHumidity from './components/RelativeHumidity';
import WindDirection from './components/WindDirection';
import WindSpeed from './components/WindSpeed';

function App() {
  const api = '5cf93a4345419ea8222f151d72f6f58e';
  const [weather, setWeather] = useState([{}]);
  const [location, setLocation] = useState('');

  // event whenever we need to fetch an api
  const weatherHandler = (e) => {
    if (e.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${api}`
      ).then((res) =>
        res.json().then((data) => {
          setWeather(data);
          setLocation('');
        })
      );
    }
  };
  return (
    <div className="mainContainer">
      <input
        type="text"
        className="input"
        placeholder="Enter Some Location..."
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        onKeyPress={weatherHandler}
      />
      {typeof weather.main === 'undefined' ? (
        <div>
          <p>Welcome to my React Weather Application!</p>
        </div>
      ) : (
        <div className="weatherDataHandler">
          <City name={weather.name} />
          <AirTemperature temp={Math.round(weather.main.temp)} />
          <WeatherType main={weather.weather[0].main} />
          <div className='dataContainer'>
          <AirPressure pressure={weather.main.pressure} />
          <RelativeHumidity humidity={weather.main.humidity} />
          <CloudAreaFraction all={weather.clouds.all} />
          <WindDirection deg={weather.wind.deg} />
          <WindSpeed speed={weather.wind.speed} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
