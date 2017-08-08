const 	el = document.querySelector('header'),
		bodyHeight = window.offsetHeight || document.documentElement.scrollHeight || document.body.scrollHeight,
		vH = document.documentElement.clientHeight || window.innerHeight;

// ############### adding background to nav at onscroll ######################

window.onscroll = function () {

	let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
		pageBottom = bodyScrollTop + vH;

    if (bodyScrollTop >= 200 ) {

        el.classList.remove("nav-transparent");
        el.classList.add("nav-colored");

    } 
    else {

        el.classList.add("nav-transparent");
        el.classList.remove("nav-colored");

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

init = function () {

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

mouseOver = function () {

	let link = {

		left: this.offsetLeft,
		width: this.offsetWidth

	}

	underline.style.left = link.left + "px";
	underline.style.width = link.width + "px";

}

mouseOut = function () {
	active();
}

mouseClick = function () {

	let removeActive = document.querySelector(".nav__link--active");

	removeActive.classList.remove("nav__link--active");
	this.classList.add("nav__link--active");

}

anchorClick = function () {

	scroll(this.getAttribute("href"));

}

active = function () {

	let active = {

		left: document.querySelector(".nav__link--active").offsetLeft,
		width: document.querySelector(".nav__link--active").offsetWidth

	}

	underline.style.left =  active.left + "px";
	underline.style.width = active.width + "px";

}


// ###################### SMOOTH SCROLL ########################

getAnchor = function (aID) {

	let anchor = document.querySelector(aID),
		aPos = anchor.offsetTop - 50;

	return aPos;

}

scroll = function (aID) {

	let startY = self.pageYOffset,
   		stopY = getAnchor(aID),
    	distance = stopY > startY ? stopY - startY : startY - stopY;

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

let btn = document.querySelectorAll(".arrow--service"),
	btnArrow = document.querySelectorAll(".arrow--service");

	for ( let i = 0; i < btn.length; i++ ) {

		btn[i].addEventListener("click", function () {

			let infoCaptionAll = document.querySelectorAll(".info__caption");

			for ( let i = 0; i < infoCaptionAll.length; i++){

				infoCaptionAll[i].classList.remove("info__caption-open");
				btnArrow[i].classList.remove("arrow-rotate");

			}

			infoCaptionAll[i].classList.add("info__caption-open");
			btnArrow[i].classList.add("arrow-rotate");
			return;

		});

}

// ############### Start => DOMContentLoaded - make sure to load JS after DOM. onload - make sure to load JS after CSS ######################

document.addEventListener("DOMContentLoaded", function () {

	window.onload = function () {

	  init();
	  active();

  	}

});