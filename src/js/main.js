"use strict";

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

var moment = require('moment-timezone');

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
const listCitiesToEdit = document.querySelector(".cities__toEditList");
const modal = document.getElementById("myModal");
const today = document.querySelector(".current__days--today");
const tomorrow = document.querySelector(".current__days--tomorrow");
const time = document.querySelector('.current__time');
const date = document.querySelector('.current__date');
const url = "https://api.weatherapi.com/v1/forecast.json?key=3f1ad206d1b94436825173623201101&q=";
const main = document.querySelector(".main");
const searchInput = document.querySelector(".cities__item--input");
const matchList = document.querySelector('.matchList');

let citiesList = ['Wrocław', 'Katowice', 'Krakow', 'Warszawa'];
let condition;
let city;
let urlWheather;
let localTime;
let tz;

async function searchCity(city) {
    if (city.length > 0) {
        const result = await fetch(`http://api.weatherapi.com/v1/search.json?key=3f1ad206d1b94436825173623201101&q=${city}`)
        const cities = await result.json();

        let matches = cities.filter(place => {
            const regex = new RegExp(`^${city}`, 'gi');
            return place.name.match(regex)
        });

        if (city.length === 0) {
            matches = []
            matchList.innerHTML = '';
        }
        console.log(matches[0])
        outputHTML(matches);
    }
}

function outputHTML(matches) {
    if (matches.length === 0) {
        document.querySelectorAll('.result').forEach(e => e.remove())
    }

    if (matches.length > 0) {
        const html = matches.map(match =>
            `<div class="result">${match.name} </div>`
        )
            .join('');
        matchList.innerHTML = html;
    }

    let elementNodeListOf = document.querySelectorAll('.result');
    console.log(elementNodeListOf)
    elementNodeListOf.forEach(e => {
        e.addEventListener('click', (e) => {
            let cityData = e.target.innerHTML;
            let city = cityData.split(',')[0];
            searchInput.value = city;
        });
    })
}

// searchInput.addEventListener('input', () => searchCity(searchInput.value))

const searchModal = document.querySelector('.searchModal')
searchInput.addEventListener('click', () =>{
    searchModal.style.display = "block";
})

window.onload = function () {
    console.log(citiesList);
    let loc = navigator.geolocation;
    if (loc) {
        loc.getCurrentPosition(function (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            fetch(url + lat + "," + lon)
                .then(resp => resp.json())
                .then(resp => {
                    city = resp.location.name;

                    console.log(citiesList)
                    getValuesToday();
                    citiesList.unshift(city)
                    generateCitiesList();

                })
                .catch(err => {
                    console.error("Błąd ładowania danych")
                });
        });
    } else {
        console.log("Nie udostępniono lokalizacji");
    }
};

function generateCitiesListToEdit() {
    document.querySelectorAll('.cities__toEditList__item').forEach(e => e.parentNode.removeChild(e));
    citiesList.forEach(e => {
        let element = document.createElement('section');
        cities__toEditList.appendChild(element);
        element.classList.add('cities__toEditList__item');
        element.innerText = e;
        element.addEventListener('click', showOptions);

    });
}

function showAddCityButton() {
    if (citiesList.length < 5) {
        let element = document.createElement('section');
        cities__toEditList.appendChild(element);
        element.classList.add('cities__toEditList__item--add');
        element.innerText = 'Dodaj miasto';
        element.addEventListener('click', () => {
            searchModal.style.display = "block";
        });
        // element.addEventListener('click', () => {
        //     let input = document.createElement('section');
        //     input.classList.add('toEditList__item--options');
        //     input.innerHTML = '<input type="text" placeholder="Dodaj miasto" name="name" id="add" class="addCityinput"/>';
        //     cities__toEditList.appendChild(input);
        //     element.replaceWith(input);
        //     let a = document.getElementById('add');
        //     input.addEventListener('blur', () => {
        //         let newCity = a.value;
        //         citiesList.push(newCity);
        //         console.log(citiesList);
        //         generateCitiesListToEdit();
        //         showAddCityButton();
        //         input.remove();
        //     }, true);
        // });
    }
    if (citiesList.length >5) {
        document.querySelector('.toEditList__item--options').remove()
    }
}

editCitiesList.addEventListener('click', () => {
    cities__toEditList.innerHTML = "";
    cities__toEditList.classList.toggle("cities__toEditList--visible");
    settingsList.classList = "settings__list";
    generateCitiesListToEdit();
    showAddCityButton();
});
listCitiesToEdit.addEventListener('changes', showAddCityButton);

