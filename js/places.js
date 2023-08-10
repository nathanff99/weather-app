// Function that initializes the location entry (city)
const initPlaceInput = () => {
    const cityInput = document.getElementById('city')
    // Create an instance of Google Autocomplete for the input field, with type 'cities'
    const autoComplete = new google.maps.places.Autocomplete(cityInput, { types: ['(cities)'] })

    // Adds an event listener for when a location is selected in Autocomplete
    autoComplete.addListener('place_changed', () => {
        setLoading('.current-weather')

        const place = autoComplete.getPlace() // Get selected location from Autocomplete

        // Checks if the location has geometry information (latitude and longitude)
        if (place.geometry) {
            // Loads weather data for the selected location using loadWeatherByPlace function
            loadWheaterByPlace('weather', `&lat=${place.geometry.location.lat()}&lon=${place.geometry.location.lng()}&units=metric`, place.formatted_address)
            loadWheaterByPlace('forecast', `&lat=${place.geometry.location.lat()}&lon=${place.geometry.location.lng()}&units=metric&exclude=current`, place.formatted_address)
        } else {
            console.log("Invalid place.")
        }
    })
}