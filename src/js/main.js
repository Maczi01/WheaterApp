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

const moment = require('moment-timezone');
const SwipeListener = require('swipe-listener');

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
const settingsEdit = document.querySelector('.settings--js');
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
const searchInputButton = document.querySelector(".cities__item--input");
const searchInput = document.querySelector(".searchModal--input");
const matchList = document.querySelector('.matchList');
const update = document.querySelector('.update__last');
const searchModal = document.querySelector('.searchModal')
const listener = SwipeListener(main);
let citiesList = ['Wroclaw', 'Katowice', 'Krakow', 'Warszawa'];
let condition;
let city;
let counteer = 0;
let urlWheather;
let localTime;
let tz;

window.onload = function () {
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
                    citiesList.unshift(city)
                    generateCitiesList();
                })
                .catch(err => {
                    console.error("Błąd ładowania danych")
                });
        });
    } else {
        console.log("Nie udostępniono lokalizacji");
        generateCitiesList();
    }
};

async function searchCity(city, functionType) {
    if (city.length > 0) {
        const result = await fetch(`https://api.weatherapi.com/v1/search.json?key=3f1ad206d1b94436825173623201101&q=${city}`)
        const cities = await result.json();

        let matches = cities.filter(place => {
            const regex = new RegExp(`^${city}`, 'gi');
            return place.name.match(regex)
        });
        if (city.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }
        outputHTML(matches, functionType);
    }
}

function outputHTML(matches, functionType) {
    if (matches.length === 0) {
        document.querySelectorAll('.result').forEach(e => e.remove())
    }
    if (matches.length > 0) {
        const html = matches.map(match =>
            `<div class="result">${match.name}</div>`
        )
            .join('');
        matchList.innerHTML = html;
    }
    switch (functionType) {
        case 'quickSearch':
            catchResultToFind();
            break;
        case 'quickAdd':
            catchResultToAdd();
            break;
        case 'quickEdit':
            catchResultToEdit();
            break;
    }
}

main.addEventListener('swipe', (e) => {
    let directions = e.detail.directions;
    // let x = e.detail.x;
    // let y = e.detail.y;
    if (directions.left) {
        if (counteer === 0) {
            counteer = citiesList.length
        }
        counteer--;
        city = citiesList[counteer];
    }
    if (directions.right) {
        counteer++;
        if (counteer === citiesList.length) {
            counteer = 0;
        }
        city = citiesList[counteer];
    }
    getValuesToday();
});

searchInput.addEventListener('input', () => searchCity(searchInput.value, searchModal.getAttribute('functionType')))

searchInputButton.addEventListener('click', (e) => {
    console.log(e.target.id)
    searchModal.style.display = "block";
    searchModal.setAttribute('functionType', e.target.id)
});

editCitiesList.addEventListener('click', () => {
    cities__toEditList.innerHTML = "";
    cities__toEditList.classList.toggle("cities__toEditList--visible");
    settingsList.classList = "settings__list";
    generateCitiesListToEdit();
    if (document.querySelector('.cities__toEditList--visible')) {
        settingsImage.src = "assets/img/back.svg";
    }
});

listCitiesToEdit.addEventListener('changes', showAddCityButton);

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
    // if (document.querySelector('.cities__toEditList--visible')) {
    //     document.querySelector('.cities__toEditList').addEventListener('click', (e) => {
    //         // e.stopPropagation()
    //         if (document.querySelectorAll('.toEditList__item--options').length === 1) {
    //             // if(citiesList.indexOf(e.target.innerHTML)> 0){
    //             //     console.log(Rekin)
    //             // }
    //
    //             if (e.target.innerHTML !== 'Edytuj' || e.target.innerHTML !== 'Usun') {
    //                 // console.log(e.target.inner/HTML)
    //                 console.log('duck')
    //                 generateCitiesListToEdit();
    //
    //                 // document.querySelectorAll('.cities__toEditList__item').forEach(e => e.parentNode.removeChild(e));
    //                 // document.querySelectorAll('.toEditList__item--options').forEach(e => e.remove());
    //                 document.querySelector('.toEditList__item--options').remove();
    //             }
    //             // generateCitiesListToEdit();
    //         }
    //     }, true);
    // }
    generateCitiesList();
});

today.addEventListener('click', getValuesToday);

tomorrow.addEventListener('click', getValuesTomorrow);

hamburger.addEventListener('click', showCityList);

settings.addEventListener('click', showSettingsList);

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
    document.querySelectorAll('.cities__item')[0].innerHTML += '<img src="assets/img/location.png" height="30" width="30" class="cities__item--current">'
}

