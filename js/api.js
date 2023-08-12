const apiKey = "d1d450a49b98858affa290c862da2937";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

export const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
    return data
}

export const showWeatherData = async (city) => {
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
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = 'center'    

    weatherContainer.classList.remove('hide')
}


export default {getWeatherData, showWeatherData}
