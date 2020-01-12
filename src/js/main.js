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
const cities = document.querySelector('.cities');
let somevalue = 'Wroclaw';
var url;
console.log(somevalue);


cities.addEventListener('click', function (e) {
  somevalue =   e.target.textContent;
  url = "http://api.weatherapi.com/v1/current.json?key=3f1ad206d1b94436825173623201101&q=" + somevalue;
  console.log(somevalue);
  console.log(url);
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
});





