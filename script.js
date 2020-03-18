const slideData = {
	portfolio: {
		automotive: 10,
		digital: 5,
		facilities: 5,
		food: 8,
		home: 2,
		people: 8,
		personal: 7,
		tabletop: 6,
		tech: 3,
	},
};

/**
 * Resize .full-height.height-exclude-header elements to exclude the height of #header
 * Do this on load & on resize
 */

function resizeFullHeight(){
	const headerHeight = document.getElementById('header')?.clientHeight || 200;
	
	document.querySelectorAll('.full-height.height-exclude-header').forEach((e) => {
		e.style.minHeight = `calc(100vh - ${headerHeight}px)`;
	});
}

window.addEventListener('load', resizeFullHeight);
window.addEventListener('resize', resizeFullHeight);

/**
 * Populate all dynamic content
 */

function contentPopulate(){
	document.querySelectorAll('[data-slides]').forEach((e) => {
		const key = e.getAttribute('data-slides');
		
		if(!slideData[key]){
			return;
		}
		
		e.innerHTML = '';
		
		// 100 is the slide limit we're imposing
		const slides = [];
		let length = 0;
		for(let i = 1; i < 100; i++){
			length = slides.length;
			
			for(let category in slideData[key]){
				if(i >= slideData[key][category]){
					continue;
				}
				
				let _i = "" + i;
				
				if(_i.length == 1){
					_i = '0' + _i;
				}
				
				const path = `images/portfolio/${category}/lg_${_i}.png`;
				
				slides.push(`<li class="glide__slide">
					<img src="${path}" alt="${category} image ${_i}">
					
					<p>
						<span class="tag">#${category}</span>
					</p>
				</li>`);
			}
			
			if(slides.length == length){
				break;
			}
		}
		
		e.innerHTML = slides.join('');
	});
}

window.addEventListener('DOMContentLoaded', contentPopulate);

/**
 * Activate all sliders
 */

function glideInit(){
	new Glide('.glide', {
		breakpoints: {
			992: {
				perView: 2,
			},
		},
		perView: 3,
		type: 'carousel',
	}).mount();
}

window.addEventListener('DOMContentLoaded', glideInit);