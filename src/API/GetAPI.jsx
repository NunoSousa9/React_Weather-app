const fetchCityData = async (lat, lon) => {
    try {
      console.log('Fetching city data...')
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6a1d6fc8325594a7d0c3cd1a0660acc8
      `);
      console.log('Response status:', response.status);
      if(!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error('Error fetching city data:', error);
      return [];
    }
  };

  export { fetchCityData };