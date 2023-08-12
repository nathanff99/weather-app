const favoriteStar = document.getElementById('star');
const cityInput = document.querySelector("#city-input");
const cityLocal = document.querySelector("#cityLocal");

export const favorite = () => {
    favoriteStar.addEventListener('click', (e) => {
        e.preventDefault();        
        const google = cityInput.value.trim();
        const favorite = cityLocal.value        
        saveFav(google, favorite)
    })
}

function saveFav(google, favorite) {
    const cityGoogle = cityInput.value.split(',')[0].trim();
    const cityStg = cityLocal.value.split(',')[0].trim();
    const cityTitle = document.querySelector('#city').textContent;    

    let cityStorage = [];
    if (localStorage.getItem('cityStorage')) {
        cityStorage = JSON.parse(localStorage.getItem('cityStorage'));
    }

    if (cityTitle === cityGoogle && google !== '') {
        const handleGoogle = (city) => {
            const isCitySaved = cityStorage.some(item => item.city === city);
            const existingCityIndex = cityStorage.findIndex(item => item.city === city);
            if (!isCitySaved) {
                cityStorage.push({ city });
                localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
                favoriteStar.classList.add('fa-solid');
                favoriteStar.classList.remove('fa-regular');                
            } else {
                cityStorage.splice(existingCityIndex, 1);
                localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
                favoriteStar.classList.add('fa-regular');
                favoriteStar.classList.remove('fa-solid');                
            }
        };

        handleGoogle(google);
    }

    if (cityTitle === cityStg && favorite !== '') {
        const handleFavorite = (favorite) => {
            const isCitySaved = cityStorage.some(item => item.city === favorite);
            const existingCityIndex = cityStorage.findIndex(item => item.city === favorite);
            if (!isCitySaved) {
                cityStorage.push({ city: favorite });
                localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
                favoriteStar.classList.add('fa-solid');
                favoriteStar.classList.remove('fa-regular');
                console.log('Cidade salva:', favorite);
            } else {
                cityStorage.splice(existingCityIndex, 1);
                localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
                favoriteStar.classList.add('fa-regular');
                favoriteStar.classList.remove('fa-solid');
                console.log('Cidade removida:', favorite);
            }
        };

        handleFavorite(favorite);
    }
}





// function local(cityInputValue, cityLocal) {
//     console.log(cityInputValue, cityLocal);
//     let cityStorage = [];
//     if (localStorage.getItem('cityStorage')) {
//         cityStorage = JSON.parse(localStorage.getItem('cityStorage'));
//     }
//     // Verificar se o dado já está salvo
//     const isCitySaved = cityStorage.some(item => item.city === cityInputValue);
//     const existingCityIndex = cityStorage.findIndex(item => item.city === cityInputValue);
//     const isCitySavedFav = cityStorage.some(item => item.city === cityLocal);
//     const existingCityIndexFav = cityStorage.findIndex(item => item.city === cityLocal);

//     // if(existingCityIndex !==-1){
//     //     favoriteStar.classList.add('fa-solid');
//     //     favoriteStar.classList.remove('fa-regular');
//     // } Lugar errado

//     if (!isCitySaved) {
//         cityStorage.push({ city: cityInputValue });
//         localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
//         favoriteStar.classList.add('fa-solid');
//         favoriteStar.classList.remove('fa-regular');
//         console.log('Cidade salva:', cityInputValue);
//     };
//     if (existingCityIndex !== -1) {
//         cityStorage.splice(existingCityIndex, 1);
//         localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
//         favoriteStar.classList.add('fa-regular');
//         favoriteStar.classList.remove('fa-solid');
//         console.log('Cidade removida:', cityInputValue);
//     };
//     if (!isCitySavedFav) {
//         cityStorage.push({ city: cityLocal });
//         localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
//         favoriteStar.classList.add('fa-solid');
//         favoriteStar.classList.remove('fa-regular');
//         console.log('Cidade salva:', cityLocal);
//     };
//     if (existingCityIndex !== -1) {
//         cityStorage.splice(existingCityIndex, 1);
//         localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
//         favoriteStar.classList.add('fa-regular');
//         favoriteStar.classList.remove('fa-solid');
//         console.log('Cidade removida:', cityLocal);
//     };
// }



// //Save date in Local Storage
// // function local() {
// //     let cityStorage = []
// //     if (localStorage.hasOwnProperty('cityStorage')) {
// //         cityStorage = JSON.parse(localStorage.getItem('cityStorage'))
// //     }
// //     cityStorage.push({ city: cityInput.value })
// //     localStorage.setItem("cityStorage", JSON.stringify(cityStorage))
// // }

// // export function modifyCityStorage(city) {
// //     const cityInput = document.querySelector("#city-input");
// //     let cityStorage = [];

// //     if (localStorage.hasOwnProperty('cityStorage')) {
// //         cityStorage = JSON.parse(localStorage.getItem('cityStorage'));
// //     }

// //     const inputValue = cityInput.value;

// //     const indexToRemove = cityStorage.findIndex(item => item.city === city);
// //     if (indexToRemove !== -1) {
// //         // Se o valor existe, remova o item da matriz
// //         cityStorage.splice(indexToRemove, 1);
// //     } else {
// //         // Se o valor não existe, adicione-o à matriz
// //         cityStorage.push({ city: city });
// //     }

// //     localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
// // }














// function showLocal() {

//     const dateSave = localStorage.getItem('cityStorage');
//     if (dateSave) {
//         var dadosConvertidos = JSON.parse(dateSave);
//         dadosConvertidos.forEach(function (item) {
//             var option = document.createElement('option');
//             option.value = item.city;
//             option.textContent = item.city;
//             lista.appendChild(option);
//         });
//     }
// }