import UI from "./ui.js";

// OpenWeatherMap API config.
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/'
const WEATHER_API_KEY = 'c4855aefeaa47320d405a3180bae8dc0'

const weather = {
    // Function that loads weather data based on endpoint and given parameters
    loadByPlace: function (endpoint, params, address = 'Vancouver, BC, Canada') {
        UI.setLoading('.current-weather')

        // Makes a fetch request to the Weather API, concatenating the API URL, endpoint, API key, and parameters
        fetch(`${WEATHER_API_URL}${endpoint}?appid=${WEATHER_API_KEY}${params}`)
            .then((response) => response.json()) // Convert data to json
            .then((response) => {
                setTimeout(() => {
                    if (endpoint === 'weather') {
                        UI.setCurrentWeatherHTML(response, address)
                    } else {
                        this.groupByDay(response.list) // Calls the function to group the weather forecast data by day
                    }
                }, 1000)
            })
            .catch((error) => console.error("Error fetching weather: ", error))
    },

    // Function that groups weather forecast data by day
    groupByDay: function (weatherList) {
        // empty object to store data grouped by day
        const groupedData = {}

        // Separates the data into their respective days
        weatherList.forEach(dayData => {
            const date = new Date(dayData.dt * 1000)
            const dayKey = date.toDateString()

            // Delete the current day, because it is already displayed at another time.
            if (date.getDate() > new Date().getDate()) {
                // If the key for the day doesn't already exist in the groupedData object, create an empty array for it
                if (!groupedData[dayKey]) {
                    groupedData[dayKey] = []
                }

                // Adds the day's data to the corresponding array in the groupedData
                groupedData[dayKey].push(dayData)
            }
        })

        Object.keys(groupedData).forEach(dayKey => {
            const dayData = groupedData[dayKey]
            const minTemperature = Math.min(...dayData.map(item => item.main.temp_min))
            const maxTemperature = Math.max(...dayData.map(item => item.main.temp_max))
            const description = dayData[0].weather[0].description
        })
    },

    // Loads default place on page load
    loadDefault: function () {
        // Vancouver, BC, Canada
        const defaultPlace = {
            lat: 49.2827291,
            lng: -123.1207375
        }

        this.loadByPlace('weather', `&lat=${defaultPlace.lat}&lon=${defaultPlace.lng}&units=metric`)
        this.loadByPlace('forecast', `&lat=${defaultPlace.lat}&lon=${defaultPlace.lng}&units=metric&exclude=current`)
    }
}

export default weather