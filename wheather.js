const apiKey = 'YOUR_API_KEY';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') return;

    try {
        // Current weather data
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        let data = await response.json();

        document.getElementById('current-description').textContent = `Description: ${data.weather[0].description}`;
        document.getElementById('current-temp').textContent = `Temperature: ${data.main.temp} °C`;

        // Forecast data
        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        data = await response.json();

        const forecastDays = document.getElementById('forecast-days');
        forecastDays.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const date = new Date(dayData.dt * 1000).toLocaleDateString();

            const dayDiv = document.createElement('div');
            dayDiv.classList.add('forecast-day');
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <p>${dayData.weather[0].description}</p>
                <p>${dayData.main.temp} °C</p>
            `;
            forecastDays.appendChild(dayDiv);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
