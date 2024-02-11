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
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Set selected city to Abidjan
                const abidjan = citiesData.find(city => city.name === "Abidjan");
                setSelectedCity(abidjan);

                // Fetch weather data for Abidjan
                const weatherData = await fetchCityData(
                    limitDecimalPlaces(abidjan.lat, 2),
                    limitDecimalPlaces(abidjan.lon, 2)
                );
                
                setWeatherData(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div>
            <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedCity && (
                    <Marker position={[selectedCity.lat, selectedCity.lon]}>
                        <Popup>
                            <h2>{selectedCity.name}</h2>
                            {weatherData && (
                                <div>
                                    <p>Temperature: {weatherData.main.temp}</p>
                                    <p>Weather: {weatherData.weather[0].description}</p>
                                </div>
                            )}
                            <button onClick={() => setSelectedCity(null)}>Close</button>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default WorldMap;
