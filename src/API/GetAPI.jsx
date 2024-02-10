/* const fetchCityData = async (lat, lon) => {
    try {
      console.log('Fetching city data...')
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20ae736fc3d76646b02e954055427f60`);
      console.log('Response status:', response.status);
      if(!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      const data = await response.json();
      console.log('City data:', data);
      return [data];
    } catch (error) {
      console.error('Error fetching city data:', error);
      return [];
    }
  };

  export { fetchCityData }; */