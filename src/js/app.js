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
  	let slider = tns({
	    container: '.testimonials-left',
	    items: 1,
	    slideBy: 'page',
	    navContainer: '.testimonials-controls',
	    controls: false
	  });
	let slider2 = tns({
	    container: '.testimonials-right',
	    items: 1,
	    // slideBy: 'page',
	    navContainer: '.testimonials-controls',
		animateIn: "fadeIn",
		animateOut: "fadeOut",
	    controls: false,
	    axis: 'vertical'
	  });
}