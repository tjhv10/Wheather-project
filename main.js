const API_KEY = '03bd44c82f8eb34bbebb16451b988e9b';
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
    document.getElementById('pic').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
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

updateWeather();
setInterval(updateWeather, 30000);

