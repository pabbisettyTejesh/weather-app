const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDiv = document.getElementById('weather');
const errorDiv = document.getElementById('error');

const apiKey = 'f00c4bce6b91d46b96309e65e3571d73'; // Free tier API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Weather condition to icon mapping
const weatherIconMap = {
    'Clear': 'clear.png',
    'Clouds': 'clouds.png',
    'Drizzle': 'drizzle.png',
    'Rain': 'rain.png',
    'Snow': 'snow.png',
    'Mist': 'mist.png',
    'Smoke': 'mist.png',
    'Haze': 'mist.png',
    'Dust': 'mist.png',
    'Fog': 'mist.png',
    'Sand': 'mist.png',
    'Ash': 'mist.png',
    'Squall': 'mist.png',
    'Tornado': 'mist.png',
    'Thunderstorm': 'rain.png'
};

async function checkWeather(cityName) {
    try {
        errorDiv.classList.remove('active');
        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Update the DOM with weather data
        city.textContent = data.name;
        temp.textContent = Math.round(data.main.temp) + '°C';
        humidity.textContent = Math.round(data.main.humidity) + '%';
        windSpeed.textContent = Math.round(data.wind.speed) + ' km/h';

        // Set the appropriate weather icon
        const mainWeather = data.weather[0].main;
        const iconSrc = weatherIconMap[mainWeather] || 'clear.png';
        weatherIcon.src = iconSrc;

        // Show weather div and hide error
        weatherDiv.classList.add('active');
        errorDiv.classList.remove('active');

    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'Unable to find weather data for this city. Please try again.';
        errorDiv.classList.add('active');
        weatherDiv.classList.remove('active');
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const cityName = searchInput.value.trim();
    if (cityName) {
        checkWeather(cityName);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = searchInput.value.trim();
        if (cityName) {
            checkWeather(cityName);
            searchInput.value = '';
        }
    }
});

// Load default city on page load
window.addEventListener('load', () => {
    checkWeather('London');
});
