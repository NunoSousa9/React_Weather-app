import 'leaflet/dist/leaflet.css';
import './App.css';
import React, { useState, useEffect } from "react";
import WorldMap from "./Maps/WorldMap";
import { fetchCityData } from "./API/GetAPI";
import citiesData from "./API/cities_list.json";

const limitDecimalPlaces = (value, decimalPlaces) => {
    const pattern = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?`);
    const match = value.toString().match(pattern);
    return match ? parseFloat(match[0]) : value;
};

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [fetchCompleted, setFetchCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherPromises = citiesData.map(city =>
          fetchCityData(limitDecimalPlaces(city.lat), limitDecimalPlaces(city.lon))
        );
        const weatherResults = await Promise.all(weatherPromises);
        const data = weatherResults.reduce((acc, cityWeather, index) => {
          const cityName = citiesData[index].name;
          if (cityWeather) {
            acc[cityName] = cityWeather;
          } else {
            console.error(`Weather data not found for city: ${cityName}`);
          }
          return acc;
        }, {});
        setWeatherData(data);
        setFetchCompleted(true);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return <WorldMap citiesData={citiesData} weatherData={weatherData} fetchCompleted={fetchCompleted} />;
};

export default App;