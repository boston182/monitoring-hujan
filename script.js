// Ganti 'MASUKKAN_API_KEY_ANDA_DISINI' dengan API Key dari openweathermap.org
const API_KEY = '4215d2984044ed793009bb2c32ffb69a';

async function getWeatherData() {
    const city = document.getElementById('cityInput').value;
    const cityNameEl = document.getElementById('cityName');
    const rainStatusEl = document.getElementById('rainStatus');
    const weatherDescEl = document.getElementById('weatherDesc');
    const tempEl = document.getElementById('temp');
    const humidityEl = document.getElementById('humidity');

    if (!city) {
        alert('Masukkan nama kota terlebih dahulu!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Kota tidak ditemukan');
        }
        const data = await response.json();

        cityNameEl.innerText = `${data.name}, ${data.sys.country}`;
        tempEl.innerText = `${Math.round(data.main.temp)}°C`;
        humidityEl.innerText = `${data.main.humidity}%`;
        
        const weatherCondition = data.weather[0].main;
        const weatherDescription = data.weather[0].description;
        weatherDescEl.innerText = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        if (weatherCondition.toLowerCase().includes('rain') || weatherCondition.toLowerCase().includes('drizzle')) {
            rainStatusEl.innerText = '⚠️ SEDANG HUJAN';
            rainStatusEl.className = 'status-hujan hujan';
        } else if (weatherCondition.toLowerCase().includes('thunderstorm')) {
            rainStatusEl.innerText = '⚡ HUJAN BADAI';
            rainStatusEl.className = 'status-hujan hujan';
        } else {
            rainStatusEl.innerText = '☀️ CUACA CERAH / BERAWAN';
            rainStatusEl.className = 'status-hujan terang';
        }

    } catch (error) {
        alert(error.message);
    }
}

window.onload = getWeatherData;
