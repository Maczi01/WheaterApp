"use strict";

// service worker registration - remove if you're not going to use it

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
const hamburger = document.querySelector('.hamburger--js');
const settings = document.querySelector('.settings--js');
const about = document.querySelector(".settings__item--about");
const modal = document.getElementById("myModal");

about.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const today = document.querySelector(".current__days--today");
const tomorrow = document.querySelector(".current__days--tomorrow");
const time = document.querySelector('.current__time');
const url = "http://api.weatherapi.com/v1/forecast.json?key=3f1ad206d1b94436825173623201101&q=";
const main = document.querySelector(".main");
let condition;
let city;
let urlWheather;

window.onload = function () {
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
                })
                .catch(err => {
                    console.error("Błąd ładowania danych")
                });
        });
    } else {
        console.log("Nie udostępniono lokalizacji");
    }
};

today.addEventListener('click', function () {
    getValuesToday();
});

tomorrow.addEventListener('click', function () {
    getValuesTomorrow();
});

hamburger.addEventListener('click', showCityList);

settings.addEventListener('click', showSettingsList);

searchButton.addEventListener('click', function () {
    city = document.getElementById("customcity").value;
    getValuesToday();
    showCityList();
});

cities.addEventListener('click', function (e) {
    if (e.target.className === ("cities__item")) {
        city = e.target.textContent;
        console.log(city);
        getValuesToday();
        showCityList();
    }

});

function showCityList() {
    cities.classList.toggle("cities--visible");
}

function showSettingsList() {
    settingsList.classList.toggle("settings__list--visible");
}

function getValuesToday() {
    currentlocation.innerHTML = city;
    urlWheather = url + city;
    fetch(urlWheather)
        .then(resp => resp.json())
        .then(resp => {
            const info = resp;
            // var dateToshow = new Date(info.location.localtime);
            // time.innerHTML = dateToshow.getHours() + ":" + dateToshow.getMinutes();
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
            main.style.backgroundImage = 'url("../assets/img/sunny.jpg")';
            break;
        case 1003:
            main.style.backgroundImage = 'url("../assets/img/cloudy.jpg")';
            break;
        case 1006:
            main.style.backgroundImage = 'url("../assets/img/cloudy.jpg")';
            break;
        case 1009:
            main.style.backgroundImage = 'url("../assets/img/overcast.jpg")';
            break;
        case 1030:
            main.style.backgroundImage = 'url("../assets/img/mist.jpg")';
            break;
        case 1063:
            main.style.backgroundImage = 'url("../assets/img/patchyrain.jpg")';
            break;
        case 1066:
            main.style.backgroundImage = 'url("../assets/img/patchysnow.jpg")';
            break;
        case 1189:
            main.style.backgroundImage = 'url("../assets/img/moderaterain.jpg")';
            break;
        case 1258:
            main.style.backgroundImage = 'url("../assets/img/snowshower.jpg")';
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







