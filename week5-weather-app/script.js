document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-info");

    searchBtn.addEventListener("click", fetchWeather);

    // Allow pressing 'Enter' key to search
    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") fetchWeather();
    });

    async function fetchWeather() {
        const city = cityInput.value.trim();
        if (!city) return;

        weatherInfo.innerHTML = `<p class="placeholder">Fetching live weather data...</p>`;

        try {
            // Step 1: Geocode city name to exact coordinates using Open-Meteo's free API
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found");
            }

            const location = geoData.results[0];
            const lat = location.latitude;
            const lon = location.longitude;
            const cityName = location.name;
            const country = location.country || "";

            // Step 2: Fetch current weather for exact coordinates using Fetch API
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const weatherData = await weatherRes.json();

            const current = weatherData.current_weather;

            // Map weather codes to simple descriptions
            const weatherDescriptions = {
                0: "Clear sky",
                1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
                45: "Foggy", 48: "Depositing rime fog",
                51: "Light drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
                71: "Slight snow", 95: "Thunderstorm"
            };

            const desc = weatherDescriptions[current.weathercode] || "Fair";

            // Render weather metrics to DOM
            weatherInfo.innerHTML = `
                <h3>${cityName}${country ? ', ' + country : ''}</h3>
                <div class="temp">${Math.round(current.temperature)}°C</div>
                <div class="desc">${desc}</div>
                <p style="margin-top:10px; color:#cbd5e1;">Wind Speed: ${current.windspeed} km/h</p>
            `;
        } catch (err) {
            weatherInfo.innerHTML = `<p class="error">Unable to find weather for "${city}". Please check the spelling.</p>`;
        }
    }
});