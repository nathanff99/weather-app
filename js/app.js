import { favorite } from "./favorite.js";
import {showWeatherData} from "./api.js"
import { removeDivs, showDaily } from "./days5.js";
import { showHour } from "./hours3.js";



//Variables and query selectors
const apiKey = "d1d450a49b98858affa290c862da2937";
// const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
// const cityElement = document.querySelector("#city");
// const tempElement = document.querySelector("#temperature span");
// const descElement = document.querySelector("#description");
// const weatherIconElement = document.querySelector("#weather-icon");
// const umidityElement = document.querySelector("#umidity span");
// const windElement = document.querySelector("#wind span");
// const weatherContainer = document.querySelector("#weather-data");
const lista = document.getElementById('cityLocal');
const btnLocal = document.getElementById('recent');
const favoriteStar = document.getElementById('star');

//Auto complete Google

let autocomplete

function initMap() {    
    autocomplete = new google.maps.places.Autocomplete(cityInput),
    {
        types: ['cities']
    }
}

window.onload = initMap
  

function showLocal() {

    const dateSave = localStorage.getItem('cityStorage');
    if (dateSave) {
        var dadosConvertidos = JSON.parse(dateSave);
        dadosConvertidos.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.city;
            option.textContent = item.city;
            lista.appendChild(option);
        });
    }
}

// Chamar a função para popular a lista suspensa assim que a página for carregada
document.addEventListener('DOMContentLoaded', showLocal);

//Functions
// const getWeatherData = async (city) => {
//     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
//     const res = await fetch(apiWeatherURL);
//     const data = await res.json();
//     return data
// }

// const showWeatherData = async (city) => {
//     const data = await getWeatherData(city);    

//     cityElement.innerText = data.name;
//     tempElement.innerText = parseInt(data.main.temp);
//     descElement.innerText = data.weather[0].description;
//     weatherIconElement.setAttribute(
//         "src",
//         `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
//     );
//     // countryElement.setAttribute("src", apiCountryURL + data.sys.country);
//     umidityElement.innerText = `${data.main.humidity}%`;
//     windElement.innerText = `${data.wind.speed}km/h`;

//     document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
//     document.body.style.backgroundSize = "cover"
//     document.body.style.backgroundPosition = 'center'

//     weatherContainer.classList.remove('hide')
// }


//Events
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = cityInput.value;    
    showWeatherData(city);
    removeDivs();
    showDaily(city);
    showHour(city);
    // local()
    console.log(city);
    favorite()
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});

btnLocal.addEventListener('click', (e) => {
    e.preventDefault()    
    const localSt = lista.value;
    const cityLocal = document.querySelector("#cityLocal").value;
    console.log(cityLocal);
    showWeatherData(localSt);
    removeDivs();
    showDaily(localSt);
    showHour(localSt);
    dataTeste(localSt);     
})


//Daily
// const daily = document.querySelector('#daily')

// const getWeatherDaily = async (city) => {
//     const apiDailyURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`
//     const res = await fetch(apiDailyURL);
//     const data = await res.json();
//     return data
// }

// const showDaily = async (city) => {
//     const data = await getWeatherDaily(city);
//     const data2 = await dataTeste(city);
//     console.log(data2);

//     for (let i = 0; i < 5; i ++) {
//         let divElement = document.createElement('div');
//         let hElement = document.createElement('h3')
//         let pElement = document.createElement('p');
//         let p2Element = document.createElement ('p')
//         let imgElement = document.createElement('img');

//         hElement.textContent = data2[i].dia.substring(5,10)
//         pElement.textContent = "Min: " + Math.round(data2[i].min) + " ºC"
//         p2Element.textContent = "Max: " + Math.round(data2[i].max) + " ºC"

//         divElement.appendChild(hElement);
//         divElement.appendChild(pElement);
//         divElement.appendChild(p2Element);
//         divElement.appendChild(imgElement);
//         imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

//         daily.appendChild(divElement);
//     }
// }

// function removeDivs() {
//     while (daily.firstChild) {
//         daily.removeChild(daily.firstChild);
//     }
//     while (hour.firstChild) {
//         hour.removeChild(hour.firstChild)
//     }
// }


//3 hour range
// const hour = document.querySelector('#hour')

// const showHour = async (city) => {
//     const data = await getWeatherDaily(city);    

//     for (let i = 0; i < 8; i++) {
//         let divElement = document.createElement('div');
//         let hElement = document.createElement('h3')
//         let pElement = document.createElement('p');
//         let imgElement = document.createElement('img');

//         hElement.textContent = data.list[i].dt_txt.substring(11, 16)
//         pElement.textContent = Math.round(data.list[i].main.temp) + "º C"

//         divElement.appendChild(hElement);
//         divElement.appendChild(pElement);
//         divElement.appendChild(imgElement);
//         imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

//         hour.appendChild(divElement);
//     }
// }


////File min and max temperature
// const dataTeste = async (city) => {
//     const dados = await getWeatherDaily(city);    
//     const temperaturasPorDia = {};      

//     dados.list.forEach(elemento => {
//         const dataHora = elemento.dt_txt;
//         const temperatura = elemento.main.temp;       
//         const dataSeparada = dataHora.split(' ')[0];        

//         if (!temperaturasPorDia[dataSeparada]) {
//             temperaturasPorDia[dataSeparada] = { dia: dataSeparada, min: temperatura, max: temperatura };
//         } else {
//             const dia = temperaturasPorDia[dataSeparada];
//             dia.min = Math.min(dia.min, temperatura);
//             dia.max = Math.max(dia.max, temperatura);
//         }
//     }
//     )
//     const resultado = Object.values(temperaturasPorDia);    
//     return(resultado)        
// }

//favorite
