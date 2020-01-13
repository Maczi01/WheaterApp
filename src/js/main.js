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
const cities = document.querySelector('.cities');
const searchButton = document.querySelector(".searchButton");
let city = 'Wroclaw';
searchButton.addEventListener('click', function () {
    city = document.getElementById("customcity").value;
    getValues();
});
var urlWheather;
var urlAstro;

// cities.addEventListener('click', getValues);
cities.addEventListener('click', function (e) {
    if (e.target.className === ("cities__item")) {
        city = e.target.textContent;
        console.log(city);
        getValues();
    }
})


function getValues() {
    // if (e.target.className === ("cities__item")) {
    //   city = e.target.textContent;
    // console.log(city);
    urlWheather = "http://api.weatherapi.com/v1/current.json?key=3f1ad206d1b94436825173623201101&q=" + city;
    urlAstro = "http://api.weatherapi.com/v1/astronomy.json?key=3f1ad206d1b94436825173623201101&q=" + city + "&dt=2020-01-11";
    // console.log(city);
    // console.log(url);
    fetch(urlWheather)
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

    fetch(urlAstro)
        .then(resp => resp.json())
        .then(resp => {
            const info = resp
            sunrise.innerHTML = info.astronomy.astro.sunrise;
            sunset.innerHTML = info.astronomy.astro.sunset;
        })
        .catch(err => {
            console.error("Błąd ładowania danych")
        });
}







