import React, { useState, useEffect } from 'react';
import '../CSS/Clock.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    fetchWeather();
    return () => clearInterval(timerId);
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://openweathermap.org/api/one-call-3`
      );
      const data = await response.json();
      console.log(data); // Log weather data to ensure the API call is working
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const d = hour < 12 ? 'AM' : 'PM';

  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const formattedHour = displayHour < 10 ? `0${displayHour}` : displayHour;
  const formattedMin = min < 10 ? `0${min}` : min;
  const formattedSec = sec < 10 ? `0${sec}` : sec;

  return (
    <section className={`clock ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="icons" onClick={toggleDarkMode}>
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </div>
        <div className="time">
          <div className="time-colon">
            <div className="time-text">
              <span className="num hour_num">{formattedHour}</span>
              <span className="text">Hours</span>
            </div>
            <span className="colon">:</span>
          </div>
          <div className="time-colon">
            <div className="time-text">
              <span className="num min_num">{formattedMin}</span>
              <span className="text">Minutes</span>
            </div>
            <span className="colon">:</span>
          </div>
          <div className="time-colon">
            <div className="time-text">
              <span className="num sec_num">{formattedSec}</span>
              <span className="text">Seconds</span>
            </div>
            <span className="am_pm">{d}</span>
          </div>
        </div>
        {weather && (
          <div className="weather">
            <span className="location">{weather.name}</span>
            <span className="temp">{weather.main.temp}°C</span>
            <span className="description">{weather.weather[0].description}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clock;
