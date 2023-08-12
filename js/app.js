import { favorite } from "./favorite.js";
import {showWeatherData} from "./api.js"
import { removeDivs, showDaily } from "./days5.js";
import { showHour } from "./hours3.js";
import { dataTeste} from "./temperatures.js";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const lista = document.getElementById('cityLocal');
const btnLocal = document.getElementById('recent');

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
    console.log(dataTeste(localSt));
})