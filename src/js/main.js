"use strict";
// service worker registration - remove if you're not going to use it
// import {DOMelements} from "/base.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
            // Registration was successful
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            // console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// place your code below
const settingsImage = document.querySelector(".settings__image");
const temp = document.querySelector('.info__item--temperature--js');
const humidity = document.querySelector('.info__item--humidity--js');
const clouds = document.querySelector('.info__item--clouds--js');
const wind = document.querySelector('.info__item--wind--js');
const sunrise = document.querySelector('.info__item--sunrise--js');
const sunset = document.querySelector('.info__item--sunset--js');
const searchButton = document.querySelector(".searchButton");
const currentlocation = document.querySelector('.current__location');
const cities = document.querySelector('.cities');
const settingsList = document.querySelector('.settings__list');
const cities__toEditList = document.querySelector('.cities__toEditList');
const hamburger = document.querySelector('.hamburger--js');
const settings = document.querySelector('.settings--js');
const about = document.querySelector(".settings__item--about");
const editCitiesList = document.querySelector(".settings__item--edit");
const modal = document.getElementById("myModal");
const today = document.querySelector(".current__days--today");
const tomorrow = document.querySelector(".current__days--tomorrow");
const time = document.querySelector('.current__time');
const url = "https://api.weatherapi.com/v1/forecast.json?key=3f1ad206d1b94436825173623201101&q=";
const main = document.querySelector(".main");
// let localTime;

let citiesList = ['Wrocław', 'Katowice', 'Krakow', 'Warszawa', 'Torun']
let condition;
let city;
let urlWheather;

window.onload = function () {
    generateCitiesList();
    time.innerHTML = new Date().getHours() + ":" + new Date().getMinutes();
    let loc = navigator.geolocation;
    if (loc) {
        loc.getCurrentPosition(function (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            fetch(url + lat + "," + lon)
                .then(resp => resp.json())
                .then(resp => {
                    city = resp.location.name;
                    getValuesToday();
                    // localTime = new Date(info.location.localtime).getHours() + ":" + new Date(info.location.localtime).getMinutes();

                })
                .catch(err => {
                    console.error("Błąd ładowania danych")
                });
        });
    } else {
        console.log("Nie udostępniono lokalizacji");
    }
    // getValuesToday();
// time.innerHTML = localTime.getMinutes();
};

editCitiesList.addEventListener('click', () => {
    cities__toEditList.innerHTML = "";
    cities__toEditList.classList.toggle("cities__toEditList--visible");
    settingsList.classList = "settings__list";
    citiesList.forEach(e => {
        let element = document.createElement('section')
        cities__toEditList.appendChild(element)
        element.classList.add('cities__toEditList__item')
        // element.style.order = citiesList.indexOf(e)
        element.innerText = e;
        element.addEventListener('click', showOptions);
    })

    // citiesList.addEventListener('click', showOptions);
});

// function generateCitiesList() {
//     citiesList.forEach(e => {
//         let element = document.createElement('section')
//         cities__toEditList.appendChild(element)
//         element.classList.add('cities__toEditList__item')
//         element.style.order = citiesList.indexOf(e)
//         element.innerText = e;
//         element.addEventListener('click', showOptions);
//     })
// }

function showOptions() {
    // this.style.visibility = "hidden";
    // this.repl
    let options = document.createElement('section')
    let editButton = document.createElement('div')
    let inputEditButton = document.createElement('div')
    let deleteButton = document.createElement('div')
    cities__toEditList.appendChild(options)
    options.appendChild(editButton)
    options.appendChild(deleteButton)
    options.appendChild(inputEditButton)
    options.classList.add('toEditList__item--options')
    editButton.classList.add('toEditList__item--options--edit')
    inputEditButton.innerHTML = "<input type='text' name='name' id='edited' class='editCityinput'/>";
    deleteButton.classList.add('toEditList__item--options--delete')
    editButton.innerText = 'Edytuj';
    deleteButton.innerText = 'Usun';
    console.log(citiesList);
    console.log(citiesList.indexOf(this.innerHTML));

    let currentCity = this.innerHTML;
    this.replaceWith(options);
    deleteButton.addEventListener('click', function () {
        citiesList.splice(citiesList.indexOf(currentCity), 1);
        cities__toEditList.innerHTML = "";
        // generateCitiesList();
        citiesList.forEach(e => {
            let element = document.createElement('section')
            cities__toEditList.appendChild(element)
            element.classList.add('cities__toEditList__item')
            element.style.order = citiesList.indexOf(e)
            element.innerText = e;
            element.addEventListener('click', showOptions);
            // document.querySelectorAll('.cities__item').forEach(e => e.parentNode.removeChild(e));
            console.log(citiesList)
        })
    });
    editButton.addEventListener("click", (e) => {
        // let currentCity = editButton.textContent;
        // console.log(currentCity)
        let indexToRemove = citiesList.indexOf(currentCity);
        deleteButton.style.display = 'none';
        editButton.style.display = 'none';
        let inputField = document.getElementById('edited');
        inputField.style.opacity = 1;
        // document.getElementById('edited').classList += ` placeholder = ${currentCity}`;

        console.log(citiesList)
        let a = document.getElementById('edited');
        a.addEventListener('blur', ()=>{
            let newCity = a.value;
            citiesList.splice(indexToRemove,1 , newCity);
            inputField.style.opacity = 0;

            let element = document.createElement('section')
            cities__toEditList.appendChild(element)
            element.classList.add('cities__toEditList__item')
            // element.style.order = citiesList.indexOf(e)
            element.innerText = newCity;
            element.addEventListener('click', showOptions);
            inputField.replaceWith(element)
        })


        console.log(citiesList)
        // console.log(a)


        // editButton.replaceWith(edited)

        // editButton.innerHTML = "<input type='text' name='name' id='edited' class='editCityinput'/>";
        // editButton.innerHTML = "<input type='search' class='cities__item--input' id='customcity' name='customcity' placeholder='Edit'>";
        // let inputText = this.innerHTML()
        // tempInput.replaceWith(inputText)

        // let save = function () {
        //     let p = ('<p data-editable />').text(inputText.value);
        //     inputText.replaceWith(p);
        // }
        // inputText.addEventListener('blur', save);

        // deleteButton.style.display = 'none';
        // // this.classList.add('toEditList__item--options--edit--input')
        // // editButton.classList.add('toEditList__item--options--edit--input')
        // editButton.innerHTML = `<input type="text" class='editCityinput' placeholder= ${currentCity}>`;
    });
}

