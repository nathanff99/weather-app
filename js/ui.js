import favorite from "./favorite.js";

const UI = {
  setLoading: function (selector) {
    const loadingHTML = `
      <div class="loading">
          <i class="fa-solid fa-cloud fa-beat"></i>
          Loading
      </div>`

    document.querySelector(selector).innerHTML = loadingHTML
  },

  toggleFavoriteIcon: function (action) {
    const toggleFavoriteButton = document.getElementById("toggleFavorite")

    if (action === 'delete') {
      toggleFavoriteButton.classList.remove('fa-solid')
      toggleFavoriteButton.classList.add('fa-regular')
    } else {
      toggleFavoriteButton.classList.add('fa-solid')
      toggleFavoriteButton.classList.remove('fa-regular')
    }
  },

  setCurrentWeatherHTML: function (data, address) {
    const currentWeatherHTML = `
    <div class="current-weather">
      <i id="toggleFavorite" class="current-weather__favorite ${favorite.checkIconClass(address)} fa-star" data-address="${address}" data-latitude="${data.coord.lat}" data-longitude="${data.coord.lon}"></i>
      <img class="current-weather__icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
      <span class="current-weather__date">
        ${this.formatDate(new Date())}
      </span>
      <h2 class="current-weather__title">
      ${address}
      </h2>
      <span class="current-weather__temperature">
      ${Math.round(data.main.temp)}°C
      </span>
      <span class="current-weather__feels-like">
        Feels like ${Math.round(data.main.feels_like)}°C
      </span>
      <div class="current-weather__data">
        <span class="current-weather__temperature-low">
          <i class="fa-solid fa-temperature-low"></i> Min: ${Math.round(data.main.temp_min)}°C
        </span>
        <span class="current-weather__temperature-high">
          <i class="fa-solid fa-temperature-high"></i> Max: ${Math.round(data.main.temp_max)}°C
        </span>
        <span class="current-weather__temperature-humidity">
          <i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%
        </span>
        <span class="current-weather__wind-speed">
          <i class="fa-solid fa-wind"></i> Wind Speed: ${data.wind.speed}km/h
        </span>
      </div>
    </div>
  `

    document.querySelector('#current-weather').innerHTML = currentWeatherHTML
    favorite.initToggle()
  },

  formatDate: function (date) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'pm' : 'am'

    const formattedHour = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${months[date.getMonth()]} ${date.getDate()}, ${formattedHour}:${formattedMinutes}${period}`
  }
}

export default UI