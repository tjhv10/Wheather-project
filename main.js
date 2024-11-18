const API_KEY = 'your_api_key_here'; // Replace with your weather API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const updateWeather = async () => {
  try {
    const position = await getLocation();
    const response = await fetch(`${API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

// Update weather every 30 seconds
setInterval(updateWeather, 30000);

// Initial load
updateWeather();
