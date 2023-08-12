import { getWeatherDaily } from "./days5.js";
import { dataTeste } from "./temperatures.js";

const hour = document.querySelector('#hour');

export const showHour = async (city) => {
    const data = await getWeatherDaily(city);
    const title = `<h2>3 Hour Range</h2>
   <div class= "hour3title">
   </div> `
    hour.innerHTML += title
    const hour3 = document.querySelector('.hour3title')    

    for (let i = 0; i < 8; i++) {
        const temperature3hour = `
        <div class= "div3Hour">
            <h3>${data.list[i].dt_txt.substring(11, 16)}</h3>
            <p>${Math.round(data.list[i].main.temp) + "º C"}</p>
            <img src = ${`http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`}></img>
        </div> `
        hour3.innerHTML += temperature3hour
    }
}


const dailyDiv = document.getElementById('daily');
dailyDiv.addEventListener('click', event => {
    let date
    const clickedElement = event.target;
    const div5hourAncestor = clickedElement.closest('.div5hour');
    if (div5hourAncestor) {
        const h3Text = div5hourAncestor.querySelector('h3').textContent;        
        date = "2023-" + h3Text
    }
    const city = document.querySelector('#city').textContent
    createDay(city, date)
});

const createDay = async (city, date) => {
    const data = await dataTeste(city);
    const divTitle = document.querySelectorAll('.div3hour');
    const hour3 = document.querySelector('.hour3title')   
    const h2Title = document.querySelector('#hour h2')    

    const elemento = data.find(item => item.dia === date);

    if (elemento) {
        const informacoes = elemento.temperaturas.map(info => ({
            hora: info.hora,
            temperatura: info.temperatura,
            icon: info.icon            
        }));
        divTitle.forEach(elemento =>{
            elemento.remove()
        })

        h2Title.textContent = `3 Hour Range for the day ${date}`

        
        informacoes.forEach(element => {
            const html = `
            <div class= "div3Hour">
            <h3>${element.hora}:00</h3>
            <p>${Math.round(element.temperatura) + "º C"}</p>
            <img src = ${`http://openweathermap.org/img/wn/${element.icon}.png`}></img>
        </div> `           
            
            hour3.innerHTML +=html
        });         
        
    } else {
        console.log("Nenhuma informação encontrada para a data:", dataProcurada);
    }

    


}