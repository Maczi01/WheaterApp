// "use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// place your code below

const temp = document.querySelector('.info__item--temperature--js');
const humidity = document.querySelector('.info__item--humidity--js');
const clouds = document.querySelector('.info__item--clouds--js');
const wind = document.querySelector('.info__item--wind--js');
const city = document.querySelector('.cities');

let url = "http://api.weatherapi.com/v1/current.json?key=5ff4f415d6e94783821203729200701&q=" + city;
// var valuse = "";

// city.addEventListener('click', valuse = document.querySelector('.cities__item').getAttribute());

console.log(value)
// fetch('http://api.weatherapi.com/v1/current.json?key=5ff4f415d6e94783821203729200701&q='${valuse})
fetch(url)
    .then(resp => resp.json())
    .then(resp => {
        const info = resp
        temp.innerHTML = info.current.temp_c + "°C";
        humidity.innerHTML = info.current.humidity + "%";
        clouds.innerHTML = info.current.cloud + "%";
        wind.innerHTML = info.current.wind_kph + " km/h";
    })
    .catch(err => {
        console.error("Błąd ładowania danych")
    });



