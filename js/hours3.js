import { getWeatherDaily } from "./days5.js";

const hour = document.querySelector('#hour')


export const showHour = async (city) => {
    const data = await getWeatherDaily(city);    

    for (let i = 0; i < 8; i++) {
        let divElement = document.createElement('div');
        let hElement = document.createElement('h3')
        let pElement = document.createElement('p');
        let imgElement = document.createElement('img');

        hElement.textContent = data.list[i].dt_txt.substring(11, 16)
        pElement.textContent = Math.round(data.list[i].main.temp) + "º C"

        divElement.appendChild(hElement);
        divElement.appendChild(pElement);
        divElement.appendChild(imgElement);
        imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

        hour.appendChild(divElement);
    }
}