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
    const daily = document.querySelector('#daily')    
    const title = `<h2>Daily Forecast - 5 days</h2>
   <div class= "hour5title">
   </div> `
    daily.innerHTML += title

    const hour5 = document.querySelector('.hour5title')
    for (let i = 0; i < 5; i++) {
        const temperature5hour = `
        <div class= "div5Hour">
            <h3>${data2[i].dia.substring(5, 10)}</h3>
            <p> Min: ${Math.round(data2[i].min)} ºC</p>
            <p> Max: ${Math.round(data2[i].max)} ºC</p>
            <img src = ${`http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`}></img>
        </div> `

        hour5.innerHTML += temperature5hour        
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