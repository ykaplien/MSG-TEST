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
window.onload = () => {
	function featuresOverfill () {
		let featuresTitle = document.querySelectorAll('.feature__title');
		let featuresIcon = document.querySelectorAll('.feature__icon > img');

		fetch('https://jsonplaceholder.typicode.com/photos', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		})
		  .then(response => {
		    if (response.ok) {
		      return Promise.resolve(response);
		    }
		    else {
		      return Promise.reject(new Error('Failed to load')); 
		    }
		  })
		  .then(response => response.json()) // parse response as JSON
		  .then(data => {
		  	let cropData = [];

		  	for (let i = 0; i < featuresTitle.length; i++) {
		  		let {title, thumbnailUrl} = data[[Math.floor(Math.random() * data.length)]];
		  		cropData.push({title, thumbnailUrl});
		  	}
		  	return cropData;
		  })
		  .then(cropData => {
		  	cropData.forEach((el, index) => {
		  		featuresTitle[index].innerText = el.title;
		  		featuresIcon[index].src = el.thumbnailUrl;
		  	});
		  })
		  .catch(function(error) {
		    console.log(`Error: ${error.message}`);
		  });
	}

	const findOutMoreButton = document.getElementById('findOutMore');

	findOutMoreButton.addEventListener('click', featuresOverfill, false);
	  var slider = tns({
	    container: '.testimonials-left',
	    items: 1,
	    slideBy: 'page',
	    navContainer: '.testimonials-controls'
	  });
	var slider2 = tns({
	    container: '.testimonials-right',
	    items: 1,
	    slideBy: 'page',
	    navContainer: '.testimonials-controls'
	  });
}