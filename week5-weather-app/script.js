document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-info");

    searchBtn.addEventListener("click", fetchWeather);

    async function fetchWeather() {
        const city = cityInput.value.trim();
        if (!city) return;

        weatherInfo.innerHTML = `<p class="placeholder">Fetching data...</p>`;

        try {
            // Fetch live weather data using free wttr.in JSON API endpoint
            const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            
            if (!res.ok) throw new Error("City not found");
            const data = await res.json();

            const current = data.current_condition[0];
            const area = data.nearest_area[0].areaName[0].value;
            const country = data.nearest_area[0].country[0].value;

            weatherInfo.innerHTML = `
                <h3>${area}, ${country}</h3>
                <div class="temp">${current.temp_C}°C</div>
                <div class="desc">${current.weatherDesc[0].value}</div>
                <p style="margin-top:10px; color:#cbd5e1;">Humidity: ${current.humidity}% | Wind: ${current.windspeedKmph} km/h</p>
            `;
        } catch (err) {
            weatherInfo.innerHTML = `<p class="error">City not found or network error. Try again.</p>`;
        }
    }
});