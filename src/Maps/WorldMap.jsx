import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import '../App.css';



const limitDecimalPlaces = (value, decimalPlaces) => {
    const pattern = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?`);
    const match = value.toString().match(pattern);
    return match ? parseFloat(match[0]) : value;
};


const cityIcon = (cityName, temperature) => {
    return L.divIcon({
      className: "custom-icon",
      html: `<div>${cityName}, ${temperature !== undefined ? temperature : ''}°C</div>`,
      iconSize: [120, 20],
    });
  };

const WorldMap = ({ citiesData, weatherData, fetchCompleted }) => {
    const kelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
    };

    useEffect(() => {
        // This effect will re-run whenever fetchCompleted changes
        console.log("Fetch completed:", fetchCompleted);
      }, [fetchCompleted]);

    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {fetchCompleted && citiesData.map((city) => {
                const roundedLat = limitDecimalPlaces(city.lat, 2);
                const roundedLon = limitDecimalPlaces(city.lon, 2);
                const cityName = city.name;
                const weather = weatherData[cityName];
                return (
                    <Marker key={cityName} position={[roundedLat, roundedLon]} icon={cityIcon(cityName, kelvinToCelsius(weather[0]?.main?.temp))}>
                        
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