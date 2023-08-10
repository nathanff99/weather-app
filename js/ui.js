const setLoading = (selector) => {
    const loadingHTML = `
    <div class="loading">
        <i class="fa-solid fa-cloud fa-beat"></i>
        Loading
    </div>`

    document.querySelector(selector).innerHTML = loadingHTML;
}

const setCurrentWheaterHTML = (data, address) => {
    const currentWeatherHTML = `
  <div class="current-weather">
    <i class="current-weather__favorite fa-regular fa-star"></i>

    <img class="current-weather__icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <h2 class="current-weather__title">
    ${address}
    </h2>
    <span class="current-weather__temperature">
    ${data.main.temp}°C
    </span>
    <span class="current-weather__feels-like">
      Feels like ${data.main.feels_like}°C
    </span>

    <div class="current-weather__data">
      <span class="current-weather__temperature-low">
        <i class="fa-solid fa-temperature-low"></i> Min: ${data.main.temp_min}°C
      </span>
      <span class="current-weather__temperature-high">
        <i class="fa-solid fa-temperature-high"></i> Max: ${data.main.temp_max}°C
      </span>
      <span class="current-weather__temperature-humidity">
        <i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%
      </span>
      <span class="current-weather__wind-speed">
        <i class="fa-solid fa-wind"></i> Wind Speed: ${data.wind.speed}km/h
      </span>
    </div>
  </div>
`;

    document.querySelector('#current-weather').innerHTML = currentWeatherHTML;
} 