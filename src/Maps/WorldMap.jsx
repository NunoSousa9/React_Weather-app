import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import '../App.css';
import getBackgroundImage from "../CityCard/Background.jsx";
import PopupOverlay from "../CityCard/Popup.jsx";


const limitDecimalPlaces = (value, decimalPlaces) => {
    const pattern = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?`);
    const match = value.toString().match(pattern);
    return match ? parseFloat(match[0]) : value;
};

const cityIcon = (cityName, temperature) => {
    const iconColor = getIconColor(temperature);
    return L.divIcon({
        className: "custom-icon",
        html: `<div class="custom-marker">
                <div class="marker-dot"></div>
                    <div class="temperature-city-block">
                    <div class="temperature">${temperature !== undefined ? temperature : ''}</div>
                    <div class="city-name" style="background-color: ${iconColor};">${cityName}</div>
                </div>
            </div>`,
        iconAnchor: [5, 5],
        iconSize: [170, 40],
    });
};

const getIconColor = (temperature) => {
    if (temperature <= -15) return '#54639e'; // Purple
    else if (temperature < 0) return '#2071d4'; // Blue
    else if (temperature < 10) return '#87CEEB'; // Light blue
    else if (temperature <= 20) return '#f2da4e'; // Yellow
    else if (temperature < 30) return '#edb232'; // Orange
    else return '#FF6347' // Red
};

const WorldMap = ({ citiesData, weatherData, fetchCompleted }) => {
    const kelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
    };

    const maxBounds = [
    [-110, -200], // Southwest coordinates
    [110, 200],   // Northeast coordinates
  ];

    useEffect(() => {
        // Re-render after fetch completed
        console.log("Fetch completed:", fetchCompleted);
      }, [fetchCompleted]);
      

    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }} maxBounds={maxBounds} maxBoundsViscosity={5.0}>
            <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri'
            />    
            <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=6a1d6fc8325594a7d0c3cd1a0660acc8`}
                attribution='&copy; OpenWeatherMap'
                />
                
            {fetchCompleted && citiesData.map((city) => {
                const roundedLat = limitDecimalPlaces(city.lat, 2);
                const roundedLon = limitDecimalPlaces(city.lon, 2);
                const cityName = city.name;
                const weather = weatherData[cityName];
                const temperature = kelvinToCelsius(weather[0]?.main?.temp);
                
                const localTime = new Date((weather[0]?.dt + weather[0]?.timezone) * 1000);
                const formattedTime = `${localTime.getHours()}:${String(localTime.getMinutes()).padStart(2, '0')}`;
                const icon = <img src={`http://openweathermap.org/img/wn/${weather[0]?.weather[0]?.icon}.png`} alt={weather[0]?.weather[0]?.description}/>
                
                const weatherIcon = weather[0]?.weather[0]?.icon;
                const backgroundImage = getBackgroundImage(weatherIcon);

                const popupStyle = {

                    backgroundImage: `url(${backgroundImage})`,
                    opacity: .9,
                    borderRadius: "10px",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '330px',
                    color: 'white',
                  }; 

                return (
                    <Marker key={cityName} position={[roundedLat, roundedLon]} icon={cityIcon(cityName, temperature)}>
                        <Popup className="custom-popup"> 
                            
                            {weather && weather[0]?.weather && citiesData ? (
                                <div style={popupStyle}>
                                   <PopupOverlay />
                                   <br></br>
                                    <h2>{cityName},</h2>
                                    <h5>{city.country}</h5>
                                    <p></p>
                                    <h1>{temperature}°C    {icon}</h1>
                                    <p className="capitalize-first-letter">{weather[0]?.weather[0]?.description}</p>
                                    <br></br><br></br>
                                    <h2>{formattedTime}</h2>
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