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
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Select a random city from the citiesData array
                const randomIndex = Math.floor(Math.random() * citiesData.length);
                const randomCity = citiesData[randomIndex];
                setSelectedCity(randomCity);

                // Fetch weather data for the selected city
                const weatherData = await fetchCityData(
                    limitDecimalPlaces(randomCity.lat, 2),
                    limitDecimalPlaces(randomCity.lon, 2)
                );
                
                setWeatherData(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);


    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city) => {
                return (
                    <Marker key={weatherData} position={[selectedCity.lat, selectedCity.lon]}>
                        <Popup>
                            <h2>{city.name}</h2>
                            
                                <div>
                                    <p>Temp: {weatherData.main.temp}°C</p>
                                    <p>Name: {weatherData.name}</p>
                                </div>
                            
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default WorldMap;