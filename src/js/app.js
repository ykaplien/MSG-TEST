window.onload = () => {
	const menuButton = document.getElementById('menuButton');
	const findOutMoreButton = document.getElementById('findOutMore');

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
		  .then(response => response.json())
		  .then(data => {
		  	let selectedMass = [];

		  	for (let i = 0; i < featuresTitle.length; i++) {
		  		let {title, thumbnailUrl} = data[[Math.floor(Math.random() * data.length)]];
		  		selectedMass.push({title, thumbnailUrl});
		  	}
		  	selectedMass.forEach((el, index) => {
		  		featuresTitle[index].innerText = el.title;
		  		featuresIcon[index].src = el.thumbnailUrl;
		  	});
		  })
		  .catch(function(error) {
		    console.log(`Error: ${error.message}`);
		  });
	}

	function mobileMenu(){
		let menuList = document.getElementById('menuList');

		menuList.style.display = menuList.style.display == 'block' ? 'none' : 'block';
		menuList.classList.toggle('mobileMenu-show');
	}

	menuButton.addEventListener('click', mobileMenu, false);
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