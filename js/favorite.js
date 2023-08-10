const initFavoriteToggle = () => {
    document.getElementById('toggleFavorite').addEventListener('click', function () {
        const place = {
            address: this.getAttribute('data-address'),
            latitude: this.getAttribute('data-latitude'),
            longitude: this.getAttribute('data-longitude')
        }
        toggleFavoritePlace(place)
    })
}

const toggleFavoritePlace = (place) => {
    let favoritePlaces = []

    if (localStorage.hasOwnProperty('favoritePlaces')) {
        favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
    }

    const existingIndex = favoritePlaces.findIndex(item => item.address === place.address)

    if (existingIndex !== -1) {
        favoritePlaces.splice(existingIndex, 1)
        toggleFavoriteIcon('delete')
    } else {
        favoritePlaces.push(place)
        toggleFavoriteIcon('add')
    }

    localStorage.setItem("favoritePlaces", JSON.stringify(favoritePlaces))
    updateFavoritesSelect()
}

const initSelectListener = () => {
    document.getElementById('favoritePlaces').addEventListener('change', event => {
        const favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
        const place = favoritePlaces.find(place => place.address === event.target.value)

        loadWheaterByPlace('weather', `&lat=${place.latitude}&lon=${place.longitude}&units=metric`, place.address)
        loadWheaterByPlace('forecast', `&lat=${place.latitude}&lon=${place.longitude}&units=metric&exclude=current`, place.address)
    })
}

const checkFavoriteClass = (address) => {
    let favoritePlaces = []

    if (localStorage.hasOwnProperty('favoritePlaces')) {
        favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
    }

    const existingIndex = favoritePlaces.findIndex(item => item.address === address)
    return existingIndex === -1 ? 'fa-regular' : 'fa-solid'
}

const updateFavoritesSelect = () => {
    const favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces')) ?? []
    const select = document.getElementById('favoritePlaces')

    select.innerHTML = '<option value="">Favorite places</option>'

    favoritePlaces.forEach(place => {
        const option = document.createElement('option')
        option.value = place.address
        option.textContent = place.address
        select.appendChild(option)
    })
}