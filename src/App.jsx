import React, { useState, useEffect } from 'react';
import { fetchCityData } from './API/GetAPI';
import WorldMap from './Maps/WorldMap';
import 'leaflet/dist/leaflet.css';

function App() {
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCityData();
        setCitiesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <WorldMap citiesData={citiesData} />
    </div>
  );
}

export default App;
