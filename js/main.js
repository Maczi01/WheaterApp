!function(n){var c={};function g(t){if(c[t])return c[t].exports;var I=c[t]={i:t,l:!1,exports:{}};return n[t].call(I.exports,I,I.exports,g),I.l=!0,I.exports}g.m=n,g.c=c,g.d=function(n,c,t){g.o(n,c)||Object.defineProperty(n,c,{enumerable:!0,get:t})},g.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},g.t=function(n,c){if(1&c&&(n=g(n)),8&c)return n;if(4&c&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(g.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&c&&"string"!=typeof n)for(var I in n)g.d(t,I,function(c){return n[c]}.bind(null,I));return t},g.n=function(n){var c=n&&n.__esModule?function(){return n.default}:function(){return n};return g.d(c,"a",c),c},g.o=function(n,c){return Object.prototype.hasOwnProperty.call(n,c)},g.p="",g(g.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\r\n\r\n// service worker registration - remove if you're not going to use it\r\n\r\nif ('serviceWorker' in navigator) {\r\n    window.addEventListener('load', function () {\r\n        navigator.serviceWorker.register('serviceworker.js').then(function (registration) {\r\n            // Registration was successful\r\n            // console.log('ServiceWorker registration successful with scope: ', registration.scope);\r\n        }, function (err) {\r\n            // registration failed :(\r\n            // console.log('ServiceWorker registration failed: ', err);\r\n        });\r\n    });\r\n}\r\n\r\n// place your code below\r\nconst settingsImage = document.querySelector(\".settings__image\");\r\nconst temp = document.querySelector('.info__item--temperature--js');\r\nconst humidity = document.querySelector('.info__item--humidity--js');\r\nconst clouds = document.querySelector('.info__item--clouds--js');\r\nconst wind = document.querySelector('.info__item--wind--js');\r\nconst sunrise = document.querySelector('.info__item--sunrise--js');\r\nconst sunset = document.querySelector('.info__item--sunset--js');\r\nconst searchButton = document.querySelector(\".searchButton\");\r\nconst currentlocation = document.querySelector('.current__location');\r\nconst cities = document.querySelector('.cities');\r\nconst settingsList = document.querySelector('.settings__list');\r\nconst hamburger = document.querySelector('.hamburger--js');\r\nconst settings = document.querySelector('.settings--js');\r\nconst about = document.querySelector(\".settings__item--about\");\r\nconst modal = document.getElementById(\"myModal\");\r\nconst today = document.querySelector(\".current__days--today\");\r\nconst tomorrow = document.querySelector(\".current__days--tomorrow\");\r\nconst time = document.querySelector('.current__time');\r\nconst url = \"http://api.weatherapi.com/v1/forecast.json?key=3f1ad206d1b94436825173623201101&q=\";\r\nconst main = document.querySelector(\".main\");\r\nlet citiesList = ['Wrocław', 'Katowice', 'Krakow', 'Warszawa', 'Torun']\r\nlet condition;\r\nlet city;\r\nlet urlWheather;\r\n\r\nwindow.onload = function () {\r\n    // generateCitiesList();\r\n    time.innerHTML = new Date().getHours() + \":\" + new Date().getMinutes();\r\n    let loc = navigator.geolocation;\r\n    if (loc) {\r\n        loc.getCurrentPosition(function (location) {\r\n            const lat = location.coords.latitude;\r\n            const lon = location.coords.longitude;\r\n            fetch(url + lat + \",\" + lon)\r\n                .then(resp => resp.json())\r\n                .then(resp => {\r\n                    city = resp.location.name;\r\n                    getValuesToday();\r\n                })\r\n                .catch(err => {\r\n                    console.error(\"Błąd ładowania danych\")\r\n                });\r\n        });\r\n    } else {\r\n        console.log(\"Nie udostępniono lokalizacji\");\r\n    }\r\n};\r\n\r\nabout.onclick = function () {\r\n    modal.style.display = \"block\";\r\n};\r\n\r\nwindow.onclick = function (event) {\r\n    if (event.target === modal) {\r\n        modal.style.display = \"none\";\r\n    }\r\n};\r\n\r\ntoday.addEventListener('click', function () {\r\n    getValuesToday();\r\n});\r\n\r\ntomorrow.addEventListener('click', function () {\r\n    getValuesTomorrow();\r\n});\r\n\r\nhamburger.addEventListener('click', showCityList);\r\n\r\nsettings.addEventListener('click', showSettingsList);\r\n\r\nsearchButton.addEventListener('click', function () {\r\n    city = document.getElementById(\"customcity\").value;\r\n    getValuesToday();\r\n    // showCityList();\r\n});\r\n\r\ncities.addEventListener('click', function (e) {\r\n    if (e.target.className === (\"cities__item\")) {\r\n        city = e.target.textContent;\r\n        console.log(city);\r\n        getValuesToday();\r\n        // showCityList();\r\n    }\r\n\r\n});\r\n\r\nfunction showCityList() {\r\n    // if(modal.style.display==='block'){\r\n    hamburger.classList.toggle('hamburger--active');\r\n    cities.classList.toggle(\"cities--visible\");\r\n    // generateCitiesList();\r\n    // }\r\n}\r\n\r\n\r\n// function generateCitiesList() {\r\n//     citiesList.forEach(e =>{\r\n//         let element = document.createElement('section')\r\n//         cities.appendChild(element)\r\n//         element.classList.add('cities__item')\r\n//         element.innerText = e;\r\n//\r\n//     })\r\n// }\r\n\r\nfunction showSettingsList() {\r\n    settingsList.classList.toggle(\"settings__list--visible\");\r\n    settingsImage.classList.toggle('settings__image--active');\r\n\r\n}\r\n\r\nfunction getValuesToday() {\r\n    currentlocation.innerHTML = city;\r\n    urlWheather = url + city;\r\n    fetch(urlWheather)\r\n        .then(resp => resp.json())\r\n        .then(resp => {\r\n            const info = resp;\r\n            // var dateToshow = new Date(info.location.localtime);\r\n            // time.innerHTML = dateToshow.getHours() + \":\" + dateToshow.getMinutes();\r\n            temp.innerHTML = info.current.temp_c + \"°C\";\r\n            humidity.innerHTML = info.current.humidity + \"%\";\r\n            clouds.innerHTML = info.current.cloud + \"%\";\r\n            wind.innerHTML = info.current.wind_kph + \" km/h\";\r\n            condition = info.current.condition.code;\r\n            console.log(info.current.condition.text);\r\n            sunrise.innerHTML = info.forecast.forecastday[0].astro.sunrise;\r\n            sunset.innerHTML = info.forecast.forecastday[0].astro.sunset;\r\n            setBackground(condition);\r\n\r\n        })\r\n        .catch(err => {\r\n            console.error(\"Błąd ładowania danych\")\r\n        });\r\n\r\n}\r\n\r\nfunction setBackground(condition) {\r\n    switch (condition) {\r\n        case 1000:\r\n            main.style.backgroundImage = 'url(\"../assets/img/sunny.jpg\")';\r\n            break;\r\n        case 1003:\r\n            main.style.backgroundImage = 'url(\"../assets/img/cloudy.jpg\")';\r\n            break;\r\n        case 1006:\r\n            main.style.backgroundImage = 'url(\"../assets/img/cloudy.jpg\")';\r\n            break;\r\n        case 1009:\r\n            main.style.backgroundImage = 'url(\"../assets/img/overcast.jpg\")';\r\n            break;\r\n        case 1030:\r\n            main.style.backgroundImage = 'url(\"../assets/img/mist.jpg\")';\r\n            break;\r\n        case 1063:\r\n            main.style.backgroundImage = 'url(\"../assets/img/patchyrain.jpg\")';\r\n            break;\r\n        case 1066:\r\n            main.style.backgroundImage = 'url(\"../assets/img/patchysnow.jpg\")';\r\n            break;\r\n        case 1189:\r\n            main.style.backgroundImage = 'url(\"../assets/img/moderaterain.jpg\")';\r\n            break;\r\n        case 1258:\r\n            main.style.backgroundImage = 'url(\"../assets/img/snowshower.jpg\")';\r\n            break;\r\n        default:\r\n            main.style.backgroundColor = '$blue';\r\n    }\r\n}\r\n\r\nfunction getValuesTomorrow() {\r\n    currentlocation.innerHTML = city;\r\n    urlWheather = url + city + \"&days=2\";\r\n    fetch(urlWheather)\r\n        .then(resp => resp.json())\r\n        .then(resp => {\r\n            const info = resp;\r\n            temp.innerHTML = info.forecast.forecastday[1].day.maxtemp_c + \"°C\";\r\n            humidity.innerHTML = info.forecast.forecastday[1].day.avghumidity + \"%\";\r\n            clouds.innerHTML = \"\";\r\n            condition = info.current.condition.code;\r\n            wind.innerHTML = info.forecast.forecastday[1].day.maxwind_kph + \" km/h\";\r\n            sunrise.innerHTML = info.forecast.forecastday[1].astro.sunrise;\r\n            sunset.innerHTML = info.forecast.forecastday[1].astro.sunset;\r\n            setBackground(condition);\r\n        })\r\n        .catch(err => {\r\n            console.error(\"Błąd ładowania danych\")\r\n        });\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbiAtIHJlbW92ZSBpZiB5b3UncmUgbm90IGdvaW5nIHRvIHVzZSBpdFxyXG5cclxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzZXJ2aWNld29ya2VyLmpzJykudGhlbihmdW5jdGlvbiAocmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiAnLCByZWdpc3RyYXRpb24uc2NvcGUpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIHBsYWNlIHlvdXIgY29kZSBiZWxvd1xyXG5jb25zdCBzZXR0aW5nc0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR0aW5nc19faW1hZ2VcIik7XHJcbmNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb19faXRlbS0tdGVtcGVyYXR1cmUtLWpzJyk7XHJcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9fX2l0ZW0tLWh1bWlkaXR5LS1qcycpO1xyXG5jb25zdCBjbG91ZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb19faXRlbS0tY2xvdWRzLS1qcycpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9fX2l0ZW0tLXdpbmQtLWpzJyk7XHJcbmNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb19faXRlbS0tc3VucmlzZS0tanMnKTtcclxuY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9fX2l0ZW0tLXN1bnNldC0tanMnKTtcclxuY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hCdXR0b25cIik7XHJcbmNvbnN0IGN1cnJlbnRsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50X19sb2NhdGlvbicpO1xyXG5jb25zdCBjaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0aWVzJyk7XHJcbmNvbnN0IHNldHRpbmdzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nc19fbGlzdCcpO1xyXG5jb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLS1qcycpO1xyXG5jb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy0tanMnKTtcclxuY29uc3QgYWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNldHRpbmdzX19pdGVtLS1hYm91dFwiKTtcclxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15TW9kYWxcIik7XHJcbmNvbnN0IHRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50X19kYXlzLS10b2RheVwiKTtcclxuY29uc3QgdG9tb3Jyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRfX2RheXMtLXRvbW9ycm93XCIpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnRfX3RpbWUnKTtcclxuY29uc3QgdXJsID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PTNmMWFkMjA2ZDFiOTQ0MzY4MjUxNzM2MjMyMDExMDEmcT1cIjtcclxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxubGV0IGNpdGllc0xpc3QgPSBbJ1dyb2PFgmF3JywgJ0thdG93aWNlJywgJ0tyYWtvdycsICdXYXJzemF3YScsICdUb3J1biddXHJcbmxldCBjb25kaXRpb247XHJcbmxldCBjaXR5O1xyXG5sZXQgdXJsV2hlYXRoZXI7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gZ2VuZXJhdGVDaXRpZXNMaXN0KCk7XHJcbiAgICB0aW1lLmlubmVySFRNTCA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKSArIFwiOlwiICsgbmV3IERhdGUoKS5nZXRNaW51dGVzKCk7XHJcbiAgICBsZXQgbG9jID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uO1xyXG4gICAgaWYgKGxvYykge1xyXG4gICAgICAgIGxvYy5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdCA9IGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgICAgICAgICAgY29uc3QgbG9uID0gbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgZmV0Y2godXJsICsgbGF0ICsgXCIsXCIgKyBsb24pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2l0eSA9IHJlc3AubG9jYXRpb24ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRWYWx1ZXNUb2RheSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCxYLEhWQgxYJhZG93YW5pYSBkYW55Y2hcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5pZSB1ZG9zdMSZcG5pb25vIGxva2FsaXphY2ppXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuYWJvdXQub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbn07XHJcblxyXG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGdldFZhbHVlc1RvZGF5KCk7XHJcbn0pO1xyXG5cclxudG9tb3Jyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBnZXRWYWx1ZXNUb21vcnJvdygpO1xyXG59KTtcclxuXHJcbmhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dDaXR5TGlzdCk7XHJcblxyXG5zZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dTZXR0aW5nc0xpc3QpO1xyXG5cclxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VzdG9tY2l0eVwiKS52YWx1ZTtcclxuICAgIGdldFZhbHVlc1RvZGF5KCk7XHJcbiAgICAvLyBzaG93Q2l0eUxpc3QoKTtcclxufSk7XHJcblxyXG5jaXRpZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gKFwiY2l0aWVzX19pdGVtXCIpKSB7XHJcbiAgICAgICAgY2l0eSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHkpO1xyXG4gICAgICAgIGdldFZhbHVlc1RvZGF5KCk7XHJcbiAgICAgICAgLy8gc2hvd0NpdHlMaXN0KCk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dDaXR5TGlzdCgpIHtcclxuICAgIC8vIGlmKG1vZGFsLnN0eWxlLmRpc3BsYXk9PT0nYmxvY2snKXtcclxuICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItLWFjdGl2ZScpO1xyXG4gICAgY2l0aWVzLmNsYXNzTGlzdC50b2dnbGUoXCJjaXRpZXMtLXZpc2libGVcIik7XHJcbiAgICAvLyBnZW5lcmF0ZUNpdGllc0xpc3QoKTtcclxuICAgIC8vIH1cclxufVxyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIGdlbmVyYXRlQ2l0aWVzTGlzdCgpIHtcclxuLy8gICAgIGNpdGllc0xpc3QuZm9yRWFjaChlID0+e1xyXG4vLyAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpXHJcbi8vICAgICAgICAgY2l0aWVzLmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjaXRpZXNfX2l0ZW0nKVxyXG4vLyAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gZTtcclxuLy9cclxuLy8gICAgIH0pXHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIHNob3dTZXR0aW5nc0xpc3QoKSB7XHJcbiAgICBzZXR0aW5nc0xpc3QuY2xhc3NMaXN0LnRvZ2dsZShcInNldHRpbmdzX19saXN0LS12aXNpYmxlXCIpO1xyXG4gICAgc2V0dGluZ3NJbWFnZS5jbGFzc0xpc3QudG9nZ2xlKCdzZXR0aW5nc19faW1hZ2UtLWFjdGl2ZScpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VmFsdWVzVG9kYXkoKSB7XHJcbiAgICBjdXJyZW50bG9jYXRpb24uaW5uZXJIVE1MID0gY2l0eTtcclxuICAgIHVybFdoZWF0aGVyID0gdXJsICsgY2l0eTtcclxuICAgIGZldGNoKHVybFdoZWF0aGVyKVxyXG4gICAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4ocmVzcCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSByZXNwO1xyXG4gICAgICAgICAgICAvLyB2YXIgZGF0ZVRvc2hvdyA9IG5ldyBEYXRlKGluZm8ubG9jYXRpb24ubG9jYWx0aW1lKTtcclxuICAgICAgICAgICAgLy8gdGltZS5pbm5lckhUTUwgPSBkYXRlVG9zaG93LmdldEhvdXJzKCkgKyBcIjpcIiArIGRhdGVUb3Nob3cuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0ZW1wLmlubmVySFRNTCA9IGluZm8uY3VycmVudC50ZW1wX2MgKyBcIsKwQ1wiO1xyXG4gICAgICAgICAgICBodW1pZGl0eS5pbm5lckhUTUwgPSBpbmZvLmN1cnJlbnQuaHVtaWRpdHkgKyBcIiVcIjtcclxuICAgICAgICAgICAgY2xvdWRzLmlubmVySFRNTCA9IGluZm8uY3VycmVudC5jbG91ZCArIFwiJVwiO1xyXG4gICAgICAgICAgICB3aW5kLmlubmVySFRNTCA9IGluZm8uY3VycmVudC53aW5kX2twaCArIFwiIGttL2hcIjtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gaW5mby5jdXJyZW50LmNvbmRpdGlvbi5jb2RlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvLmN1cnJlbnQuY29uZGl0aW9uLnRleHQpO1xyXG4gICAgICAgICAgICBzdW5yaXNlLmlubmVySFRNTCA9IGluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcclxuICAgICAgICAgICAgc3Vuc2V0LmlubmVySFRNTCA9IGluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xyXG4gICAgICAgICAgICBzZXRCYWNrZ3JvdW5kKGNvbmRpdGlvbik7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCxYLEhWQgxYJhZG93YW5pYSBkYW55Y2hcIilcclxuICAgICAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEJhY2tncm91bmQoY29uZGl0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGNvbmRpdGlvbikge1xyXG4gICAgICAgIGNhc2UgMTAwMDpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9zdW5ueS5qcGdcIiknO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwMDM6XHJcbiAgICAgICAgICAgIG1haW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIi4uL2Fzc2V0cy9pbWcvY2xvdWR5LmpwZ1wiKSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTAwNjpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9jbG91ZHkuanBnXCIpJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDA5OlxyXG4gICAgICAgICAgICBtYWluLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCIuLi9hc3NldHMvaW1nL292ZXJjYXN0LmpwZ1wiKSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTAzMDpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9taXN0LmpwZ1wiKSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTA2MzpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9wYXRjaHlyYWluLmpwZ1wiKSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTA2NjpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9wYXRjaHlzbm93LmpwZ1wiKSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE4OTpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi4vYXNzZXRzL2ltZy9tb2RlcmF0ZXJhaW4uanBnXCIpJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMjU4OlxyXG4gICAgICAgICAgICBtYWluLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCIuLi9hc3NldHMvaW1nL3Nub3dzaG93ZXIuanBnXCIpJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbWFpbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJGJsdWUnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRWYWx1ZXNUb21vcnJvdygpIHtcclxuICAgIGN1cnJlbnRsb2NhdGlvbi5pbm5lckhUTUwgPSBjaXR5O1xyXG4gICAgdXJsV2hlYXRoZXIgPSB1cmwgKyBjaXR5ICsgXCImZGF5cz0yXCI7XHJcbiAgICBmZXRjaCh1cmxXaGVhdGhlcilcclxuICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgICAgIC50aGVuKHJlc3AgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gcmVzcDtcclxuICAgICAgICAgICAgdGVtcC5pbm5lckhUTUwgPSBpbmZvLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5tYXh0ZW1wX2MgKyBcIsKwQ1wiO1xyXG4gICAgICAgICAgICBodW1pZGl0eS5pbm5lckhUTUwgPSBpbmZvLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5hdmdodW1pZGl0eSArIFwiJVwiO1xyXG4gICAgICAgICAgICBjbG91ZHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gaW5mby5jdXJyZW50LmNvbmRpdGlvbi5jb2RlO1xyXG4gICAgICAgICAgICB3aW5kLmlubmVySFRNTCA9IGluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHdpbmRfa3BoICsgXCIga20vaFwiO1xyXG4gICAgICAgICAgICBzdW5yaXNlLmlubmVySFRNTCA9IGluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uYXN0cm8uc3VucmlzZTtcclxuICAgICAgICAgICAgc3Vuc2V0LmlubmVySFRNTCA9IGluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uYXN0cm8uc3Vuc2V0O1xyXG4gICAgICAgICAgICBzZXRCYWNrZ3JvdW5kKGNvbmRpdGlvbik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkLFgsSFZCDFgmFkb3dhbmlhIGRhbnljaFwiKVxyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n")}]);