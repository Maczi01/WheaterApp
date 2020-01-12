!function(n){var c={};function e(r){if(c[r])return c[r].exports;var t=c[r]={i:r,l:!1,exports:{}};return n[r].call(t.exports,t,t.exports,e),t.l=!0,t.exports}e.m=n,e.c=c,e.d=function(n,c,r){e.o(n,c)||Object.defineProperty(n,c,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,c){if(1&c&&(n=e(n)),8&c)return n;if(4&c&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&c&&"string"!=typeof n)for(var t in n)e.d(r,t,function(c){return n[c]}.bind(null,t));return r},e.n=function(n){var c=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(c,"a",c),c},e.o=function(n,c){return Object.prototype.hasOwnProperty.call(n,c)},e.p="",e(e.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\r\n\r\n// service worker registration - remove if you're not going to use it\r\n\r\nif ('serviceWorker' in navigator) {\r\n    window.addEventListener('load', function () {\r\n        navigator.serviceWorker.register('serviceworker.js').then(function (registration) {\r\n            // Registration was successful\r\n            // console.log('ServiceWorker registration successful with scope: ', registration.scope);\r\n        }, function (err) {\r\n            // registration failed :(\r\n            // console.log('ServiceWorker registration failed: ', err);\r\n        });\r\n    });\r\n}\r\n\r\n// place your code below\r\n\r\nconst temp = document.querySelector('.info__item--temperature--js');\r\nconst humidity = document.querySelector('.info__item--humidity--js');\r\nconst clouds = document.querySelector('.info__item--clouds--js');\r\nconst wind = document.querySelector('.info__item--wind--js');\r\nconst cities = document.querySelector('.cities');\r\nlet somevalue = 'Wroclaw';\r\nvar url;\r\nconsole.log(somevalue);\r\n\r\n\r\ncities.addEventListener('click', function (e) {\r\n  somevalue =   e.target.textContent;\r\n  url = \"http://api.weatherapi.com/v1/current.json?key=3f1ad206d1b94436825173623201101&q=\" + somevalue;\r\n  console.log(somevalue);\r\n  console.log(url);\r\n  fetch(url)\r\n      .then(resp => resp.json())\r\n      .then(resp => {\r\n        const info = resp\r\n        temp.innerHTML = info.current.temp_c + \"°C\";\r\n        humidity.innerHTML = info.current.humidity + \"%\";\r\n        clouds.innerHTML = info.current.cloud + \"%\";\r\n        wind.innerHTML = info.current.wind_kph + \" km/h\";\r\n      })\r\n      .catch(err => {\r\n        console.error(\"Błąd ładowania danych\")\r\n      });\r\n});\r\n\r\n\r\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbiAtIHJlbW92ZSBpZiB5b3UncmUgbm90IGdvaW5nIHRvIHVzZSBpdFxyXG5cclxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzZXJ2aWNld29ya2VyLmpzJykudGhlbihmdW5jdGlvbiAocmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiAnLCByZWdpc3RyYXRpb24uc2NvcGUpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIHBsYWNlIHlvdXIgY29kZSBiZWxvd1xyXG5cclxuY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvX19pdGVtLS10ZW1wZXJhdHVyZS0tanMnKTtcclxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb19faXRlbS0taHVtaWRpdHktLWpzJyk7XHJcbmNvbnN0IGNsb3VkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvX19pdGVtLS1jbG91ZHMtLWpzJyk7XHJcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb19faXRlbS0td2luZC0tanMnKTtcclxuY29uc3QgY2l0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdGllcycpO1xyXG5sZXQgc29tZXZhbHVlID0gJ1dyb2NsYXcnO1xyXG52YXIgdXJsO1xyXG5jb25zb2xlLmxvZyhzb21ldmFsdWUpO1xyXG5cclxuXHJcbmNpdGllcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgc29tZXZhbHVlID0gICBlLnRhcmdldC50ZXh0Q29udGVudDtcclxuICB1cmwgPSBcImh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zZjFhZDIwNmQxYjk0NDM2ODI1MTczNjIzMjAxMTAxJnE9XCIgKyBzb21ldmFsdWU7XHJcbiAgY29uc29sZS5sb2coc29tZXZhbHVlKTtcclxuICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gIGZldGNoKHVybClcclxuICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcclxuICAgICAgLnRoZW4ocmVzcCA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5mbyA9IHJlc3BcclxuICAgICAgICB0ZW1wLmlubmVySFRNTCA9IGluZm8uY3VycmVudC50ZW1wX2MgKyBcIsKwQ1wiO1xyXG4gICAgICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IGluZm8uY3VycmVudC5odW1pZGl0eSArIFwiJVwiO1xyXG4gICAgICAgIGNsb3Vkcy5pbm5lckhUTUwgPSBpbmZvLmN1cnJlbnQuY2xvdWQgKyBcIiVcIjtcclxuICAgICAgICB3aW5kLmlubmVySFRNTCA9IGluZm8uY3VycmVudC53aW5kX2twaCArIFwiIGttL2hcIjtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkLFgsSFZCDFgmFkb3dhbmlhIGRhbnljaFwiKVxyXG4gICAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n")}]);