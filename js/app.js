import places from "./places.js"
import weather from "./weather.js"
import favorite from "./favorite.js"

const init = () => {
    places.initInput()
    weather.loadDefault()
    favorite.initSelectListener()
    favorite.updateSelect()
}

window.onload = init()