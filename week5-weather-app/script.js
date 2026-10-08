document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');

    // UI Element References
    const cityName = document.getElementById('cityName');
    const tempDisplay = document.getElementById('tempDisplay');
    const feelsLike = document.getElementById('feelsLike');
    const conditionText = document.getElementById('conditionText');
    const maxTemp = document.getElementById('maxTemp');
    const minTemp = document.getElementById('minTemp');
    const weatherImg = document.getElementById('weatherImg');
    const skyBg = document.getElementById('skyBg');

    const humidityVal = document.getElementById('humidityVal');
    const humidityBar = document.getElementById('humidityBar');
    const humidityDesc = document.getElementById('humidityDesc');
    const windVal = document.getElementById('windVal');
    const windDir = document.getElementById('windDir');
    const pressureVal = document.getElementById('pressureVal');
    const visibilityVal = document.getElementById('visibilityVal');
    const detailedAnalysis = document.getElementById('detailedAnalysis');

    // High Quality Weather Image Presets
    const weatherPresets = {
        Rain: {
            bg: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
            analysis: "Expect persistent rain showers driven by atmospheric low pressure. Humidity remains high and outdoor visibility is slightly reduced."
        },
        Clear: {
            bg: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            analysis: "Clear skies and abundant sunshine prevail under high pressure conditions. Ideal outdoor conditions with moderate UV exposure."
        },
        Clouds: {
            bg: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=600&q=80",
            analysis: "Overcast cloud cover is moderating surface temperatures. Mild conditions with minimal immediate probability of heavy rainfall."
        },
        Snow: {
            bg: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1517299321529-639fecd1227b?auto=format&fit=crop&w=600&q=80",
            analysis: "Freezing temperatures accompanied by snowfall. High wind-chill factor requires warm thermal layers for outdoor exposure."
        },
        Thunderstorm: {
            bg: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1511289081-d06d5b37467b?auto=format&fit=crop&w=600&q=80",
            analysis: "Convective electrical storms detected. Gusty winds and rapid barometric pressure drops suggest staying indoors."
        },
        Mist: {
            bg: "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=1920&q=80",
            cardImg: "https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=600&q=80",
            analysis: "Dense particulate mist or fog reducing regional visibility. Extra caution is advised for driving and navigation."
        }
    };

    // City Weather Mock Database (works reliably without external API key limits)
    const mockWeatherData = {
        "london": { name: "London, UK", temp: 18, feels: 17, max: 20, min: 14, condition: "Rain", condText: "Light Rain Showers", hum: 78, wind: 14, press: 1013, vis: 10 },
        "tokyo": { name: "Tokyo, Japan", temp: 24, feels: 25, max: 27, min: 21, condition: "Clear", condText: "Sunny & Clear", hum: 52, wind: 9, press: 1020, vis: 12 },
        "delhi": { name: "Delhi, India", temp: 32, feels: 35, max: 36, min: 28, condition: "Clear", condText: "Hot & Sunny", hum: 45, wind: 11, press: 1008, vis: 8 },
        "new york": { name: "New York, USA", temp: 15, feels: 14, max: 18, min: 11, condition: "Clouds", condText: "Mostly Cloudy", hum: 65, wind: 18, press: 1016, vis: 10 },
        "paris": { name: "Paris, France", temp: 19, feels: 19, max: 22, min: 15, condition: "Clouds", condText: "Partly Cloudy", hum: 58, wind: 12, press: 1015, vis: 10 },
        "moscow": { name: "Moscow, Russia", temp: -2, feels: -6, max: 1, min: -5, condition: "Snow", condText: "Light Snowfall", hum: 88, wind: 22, press: 1002, vis: 5 }
    };

    function updateWeatherUI(data) {
        const preset = weatherPresets[data.condition] || weatherPresets["Clouds"];

        // Update Text & Metrics
        cityName.textContent = data.name;
        tempDisplay.textContent = `${data.temp}°C`;
        feelsLike.textContent = `Feels like ${data.feels}°C`;
        conditionText.textContent = data.condText;
        maxTemp.textContent = `${data.max}°C`;
        minTemp.textContent = `${data.min}°C`;

        humidityVal.textContent = `${data.hum}%`;
        humidityBar.style.width = `${data.hum}%`;
        humidityDesc.textContent = data.hum > 70 ? "High moisture levels in the air." : "Optimal comfortable moisture level.";
        
        windVal.textContent = `${data.wind} km/h`;
        windDir.innerHTML = `<i class="fa-solid fa-compass"></i> Normal Wind Velocity`;
        pressureVal.textContent = `${data.press} hPa`;
        visibilityVal.textContent = `${data.vis} km`;

        // Update Dynamic Images
        skyBg.style.backgroundImage = `url('${preset.bg}')`;
        weatherImg.src = preset.cardImg;

        // Update Detailed Analytical Text
        detailedAnalysis.innerHTML = `
            Currently in <strong>${data.name}</strong>, weather conditions show a <strong>${data.condText.toLowerCase()}</strong> status. 
            ${preset.analysis} The current temperature sits at <strong>${data.temp}°C</strong> with atmospheric pressure recorded at <strong>${data.press} hPa</strong> and humidity levels at <strong>${data.hum}%</strong>.
        `;
    }

    // Handle Form Search
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = cityInput.value.trim().toLowerCase();
        
        if (mockWeatherData[query]) {
            updateWeatherUI(mockWeatherData[query]);
        } else {
            // Generates dynamic weather for any searched city
            const generatedData = {
                name: cityInput.value.trim().toUpperCase(),
                temp: Math.floor(Math.random() * 15) + 15,
                feels: Math.floor(Math.random() * 15) + 14,
                max: 26,
                min: 12,
                condition: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
                condText: "Dynamic Forecast Conditions",
                hum: Math.floor(Math.random() * 30) + 50,
                wind: 12,
                press: 1012,
                vis: 10
            };
            updateWeatherUI(generatedData);
        }

        cityInput.value = '';
    });
});