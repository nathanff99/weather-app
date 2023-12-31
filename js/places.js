import weather from "./weather.js"

const places = {
    // Function that initializes the location entry (place)
    initInput: function () {
        const placeInput = document.getElementById('place')
        // Create an instance of Google Autocomplete for the input field, with type 'cities'
        const autoComplete = new google.maps.places.Autocomplete(placeInput, { types: ['(cities)'] })

        // Adds an event listener for when a location is selected in Autocomplete
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace() // Get selected location from Autocomplete

            // Checks if the location has geometry information (latitude and longitude)
            if (place.geometry) {
                // Loads weather data for the selected location using loadWeatherByPlace function
                weather.loadByPlace('weather', `&lat=${place.geometry.location.lat()}&lon=${place.geometry.location.lng()}&units=metric`, place.formatted_address)
                weather.loadByPlace('forecast', `&lat=${place.geometry.location.lat()}&lon=${place.geometry.location.lng()}&units=metric&exclude=current`, place.formatted_address)
            } else {
                alert("Invalid place.")
            }
        })
    }
}

export default places