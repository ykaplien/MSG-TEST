"use strict";

// import { tns } from "../node_modules/tiny-slider/src/tiny-slider";
// function getMass () {
// 	const xhr = new XMLHttpRequest();
// 	const resultArray = [];
// 	let	data = null;
// 	xhr.withCredentials = true;
// 	xhr.open("GET", "https://jsonplaceholder.typicode.com/photos");
// 	xhr.send(data);
// 	xhr.addEventListener("readystatechange", function () {
// 	  	if (this.readyState === 4) {
// 	  		let featuresTitle = document.querySelectorAll('.feature__title');
// 	  		let featuresIcon = document.querySelectorAll('.feature__icon > img');
// 	  		let response = JSON.parse(this.response);
// 	  		for (let i = 0; i < 6; i++) {
// 	  			resultArray.push(response[Math.floor(Math.random() * response.length)]);
// 	  		}
// 			resultArray.forEach(function (el, index) {
// 				featuresTitle[index].innerText = el.title;
// 				featuresIcon[index].src = el.thumbnailUrl;
// 			});
// 	  	}
// 	});
// }
// fetch("https://jsonplaceholder.typicode.com/photos")
// 	.then(response => console.log(response));
window.onload = function () {
  function featuresOverfill() {
    var featuresTitle = document.querySelectorAll('.feature__title');
    var featuresIcon = document.querySelectorAll('.feature__icon > img');
    fetch('https://jsonplaceholder.typicode.com/photos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error('Failed to load'));
      }
    }).then(function (response) {
      return response.json();
    }) // parse response as JSON
    .then(function (data) {
      var cropData = [];

      for (var i = 0; i < featuresTitle.length; i++) {
        var _data = data[[Math.floor(Math.random() * data.length)]],
            title = _data.title,
            thumbnailUrl = _data.thumbnailUrl;
        cropData.push({
          title: title,
          thumbnailUrl: thumbnailUrl
        });
      }

      return cropData;
    }).then(function (cropData) {
      cropData.forEach(function (el, index) {
        featuresTitle[index].innerText = el.title;
        featuresIcon[index].src = el.thumbnailUrl;
      });
    })["catch"](function (error) {
      console.log("Error: ".concat(error.message));
    });
  }

  var findOutMoreButton = document.getElementById('findOutMore');
  findOutMoreButton.addEventListener('click', featuresOverfill, false);
  var slider = tns({
    container: '.testimonials-left',
    items: 1,
    slideBy: 'page',
    navContainer: '.testimonials-controls',
    controls: false
  });
  var slider2 = tns({
    container: '.testimonials-right',
    items: 1,
    // slideBy: 'page',
    navContainer: '.testimonials-controls',
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    controls: false,
    axis: 'vertical'
  });
};