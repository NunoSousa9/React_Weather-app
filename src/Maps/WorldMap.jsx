import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchCityData } from "../API/GetAPI";
import citiesData from "../API/cities_list.json";

const WorldMap = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherPromises = citiesData.map(city => fetchCityData(roundCoord(city.lat), roundCoord(city.lon)));
                const weatherResults = await Promise.all(weatherPromises);
                const data = {};
                weatherResults.forEach((result, index) => {
                    const cityName = citiesData[index].name;
                    data[cityName] = result;
                });
                setWeatherData(data); 
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    const roundCoord = (value) => {
        return Math.round(value * 100) / 100;
    }


    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city) => {
                const roundedLat = roundCoord(city.lat);
                const roundedLon = roundCoord(city.lon);
                const cityName = city.name;
                const weather = weatherData[roundedLat, roundedLon];
                return (
                    <Marker key={cityName} position={[roundedLat, roundedLon]}>
                        <Popup>
                            <h2>{cityName}</h2>
                            {weatherData[roundedLat, roundedLon] ? (
                                <div>
                                    <p></p>
                                    <p>Name: {weather.name}</p>
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