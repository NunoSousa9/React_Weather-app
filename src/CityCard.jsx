import React from "react";
import { TiWeatherCloudy } from 'react-icons/ti';

const CityCard = ({ selectedCity, onClose }) => {
    return (
        <div className="city-card">
            <h2>{selectedCity.name}</h2>
            <p>Country: {selectedCity.sys.country}</p>
            <p>Icon: <TiWeatherCloudy /></p>
            <p>Temperature: {selectedCity.main.temp}</p>
            <p>Weather: {selectedCity.weather[0].description}</p>
            
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CityCard;