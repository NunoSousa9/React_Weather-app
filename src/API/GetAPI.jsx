const fetchCityData = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a82f301e4fe13da3d06942a9363cc05b
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