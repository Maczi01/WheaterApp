"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below

const temp = document.querySelector('.info__item--temperature--js');
const humidity = document.querySelector('.info__item--humidity--js');


fetch('http://api.weatherapi.com/v1/current.json?key=5ff4f415d6e94783821203729200701&q=Wroclaw')
    .then(resp => resp.json())
    .then(resp => {
      const repo = resp
        console.log(repo)
      temp.innerHTML = repo.current.temp_c;
      humidity.innerHTML = repo.current.humidity;
    })
    .catch(err => {
      console.error("BLa")
    })

