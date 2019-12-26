window.onload = () => {
	const menuButton = document.getElementById('menuButton');
	const findOutMoreButton = document.getElementById('findOutMore');
	const mobileBlur = document.querySelector('.mobile-blur');
	const mobileMenu = document.querySelector('.mobile-menu');
	const menuCloseBtn = document.querySelector('#menu-close');

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

	mobileMenu.querySelectorAll('.mobile-nav-list__link').forEach((item) => {
		item.addEventListener('click', menuHide);
	});

	function menuShow () {
		document.body.style.overflow = 'hidden';
		mobileBlur.style.filter = 'blur(10px)';
		mobileMenu.style.display = 'flex';
	}

	function menuHide () {
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
}

window.onresize = () => {
	$('.slider-left').slick('refresh');
	$('.slider-right').slick('refresh');
};