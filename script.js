// var body = document.getElementById("body"),
// 	bodyRect = body.getBoundingClientRect(),
// 	element = document.getElementById("header"),
//     elemRect = element.getBoundingClientRect(),
//     offset   = elemRect.top - bodyRect.top;

// console.log('Element is ' + offset + ' vertical pixels from <body>');

const el = document.querySelector('header');


window.onscroll = function () { 
	let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (bodyScrollTop >= 200 ) {
        el.classList.remove("nav-transparent");
        el.classList.add("nav-colored");
    } 
    else {
        el.classList.add("nav-transparent");
        el.classList.remove("nav-colored");
    }


};


// ############### UNDERLINE ######################

const navItems	= document.querySelectorAll(".nav__item"),
	  underline = document.querySelector(".underline"),
	  parentPos = document.querySelector("#header").getBoundingClientRect(),
	  nav 		= document.querySelector(".nav").getBoundingClientRect(),
	  anchItems = document.querySelectorAll(".nav__link"),
	  navPos 	= parentPos.left + nav.left;

console.log("nav: " + nav.left);

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

mouseOver = function () {
	let link = this.getBoundingClientRect();
	underline.style.left = link.left - nav.left + "px";
	underline.style.marginLeft = "1rem";
	underline.style.width = link.right - link.left + "px";
	console.log(underline.style.left);
}

mouseOut = function () {
	active();
}

mouseClick = function () {
	let removeActive = document.querySelector(".nav__link--active");
	removeActive.classList.remove("nav__link--active");
	this.classList.add("nav__link--active");
	// scroll(this.getAttribute("id"));
}

anchorClick = function () {
	scroll(this.getAttribute("href"));
}

active = function () {
	let active = document.querySelector(".nav__link--active").getBoundingClientRect();
	underline.style.left =  active.left - nav.left + "px";
	underline.style.width = active.right - active.left + "px";
	console.log(underline.style.left);
}



// ###################### SCROLL ########################

getAnchor = function (aID) {
	let anchor = document.querySelector(aID);
	let aPos = anchor.offsetTop;
	return aPos;
}

scroll = function (aID) {

	let startY = self.pageYOffset;
    let stopY = getAnchor(aID);
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    let speed = 5;

    let step = Math.round(distance / 200);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
        for ( let i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY -100; timer++;
        } return;
    }
    for ( let i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY - 100; timer++;
    }
}	

// ########################### SERVICE DROPDOWN ###############################

let btn = document.querySelectorAll(".arrow--service");

	for ( let i = 0; i < btn.length; i++){
		btn[i].addEventListener("click", function () {
			let infoCaptionAll = document.querySelectorAll(".info__caption");
			for ( let i = 0; i < infoCaptionAll.length; i++){
				infoCaptionAll[i].classList.remove("info__caption-open");
			}
			infoCaptionAll[i].classList.add("info__caption-open");
			return;
		});

}
document.addEventListener("DOMContentLoaded", function () {
  init();
  active();
});