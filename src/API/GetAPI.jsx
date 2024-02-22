const fetchCityData = async (lat, lon) => {

  const apiKeys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3
  ].filter(Boolean);

  for (let i = 0; i < apiKeys.length; i++) {

    try {
      console.log(`Trying API key: ${i + 1}`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeys[i]}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error(`Error fetching city data with API key: ${i + 1} )`, error);
      // If the current key fails, proceed to the next one
      continue;
    }
  }

  console.error("All API keys failed.");
  return []; // If all API keys fail
};

export { fetchCityData };