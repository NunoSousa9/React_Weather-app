const fetchCityData = async (lat, lon) => {

  const apiKeys = [
    "a82f301e4fe13da3d06942a9363cc05b",
    "20ae736fc3d76646b02e954055427f60",
    "80cf1d0fc1b1038188b741ce2b0f4730"
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
      console.error(`Error fetching city data with API key: ${i + 1})`, error);
      // If the current key fails, proceed to the next one
      continue;
    }
  }

  console.error("All API keys failed.");
  return []; // If all API keys fail
};

export { fetchCityData };