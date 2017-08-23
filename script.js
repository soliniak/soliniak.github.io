"use strict";

const 	el = document.querySelector('header'),
		bodyHeight = window.offsetHeight || document.documentElement.scrollHeight || document.body.scrollHeight,
		vH = document.documentElement.clientHeight || window.innerHeight,
		counter = document.querySelector(".facts").getBoundingClientRect();
		let start = false;

// ############### adding background to nav at onscroll ######################

window.onscroll = function () {

	let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
		pageBottom = bodyScrollTop + vH;

    if (bodyScrollTop >= 200 ) {

        el.classList.remove("nav-transparent");
        el.classList.add("nav-colored");

    } else {

        el.classList.add("nav-transparent");
        el.classList.remove("nav-colored");

    }

    if( bodyScrollTop + vH > counter.top) {
    	let go = 0;
    	countingUp(go);
    }

	// ############### toggling between active sections ######################

	let anchors = document.querySelectorAll(".anchor");

	for (let i = anchors.length - 1; i >= 0; i--){

  		let anchor = anchors[i].className.split(" ")[0],
	  		compare = document.querySelector("."+anchor),
	  		compareId = document.querySelector("#"+anchor);

  		if (pageBottom >= bodyHeight - 100) {

  			let active = document.querySelector(".nav__link--active");
  				active.classList.remove("nav__link--active");

  			const getContactAnchor = document.querySelector("a[href='#footer']");
  				  getContactAnchor.classList.add("nav__link--active");

  		} else if (bodyScrollTop >= compare.offsetTop - 300) {

  			let active = document.querySelector(".nav__link--active");
  				active.classList.remove("nav__link--active");

  			let createActive = document.querySelector("a[href='#"+ anchor + "']");
  				createActive.classList.add("nav__link--active");

  			return;

  		}

  		active();
	}
};

// ############### init ######################

const navItems	= document.querySelectorAll(".nav__item"),
	  underline = document.querySelector(".underline"),
	  anchItems = document.querySelectorAll(".nav__link");

function init () {

	for ( let i = 0; i < navItems.length; i++){

		navItems[i].addEventListener("mouseover", mouseOver);
		navItems[i].addEventListener("mouseout", mouseOut);
		navItems[i].addEventListener("click", mouseClick);

	}

	for (let i = 0; i < anchItems.length; i++){

		anchItems[i].addEventListener("click", anchorClick);

	}

	let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (bodyScrollTop >= 200 ) {

        el.classList.remove("nav-transparent");
        el.classList.add("nav-colored");

    } 
}

// ############### UNDERLINE ######################

function mouseOver () {

	let link = {

		left: this.offsetLeft,
		width: this.offsetWidth

	}

	underline.style.left = link.left + "px";
	underline.style.width = link.width + "px";

}

function mouseOut () {
	active();
}

function mouseClick () {

	let removeActive = document.querySelector(".nav__link--active");

	removeActive.classList.remove("nav__link--active");
	this.classList.add("nav__link--active");

}

function anchorClick () {

	scroll(this.getAttribute("href"));

}

function active () {

	let active = {

		left: document.querySelector(".nav__link--active").offsetLeft,
		width: document.querySelector(".nav__link--active").offsetWidth

	}

	underline.style.left =  active.left + "px";
	underline.style.width = active.width + "px";

}


// ###################### SMOOTH SCROLL ########################

function getAnchor (aID) {

	let anchor = document.querySelector(aID),
		aPos = anchor.offsetTop - 50;

	return aPos;

}

function scroll (aID) {

	let startY = self.pageYOffset,
   		stopY = getAnchor(aID),
    	distance = stopY > startY ? stopY - startY - 200 : startY - stopY + 200;

    if (distance < 100) {

        scrollTo(0, stopY);

        return;
    }

    let speed = 5,
	    step = Math.round(distance / 200),
	    leapY = stopY > startY ? startY + step : startY - step,
	    timer = 0;

    if (stopY > startY) {

        for ( let i=startY; i<stopY; i+=step ) {

            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);

            leapY += step; if (leapY > stopY) leapY = stopY -100; timer++;

        } 

    	return;

    }

    for ( let i=startY; i>stopY; i-=step ) {

        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);

        leapY -= step; if (leapY < stopY) leapY = stopY - 100; timer++;

    }

}	

