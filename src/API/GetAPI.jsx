const url ='https://api.openweathermap.org/data/2.5/weather?q=london&appid=e2b777adec3e510ca5b116f774545bb5';

const getTotalData = async () => {
    try {
      const totalResponse = await fetch(url);
      const totalData = await totalResponse.json();
      return totalData;
    } catch (error) {
      console.error('Error fetching total data:', error);
      throw new Error('Failed to fetch total data');
    }
  };

  export { getTotalData };