import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchCityData } from "../API/GetAPI";
import citiesData from "../API/cities_list.json";

const limitDecimalPlaces = (value, decimalPlaces) => {
    const pattern = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?`);
    const match = value.toString().match(pattern);
    return match ? parseFloat(match[0]) : value;
};

const WorldMap = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherPromises = citiesData.map(city => fetchCityData(limitDecimalPlaces(city.lat, 2), limitDecimalPlaces(city.lon, 2)));
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
                console.log('Weather data:', data);
                
                setWeatherData(data); 
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
    
        fetchData();
    }, []);


    const kelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
    };

    
    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city) => {
                const roundedLat = limitDecimalPlaces(city.lat, 2);
                const roundedLon = limitDecimalPlaces(city.lon, 2);
                const cityName = city.name;
                const weather = weatherData[cityName];
                return (
                    <Marker key={cityName} position={[roundedLat, roundedLon]}>
                        
                        <Popup>
                            <h2>{cityName}, {city.country}</h2>
                            {weather && weather[0]?.weather ? (
                                <div>
                                    
                                    <p>Temp: {kelvinToCelsius(weather[0]?.main?.temp)}°C</p>
                                    <p>Description: {weather[0]?.weather[0]?.description}</p>
                                </div>
                            ) : (
                                <p>Loading Weather...</p>
                            )}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default WorldMap;