function generateCitiesListToEdit() {
    document.querySelectorAll('.cities__toEditList__item--add').forEach(e => e.parentNode.removeChild(e))
    document.querySelectorAll('.cities__toEditList__item').forEach(e => e.parentNode.removeChild(e));
    citiesList.forEach(e => {
        let element = document.createElement('section');
        cities__toEditList.appendChild(element);
        element.classList.add('cities__toEditList__item');
        element.innerText = e;
        element.addEventListener('click', showOptions);

        // if (document.querySelector('.cities__toEditList--visible')) {
        //     document.querySelector('.cities__toEditList').addEventListener('click', (e) => {
        //         // e.stopPropagation()
        //         if (document.querySelectorAll('.toEditList__item--options').length === 1) {
        //             // if(citiesList.indexOf(e.target.innerHTML)> 0){
        //             //     console.log(Rekin)
        //             // }
        //
        //             if (e.target.innerHTML !== 'Edytuj' || e.target.innerHTML !== 'Usun') {
        //                 // console.log(e.target.inner/HTML)
        //                 console.log('duck')
        //                 generateCitiesListToEdit();
        //
        //                 // document.querySelectorAll('.cities__toEditList__item').forEach(e => e.parentNode.removeChild(e));
        //                 // document.querySelectorAll('.toEditList__item--options').forEach(e => e.remove());
        //                 document.querySelector('.toEditList__item--options').remove();
        //             }
        //             // generateCitiesListToEdit();
        //         }
        //     }, true);
        // }

    });
    showAddCityButton();
}

function showAddCityButton() {


    if (document.querySelector('.cities__toEditList__item--add')) {
        document.querySelector('.cities__toEditList__item--add').remove();
    }

    if (citiesList.length < 5) {
        let element = document.createElement('section');
        element.id = 'quickAdd'
        cities__toEditList.appendChild(element);
        element.classList.add('cities__toEditList__item--add');
        element.innerText = 'Dodaj miasto';
        element.addEventListener('click', (e) => {
            searchModal.style.display = "block";
            searchModal.setAttribute('functionType', e.target.id)
        });
        if (citiesList.length > 5) {
            document.querySelector.all('.toEditList__item--options').forEach(e => e.parentNode.removeChild(e))
        }
    }
}

function showOptions(e) {
    if (document.querySelectorAll('.toEditList__item--options').length === 0) {
        let currentButton = this;
        let options = document.createElement('section');
        let editButton = document.createElement('div');
        let deleteButton = document.createElement('div');
        cities__toEditList.appendChild(options);
        options.appendChild(editButton);
        options.appendChild(deleteButton);
        let currentCity = this.innerHTML;
        options.classList.add('toEditList__item--options');
        editButton.classList.add('toEditList__item--options--edit');
        deleteButton.classList.add('toEditList__item--options--delete');
        editButton.innerText = 'Edytuj';
        editButton.id = 'quickEdit';
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
        editButton.addEventListener("click", (e) => {
            searchModal.style.display = "block";
            searchModal.setAttribute('functionType', e.target.id)
            searchModal.setAttribute('cityToEdit', currentCity)
            searchInput.value = currentCity
        });
    }

    document.querySelector('.cities__toEditList').addEventListener('click', (e) => {
            if (document.querySelectorAll('.toEditList__item--options').length === 1) {
                if (citiesList.includes(e.target.innerHTML)) {
                    let rest = [];
                    document.querySelectorAll('.cities__toEditList__item').forEach(e => {
                        rest.push(e.innerHTML);
                    });
                    let clickedCity = e.target.innerHTML
                    let indexOfClickedCity = citiesList.indexOf(clickedCity);

                    document.querySelectorAll('.cities__toEditList__item').forEach(e => e.remove())
                    for (let i = 0; i < citiesList.length; i++) {
                        if (i === indexOfClickedCity) {
                            let options = document.createElement('section');
                            let editButton = document.createElement('div');
                            let deleteButton = document.createElement('div');
                            cities__toEditList.appendChild(options);
                            options.appendChild(editButton);
                            options.appendChild(deleteButton);
                            let currentCity = clickedCity;
                            options.classList.add('toEditList__item--options');
                            editButton.classList.add('toEditList__item--options--edit');
                            deleteButton.classList.add('toEditList__item--options--delete');
                            editButton.innerText = 'Edytuj';
                            editButton.id = 'quickEdit';
                            deleteButton.innerText = 'Usun';
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
                            editButton.addEventListener("click", (e) => {
                                searchModal.style.display = "block";
                                searchModal.setAttribute('functionType', e.target.id)
                                searchModal.setAttribute('cityToEdit', currentCity)
                                searchInput.value = currentCity
                            });
                        } else {
                            let element = document.createElement('section');
                            cities__toEditList.appendChild(element);
                            element.classList.add('cities__toEditList__item');
                            element.innerText = citiesList[i];
                            element.addEventListener('click', showOptions);
                        }
                    }
                    document.querySelector('.toEditList__item--options').remove();
                } else if (e.target.innerHTML !== 'Edytuj' || e.target.innerHTML !== 'Usun') {
                    console.log('duck')
                    generateCitiesListToEdit();
                    document.querySelector('.toEditList__item--options').remove();
                }
            }
        }, true
    );
    showAddCityButton()
}