// ########################### SERVICE DROPDOWN ###############################

function dropdown() {
	const 	btn  = document.querySelectorAll(".arrow--service"),
			hand = document.querySelectorAll(".service_two--info .info__item");

		for ( let i = 0; i < hand.length; i++ ) {

			hand[i].addEventListener("click", function () {

				let infoCaptionAll = document.querySelectorAll(".info__caption");

				for ( let i = 0; i < infoCaptionAll.length; i++){

					infoCaptionAll[i].classList.remove("info__caption-open");
					btn[i].classList.remove("arrow-rotate");

				}

				infoCaptionAll[i].classList.add("info__caption-open");
				btn[i].classList.add("arrow-rotate");
				return;

			});

	}
}
// ########################### Slider ###############################

function slider () {

	const 	slider = document.querySelectorAll("div[data-type='slider']");

	for (let i = 0; i < slider.length; i++) {

		const 	slides 	= slider[i].querySelectorAll(".slide"),
				goLeft 	= slider[i].querySelector(".arrow-right"),
				goRight = slider[i].querySelector(".arrow-left");
		
		let click = 0;

		for (let i = 0; i < slides.length; i++) {
			let slide = slides[i];
				slide.style.left = i * 100 + "%";
		}

		goLeft.addEventListener("click", function () {

			if (click >= slides.length - 1) {

					return;

				} else {

					for (let i = 0; i < slides.length; i++) {

						let leftVal = parseInt(slides[i].style.left, 10);
						slides[i].style.left = leftVal - 100 + "%";

					}	
				}

			click++;
		});

		goRight.addEventListener("click", function () {

			if (click <= 0) {
				click = 0;
				return;

			} else {

				for (let i = 0; i < slides.length; i++) {

					let leftVal = parseInt(slides[i].style.left, 10);
					slides[i].style.left = leftVal + 100 + "%";

				}	
			}

			click--;
		});
	}
}

// ########################### counting up digits #########################

function countingUp(go) {

	if ( start === false && go == 0) {
		let a = 0,
			b = 3,
			c = 7;

		const 	facts = document.querySelectorAll(".facts__item"),
				coffe = document.querySelector(".facts__item--cupofcoffe > p.number"),
				DIGITS = Object.freeze({
					WEBDESIGN: '154',
					HAPPYCLIENT: '251',
					AWARDWINNER: '157',
					CUPOFCOFFE: 'infinite',
					MEMBERS: '56'
				});

		for ( let i = 0; i < facts.length; i++ ){
			let fact = facts[i].querySelector("p.number");
			fact.innerHTML = 0;	
			setInterval( function () { 
					if (fact.innerHTML < parseInt(Object.values(DIGITS)[i])) 
					{
						fact.innerHTML++;
					} else if ( DIGITS.CUPOFCOFFE == "infinite") {

							a < 8 ? a++ : a = 0;
							b < 8 ? b++ : b = 0;
							c < 8 ? c++ : c = 0;
							
							coffe.innerHTML = a + "" + b + "" + c;				
					};
			}, 10);
		}
		start = true;
		go++;
	}
}

function preloader () {
	const 	pre = document.querySelector(".preloader"),
			logoAnimated = document.querySelector(".logo-animated"),
			body = document.body;
	setTimeout( function () {
		pre.style.animationName = "preloaderBg";
		pre.style.animationDuration = "1.2s";
		pre.style.animationFillMode = "forwards";
		body.style.overflowY = "scroll"
		logoAnimated.style.display = "none";
	}, 500);		
	
}
				
// ############### Start => DOMContentLoaded - make sure to load JS after DOM. onload - make sure to load JS after CSS ######################

document.addEventListener("DOMContentLoaded", function () {

	window.onload = function () {

	  init();
	  active();
	  slider();
	  dropdown();
	  countingUp();
	  preloader();
  	}

});