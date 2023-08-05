//Variables and query selectors
const apiKey = "d1d450a49b98858affa290c862da2937";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

//Functions
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    // countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove('hide')
}


//Events
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const city = cityInput.value;
    showWeatherData(city);
    removeDivs()
    showDaily(city)
    showHour(city)
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});


//Daily
const daily = document.querySelector('#daily')


const getWeatherDaily = async (city) => {
    const apiDailyURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`
    const res = await fetch(apiDailyURL);
    const data = await res.json();
    return data
}


const showDaily = async (city) => {
    const data = await getWeatherDaily(city);
    console.log(data);

    for (let i = 7; i < 40; i+=8) {
        let divElement = document.createElement('div');
        let hElement = document.createElement('h3')
        let pElement = document.createElement('p');
        let imgElement = document.createElement('img');

        hElement.textContent = data.list[i].dt_txt.substring(5,10)
        pElement.textContent = Math.round(data.list[i].main.temp) + "ºC"

        divElement.appendChild(hElement);
        divElement.appendChild(pElement);
        divElement.appendChild(imgElement);
        imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

        daily.appendChild(divElement);
    }
}

function removeDivs() {
    while (daily.firstChild) {
        daily.removeChild(daily.firstChild);
    }
    while(hour.firstChild){
        hour.removeChild(hour.firstChild)
    }
}




//3 hour range
const hour = document.querySelector('#hour')

const showHour = async (city) => {
    const data = await getWeatherDaily(city);
    console.log(data);

    for (let i = 0; i <8; i++) {
        let divElement = document.createElement('div');
        let hElement = document.createElement('h3')
        let pElement = document.createElement('p');
        let imgElement = document.createElement('img');

        hElement.textContent = data.list[i].dt_txt.substring(11,16)
        pElement.textContent = Math.round(data.list[i].main.temp) + "º C"

        divElement.appendChild(hElement);
        divElement.appendChild(pElement);
        divElement.appendChild(imgElement);
        imgElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)

        hour.appendChild(divElement);
    }
}
