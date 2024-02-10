import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CitiesData from '../API/cities_list.json'
import { fetchCityData } from '../API/GetAPI';

const WorldMap = () => {

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requests = CitiesData.map(city => {
          const lat = roundCoord(city.lat);
          const lon = roundCoord(city.lon);
          return fetchCityData(lat, lon);
        });
        
        const results = await Promise.all(requests);
        
        const data = {};
        results.forEach((result, index) => {
           const { lat, lon } = CitiesData[index];
           const key = `${roundCoord(lat)},${roundCoord(lon)}`;
           data[key] = result;
        });
        
        setWeatherData(data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
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
             {CitiesData.map((city) => {
                const roundedLat = roundCoord(city.lat);
                const roundedLon = roundCoord(city.lon);
                const roundCoords = `${roundedLat},${roundedLon}`;
                const cityName = city.name;
                const weather = weatherData[roundCoords];
                return (
                    <Marker key={cityName} position={[roundedLat, roundedLon]}>
                        <Popup>
                            <h2>{cityName}</h2>
                            {loading ? (
                                    <p>Loading weather...</p>
                                ) : !weather ? (
                                    <p>Weather unavailable</p>
                                ) : (
                              <div>
                                {weather && <p>{weather.main.temp} °C</p>}
                                {weather && <p>{weather.weather[0].description}</p>}
                              </div>
                            )}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default WorldMap;