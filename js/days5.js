import { dataTeste } from "./temperatures.js";

const daily = document.querySelector('#daily')
const apiKey = "d1d450a49b98858affa290c862da2937";



export const getWeatherDaily = async (city) => {
    const apiDailyURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`
    const res = await fetch(apiDailyURL);
    const data = await res.json();
    return data
}

export const showDaily = async (city) => {
    const data = await getWeatherDaily(city);
    const data2 = await dataTeste(city);
    console.log(data2);

    for (let i = 0; i < 5; i ++) {
        let divElement = document.createElement('div');
        let hElement = document.createElement('h3')
        let pElement = document.createElement('p');
        let p2Element = document.createElement ('p')
        let imgElement = document.createElement('img');

        hElement.textContent = data2[i].dia.substring(5,10)
        pElement.textContent = "Min: " + Math.round(data2[i].min) + " ºC"
        p2Element.textContent = "Max: " + Math.round(data2[i].max) + " ºC"

        divElement.appendChild(hElement);
        divElement.appendChild(pElement);
        divElement.appendChild(p2Element);
        divElement.appendChild(imgElement);
        imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

        daily.appendChild(divElement);
    }
}

export function removeDivs() {
    while (daily.firstChild) {
        daily.removeChild(daily.firstChild);
    }
    while (hour.firstChild) {
        hour.removeChild(hour.firstChild)
    }
}