function showSettingsList() {
    settingsList.classList.toggle("settings__list--visible");
    settingsImage.classList.toggle('settings__image--active');
    cities__toEditList.classList.remove('cities__toEditList--visible');
    if (document.querySelector('.cities__toEditList')) {
        settingsImage.src = "assets/img/settings.svg";
    }
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
            // moment().calendar(info.current.last_updated)
            update.innerHTML = `Last update: ${moment(info.current.last_updated).fromNow()}. Data from wheatherapi.com`
            // update.innerHTML = `Last update: ${moment(info.current.last_updated)}`
            sunrise.innerHTML = info.forecast.forecastday[0].astro.sunrise;
            sunset.innerHTML = info.forecast.forecastday[0].astro.sunset;
            // setBackground(condition);
        })
        .catch(err => {
            console.error("Błąd ładowania danych")
        });
}

// function setBackground(condition) {
//     switch (condition) {
//         case 1000:
//             main.style.backgroundImage = 'url("assets/img/sunny.jpg")';
//             break;
//         case 1003:
//             main.style.backgroundImage = 'url("assets/img/cloudy.jpg")';
//             break;
//         case 1006:
//             main.style.backgroundImage = 'url("assets/img/cloudy.jpg")';
//             break;
//         case 1009:
//             main.style.backgroundImage = 'url("assets/img/overcast.jpg")';
//             break;
//         case 1030:
//             main.style.backgroundImage = 'url("assets/img/mist.jpg")';
//             break;
//         case 1063:
//             main.style.backgroundImage = 'url("assets/img/patchyrain.jpg")';
//             break;
//         case 1066:
//             main.style.backgroundImage = 'url("assets/img/patchysnow.jpg")';
//             break;
//         case 1189:
//             main.style.backgroundImage = 'url("assets/img/moderaterain.jpg")';
//             break;
//         case 1258:
//             main.style.backgroundImage = 'url("assets/img/snowshower.jpg")';
//             break;
//         default:
//             main.style.backgroundColor = '$blue';
//     }
// }

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
            // setBackground(condition);
        })
        .catch(err => {
            console.error("Błąd ładowania danych")
        });
}

function catchResultToFind() {
    let elementNodeListOf = document.querySelectorAll('.result');
    console.log(elementNodeListOf)
    elementNodeListOf.forEach(e => {
        e.addEventListener('click', (e) => {
            let cityData = e.target.innerHTML;
            let cityinfo = cityData.split(',')[0];
            searchInput.value = cityinfo;
            city = cityinfo;
            getValuesToday();
            matchList.innerHTML = '';
            searchInput.value = '';
            searchModal.style.display = "none";
        });
    })
}

function catchResultToAdd() {
    let elementNodeListOf = document.querySelectorAll('.result');
    console.log(elementNodeListOf)
    elementNodeListOf.forEach(e => {
        e.addEventListener('click', (e) => {
            let cityData = e.target.innerHTML;
            let cityinfo = cityData.split(',')[0];
            searchInput.value = cityinfo;
            citiesList.push(cityinfo)
            generateCitiesListToEdit()
            matchList.innerHTML = '';
            searchInput.value = '';
            searchModal.style.display = "none";
        });
    })
}

function catchResultToEdit() {
    let cityToEdit = searchModal.getAttribute('cityToEdit');
    let elementNodeListOf = document.querySelectorAll('.result');
    console.log(elementNodeListOf)
    let indexToRemove = citiesList.indexOf(cityToEdit);
    elementNodeListOf.forEach(e => {
        e.addEventListener('click', (e) => {
            let cityData = e.target.innerHTML;
            let newCity = cityData.split(',')[0];
            searchInput.value = newCity;
            let indexToRemove = citiesList.indexOf(cityToEdit);
            citiesList.splice(indexToRemove, 1, newCity);
            generateCitiesListToEdit();
            matchList.innerHTML = '';
            searchInput.value = '';
            searchModal.style.display = "none";
            if (document.querySelector('.toEditList__item--options')) {
                document.querySelector('.toEditList__item--options').remove();
            }
        });
    })
}

function updateTime() {
    let timeToDisplay = moment.tz(tz);
    // time.innerHTML = timeToDisplay.format('hh:mm');
    let sec = timeToDisplay.format('ss')
    if (sec % 2 === 0) {
        time.innerHTML = timeToDisplay.format('hh:mm');
    } else {
        time.innerHTML = timeToDisplay.format('hh mm');
    }
    console.log()

    date.innerHTML = timeToDisplay.format('dddd[,] D MMM YYYY ');
}

setInterval(updateTime, 1000);
updateTime();












