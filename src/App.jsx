import React, { useState, useEffect } from 'react';
import './App.css';
import { getTotalData } from './API/GetAPI';
import WorldMap from './Maps/WorldMap';
import CityCard from './CityCard';
import 'leaflet/dist/leaflet.css';


function App() {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await getTotalData();
          setCitiesData([data]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    const handleCityClick = (city) => {
      setSelectedCity(city);
    };

    const handleCloseCityCard = () => {
      setSelectedCity(null);
    };

    console.log('Cities Data:', citiesData);

    return (
      <div className="App">
        <WorldMap citiesData={citiesData} onCityClick={handleCityClick} />
        {selectedCity && <CityCard selectedCity={selectedCity} onClose={handleCloseCityCard} />}
      </div>
    );
  }
  
  export default App;