function showOptions(e) {
    if (document.querySelectorAll('.toEditList__item--options').length === 0) {
        let currentButton = this;
        let options = document.createElement('section');
        let editButton = document.createElement('div');
        let inputEditButton = document.createElement('div');
        let deleteButton = document.createElement('div');
        cities__toEditList.appendChild(options);
        options.appendChild(editButton);
        options.appendChild(deleteButton);
        options.appendChild(inputEditButton);
        let currentCity = this.innerHTML;
        options.classList.add('toEditList__item--options');
        editButton.classList.add('toEditList__item--options--edit');
        inputEditButton.innerHTML = `<input type='text' name='name' placeholder="${currentCity}" id='edited' class='editCityinput'/>`;
        deleteButton.classList.add('toEditList__item--options--delete');
        editButton.innerText = 'Edytuj';
        deleteButton.innerText = 'Usun';
        currentButton.replaceWith(options);
        deleteButton.addEventListener('click', () => {
            citiesList.splice(citiesList.indexOf(currentCity), 1);
            cities__toEditList.innerHTML = "";
            citiesList.forEach(e => {
                let element = document.createElement('section');
                cities__toEditList.appendChild(element);
                element.classList.add('cities__toEditList__item');
                element.innerText = e;
                element.addEventListener('click', showOptions);
            });
            showAddCityButton()
        }, true);
        editButton.addEventListener("click", () => {
            searchModal.style.display = "block";
        });

        // editButton.addEventListener("click", () => {
        //     e.stopPropagation();
        //     let indexToRemove = citiesList.indexOf(currentCity);
        //     deleteButton.style.display = 'none';
        //     editButton.style.display = 'none';
        //     let a = document.getElementById('edited');
        //     document.querySelector('.editCityinput').style.opacity = 1;
        //     inputEditButton.addEventListener('blur', (e) => {
        //         let newCity = a.value;
        //         if (newCity.length === 0) {
        //             newCity = currentCity;
        //         }
        //         citiesList.splice(indexToRemove, 1, newCity);
        //         let element = document.createElement('section');
        //         cities__toEditList.appendChild(element);
        //         element.classList.add('cities__toEditList__item');
        //         element.innerText = newCity;
        //         element.addEventListener('click', showOptions);
        //         document.querySelector('.toEditList__item--options').replaceWith(element);
        //     }, true);
        // });
    }
}

about.addEventListener('click', () => {
    modal.style.display = "block";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
    if (e.target === searchModal) {
        searchModal.style.display = "none";
    }
    generateCitiesList();
});

today.addEventListener('click', getValuesToday);

tomorrow.addEventListener('click', getValuesTomorrow);

hamburger.addEventListener('click', showCityList);

settings.addEventListener('click', showSettingsList);

searchButton.addEventListener('click', () => {
    city = document.getElementById("customcity").value;
    getValuesToday();
});

cities.addEventListener('click', function (e) {
    if (e.target.className === ("cities__item")) {
        city = e.target.textContent;
        getValuesToday();
    }
    cities.classList.toggle("cities--visible");
    hamburger.classList.toggle('hamburger--active');
});

function showCityList() {
    hamburger.classList.toggle('hamburger--active');
    cities.classList.toggle("cities--visible");
    generateCitiesList();
}

function generateCitiesList() {
    document.querySelectorAll('.cities__item').forEach(e => e.parentNode.removeChild(e));
    citiesList.forEach(e => {
        let element = document.createElement('section')
        cities.appendChild(element)
        element.classList.add('cities__item')
        element.innerText = e;
    })
    // document.querySelectorAll('.cities__item')[0].classList.add('cities__item--current')
    document.querySelectorAll('.cities__item')[0].innerHTML += '<img src="assets/img/location.png" height="30" width="30" class="cities__item--current">'
}

function showSettingsList() {
    settingsList.classList.toggle("settings__list--visible");
    settingsImage.classList.toggle('settings__image--active');
    cities__toEditList.classList.remove('cities__toEditList--visible');
}

function getValuesToday() {
    currentlocation.innerHTML = city;
    urlWheather = url + city;
    fetch(urlWheather)
        .then(async resp => resp.json())
        .then(resp => {
            const info = resp;
            localTime = new Date(info.location.localtime);
            tz = info.location.tz_id;
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

function updateTime() {
    let timeToDisplay = moment.tz(tz);
    time.innerHTML = timeToDisplay.format('hh:mm');

    date.innerHTML = timeToDisplay.format('dddd[,] d MMM YYYY ');
}

setInterval(updateTime, 1000);
updateTime();












