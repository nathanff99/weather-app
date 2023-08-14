import UI from "./ui.js"
import weather from "./weather.js"

const favorite = {
    initToggle: function () {
        document.getElementById('toggleFavorite').addEventListener('click', (event) => {
            const button = event.currentTarget

            const place = {
                address: button.getAttribute('data-address'),
                latitude: button.getAttribute('data-latitude'),
                longitude: button.getAttribute('data-longitude')
            }
            this.togglePlace(place)
        })
    },

    togglePlace: function (place) {
        let favoritePlaces = []

        if (localStorage.hasOwnProperty('favoritePlaces')) {
            favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
        }

        const existingIndex = favoritePlaces.findIndex(item => item.address === place.address)

        if (existingIndex !== -1) {
            favoritePlaces.splice(existingIndex, 1)
            UI.toggleFavoriteIcon('delete')
        } else {
            favoritePlaces.push(place)
            UI.toggleFavoriteIcon('add')
        }

        localStorage.setItem("favoritePlaces", JSON.stringify(favoritePlaces))
        this.updateSelect()
    },

    initSelectListener: function () {
        document.getElementById('favoritePlaces').addEventListener('change', event => {
            const favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
            const place = favoritePlaces.find(place => place.address === event.target.value)

            weather.loadByPlace('weather', `&lat=${place.latitude}&lon=${place.longitude}&units=metric`, place.address)
            weather.loadByPlace('forecast', `&lat=${place.latitude}&lon=${place.longitude}&units=metric&exclude=current`, place.address)
        })
    },

    checkIconClass: function (address) {
        let favoritePlaces = []

        if (localStorage.hasOwnProperty('favoritePlaces')) {
            favoritePlaces = JSON.parse(localStorage.getItem('favoritePlaces'))
        }

        const existingIndex = favoritePlaces.findIndex(item => item.address === address)
        return existingIndex === -1 ? 'fa-regular' : 'fa-solid'
    },

    updateSelect: function () {
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
}

export default favorite