"use strict";

window.onload = function () {
  var menuButton = document.getElementById('menuButton');
  var findOutMoreButton = document.getElementById('findOutMore');
  var mobileBlur = document.querySelector('.mobile-blur');
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuCloseBtn = document.querySelector('#menu-close');

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

  mobileMenu.querySelectorAll('.mobile-nav-list__link').forEach(function (item) {
    item.addEventListener('click', menuHide);
  });

  function menuShow() {
    document.body.style.overflow = 'hidden';
    mobileBlur.style.filter = 'blur(10px)';
    mobileMenu.style.display = 'flex';
  }

  function menuHide() {
    document.body.style.overflow = 'visible';
    mobileBlur.style.filter = 'none';
    mobileMenu.style.display = 'none';
  }

  findOutMoreButton.addEventListener('click', featuresOverfill);
  menuButton.addEventListener('click', menuShow);
  menuCloseBtn.addEventListener('click', menuHide);
  $('.slider-left').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: '.slider-right'
  });
  $('.slider-right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.slider-left'
  });
};

window.onresize = function () {
  $('.slider-left').slick('refresh');
  $('.slider-right').slick('refresh');
};