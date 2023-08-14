import favorite from "./favorite.js"

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
    <h2>Current Weather</h2>
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

  setDailyWeatherHTML: function (data) {
    let dailyWeatherHTML = ''

    data.forEach(day => {
      dailyWeatherHTML += `
      <div class="days__period-each dayClick" data-date="${new Date(day.date).toDateString()}">
          <img class="days__period-icon" src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="Weather Icon">
          <h3>${this.formatDate(day.date, false)}</h3>
          <p>
              <i class="fa-solid fa-temperature-low"></i>
              Min: ${Math.round(day.temp_min)}°C
          </p>
          <p>
              <i class="fa-solid fa-temperature-high"></i>
              Max: ${Math.round(day.temp_max)}°C
          </p>
      </div>`
    })

    document.querySelector('#days-period .days__period').innerHTML = dailyWeatherHTML
  },

  setHoursWeatherHTML: function (data) {
    let hoursWeatherHTML = ''

    data.forEach(hour => {
      hoursWeatherHTML += `
      <div class="hours__period-each">
          <img class="hours__period-icon" src="http://openweathermap.org/img/wn/${hour.icon}@2x.png" alt="Weather Icon">
          <h3>${this.formatDate(hour.date)}</h3>
          <p>
              <i class="fa-solid fa-temperature-low"></i>
              Min: ${Math.round(hour.temp_min)}°C
          </p>
          <p>
              <i class="fa-solid fa-temperature-high"></i>
              Max: ${Math.round(hour.temp_max)}°C
          </p>
      </div>`
    })

    document.querySelector('#hours-period .hours__period').innerHTML = hoursWeatherHTML
  },

  formatDate: function (value, showHours = true) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const date = new Date(value)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'pm' : 'am'

    const formattedHour = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    if (showHours) {
      return `${months[date.getMonth()]} ${date.getDate()}, ${formattedHour}:${formattedMinutes}${period}`
    } else {
      return `${months[date.getMonth()]} ${date.getDate()}`
    }
  }
}

export default UI