about.addEventListener('click', () => {
    modal.style.display = "block";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
    generateCitiesList();
})

today.addEventListener('click', getValuesToday);

tomorrow.addEventListener('click', getValuesTomorrow);

hamburger.addEventListener('click', showCityList);

settings.addEventListener('click', showSettingsList);

searchButton.addEventListener('click', () => {
        city = document.getElementById("customcity").value;
        getValuesToday();
    }
);

cities.addEventListener('click', function (e) {
    if (e.target.className === ("cities__item")) {
        city = e.target.textContent;
        console.log(city);
        getValuesToday();
    }
    cities.classList.toggle("cities--visible");
    hamburger.classList.toggle('hamburger--active');
});

function showCityList() {
    // if(modal.style.display==='block'){
    hamburger.classList.toggle('hamburger--active');
    cities.classList.toggle("cities--visible");
    // elementNodeListOf.
    generateCitiesList();
    // }
}

function generateCitiesList() {
    document.querySelectorAll('.cities__item').forEach(e => e.parentNode.removeChild(e));
    citiesList.forEach(e => {
        let element = document.createElement('section')
        cities.appendChild(element)
        element.classList.add('cities__item')
        element.innerText = e;
    })
}

function showSettingsList() {
    settingsList.classList.toggle("settings__list--visible");
    settingsImage.classList.toggle('settings__image--active');
    cities__toEditList.classList.remove('cities__toEditList--visible');
}


// function showCurrentTime() {
//     // let local = localTime;
//     time.innerHTML = `${localTime.getHours()} : ${localTime.getMinutes()} : ${localTime.getSeconds()}`;
//     window.requestAnimationFrame(showCurrentTime);
// }
// window.requestAnimationFrame(showCurrentTime);

function getValuesToday() {
    currentlocation.innerHTML = city;
    urlWheather = url + city;
    fetch(urlWheather)
        .then(resp => resp.json())
        .then(resp => {
            const info = resp;
            // var dateToshow = new Date(info.location.localtime);
            // time.innerHTML = dateToshow.getHours() + ":" + dateToshow.getMinutes();
            // localTime = new Date(info.location.localtime);
            // console.log(localTime)
            temp.innerHTML = info.current.temp_c + "°C";
            humidity.innerHTML = info.current.humidity + "%";
            clouds.innerHTML = info.current.cloud + "%";
            wind.innerHTML = info.current.wind_kph + " km/h";
            condition = info.current.condition.code;
            console.log(info.current.condition.text);
            sunrise.innerHTML = info.forecast.forecastday[0].astro.sunrise;
            sunset.innerHTML = info.forecast.forecastday[0].astro.sunset;
            setBackground(condition);
        })
        .catch(err => {
            console.error("Błąd ładowania danych")
        });

}

function setBackground(condition) {
    switch (condition) {
        case 1000:
            main.style.backgroundImage = 'url("assets/img/sunny.jpg")';
            break;
        case 1003:
            main.style.backgroundImage = 'url("assets/img/cloudy.jpg")';
            break;
        case 1006:
            main.style.backgroundImage = 'url("assets/img/cloudy.jpg")';
            break;
        case 1009:
            main.style.backgroundImage = 'url("assets/img/overcast.jpg")';
            break;
        case 1030:
            main.style.backgroundImage = 'url("assets/img/mist.jpg")';
            break;
        case 1063:
            main.style.backgroundImage = 'url("assets/img/patchyrain.jpg")';
            break;
        case 1066:
            main.style.backgroundImage = 'url("assets/img/patchysnow.jpg")';
            break;
        case 1189:
            main.style.backgroundImage = 'url("assets/img/moderaterain.jpg")';
            break;
        case 1258:
            main.style.backgroundImage = 'url("assets/img/snowshower.jpg")';
            break;
        default:
            main.style.backgroundColor = '$blue';
    }
}

function getValuesTomorrow() {
    currentlocation.innerHTML = city;
    urlWheather = url + city + "&days=2";
    fetch(urlWheather)
        .then(resp => resp.json())
        .then(resp => {
            const info = resp;
            temp.innerHTML = info.forecast.forecastday[1].day.maxtemp_c + "°C";
            humidity.innerHTML = info.forecast.forecastday[1].day.avghumidity + "%";
            clouds.innerHTML = "";
            condition = info.current.condition.code;
            wind.innerHTML = info.forecast.forecastday[1].day.maxwind_kph + " km/h";
            sunrise.innerHTML = info.forecast.forecastday[1].astro.sunrise;
            sunset.innerHTML = info.forecast.forecastday[1].astro.sunset;
            setBackground(condition);
        })
        .catch(err => {
            console.error("Błąd ładowania danych")
        });
}










