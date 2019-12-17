"use strict";

window.onload = function () {
  var menuButton = document.getElementById('menuButton');
  var findOutMoreButton = document.getElementById('findOutMore');

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
    }).then(function (data) {
      var selectedMass = [];

      for (var i = 0; i < featuresTitle.length; i++) {
        var _data = data[[Math.floor(Math.random() * data.length)]],
            title = _data.title,
            thumbnailUrl = _data.thumbnailUrl;
        selectedMass.push({
          title: title,
          thumbnailUrl: thumbnailUrl
        });
      }

      selectedMass.forEach(function (el, index) {
        featuresTitle[index].innerText = el.title;
        featuresIcon[index].src = el.thumbnailUrl;
      });
    })["catch"](function (error) {
      console.log("Error: ".concat(error.message));
    });
  }

  function mobileMenu() {
    var menuList = document.getElementById('menuList');
    var menuButtonImg = document.getElementById('menuButton__img');
    menuList.style.display = menuList.style.display == 'block' ? 'none' : 'block';
    menuList.classList.toggle('mobileMenu-show');

    if (menuButtonImg.src == './img/hamburgerMune.svg') {
      menuButtonImg.src = './img/close.svg';
      console.log(menuButtonImg.src);
    } else {
      menuButtonImg.src = './img/hamburgerMune.svg';
      console.log(menuButtonImg.src);
    }
  }

  menuButton.addEventListener('click', mobileMenu, false);
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