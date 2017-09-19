"use strict";

var el = document.querySelector('header'),
    bodyHeight = window.offsetHeight || document.documentElement.scrollHeight || document.body.scrollHeight,
    vH = document.documentElement.clientHeight || window.innerHeight,
    vW = document.documentElement.clientWidth || window.innerWidth,
    counter = document.querySelector(".facts").getBoundingClientRect(),
    burgerButton = document.querySelector(".burger .fa"),
    main = document.querySelector("main"),
    footer = document.querySelector("footer"),
    menuLink = document.querySelectorAll(".nav__link"),
    logoNav = document.querySelector(".logo__nav");

var flag = false;

// ############### adding background to nav at onscroll ######################

window.onscroll = function () {

	var bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
	    pageBottom = bodyScrollTop + vH;

	if (bodyScrollTop >= 200) {

		el.classList.remove("nav-transparent");
		el.classList.add("nav-colored");
	} else {

		el.classList.add("nav-transparent");
		el.classList.remove("nav-colored");
	}

	if (bodyScrollTop + vH > counter.top) {
		var go = 0;
		countingUp(go);
	}

	// ############### toggling between active sections ######################

	var anchors = document.querySelectorAll(".anchor");

	for (var i = anchors.length - 1; i >= 0; i--) {

		var anchor = anchors[i].className.split(" ")[0];
		var compare = document.querySelector("." + anchor),
		    compareId = document.querySelector("#" + anchor);

		if (pageBottom >= bodyHeight - 100) {

			var _active = document.querySelector(".nav__link--active");
			_active.classList.remove("nav__link--active");

			var getContactAnchor = document.querySelector("a[href='#footer']");
			getContactAnchor.classList.add("nav__link--active");
		} else if (bodyScrollTop >= compare.offsetTop - 300) {

			var _active2 = document.querySelector(".nav__link--active");
			_active2.classList.remove("nav__link--active");

			var createActive = document.querySelector("a[href='#" + anchor + "']");
			createActive.classList.add("nav__link--active");

			return;
		}

		active();
	}
};

// ############### init ######################

var navItems = document.querySelectorAll(".nav__item"),
    underline = document.querySelector(".underline"),
    anchItems = document.querySelectorAll(".nav__link");

function init() {

	for (var i = 0; i < navItems.length; i++) {

		navItems[i].addEventListener("mouseover", mouseOver);
		navItems[i].addEventListener("mouseout", mouseOut);
		navItems[i].addEventListener("click", mouseClick);
	}

	for (var _i = 0; _i < anchItems.length; _i++) {

		anchItems[_i].addEventListener("click", anchorClick);
	}

	var bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

	if (bodyScrollTop >= 200) {

		el.classList.remove("nav-transparent");
		el.classList.add("nav-colored");
	}
}

// ############### UNDERLINE ######################


function mouseOver() {

	var link = {

		left: this.offsetLeft,
		width: this.offsetWidth

	};

	underline.style.left = link.left + "px";
	underline.style.width = link.width + "px";
}

function mouseOut() {
	active();
}

function mouseClick() {

	var removeActive = document.querySelector(".nav__link--active");

	removeActive.classList.remove("nav__link--active");
	this.classList.add("nav__link--active");
}

function anchorClick() {

	scroll(this.getAttribute("href"));
}

function active() {

	var active = {

		left: document.querySelector(".nav__link--active").offsetLeft,
		width: document.querySelector(".nav__link--active").offsetWidth

	};

	underline.style.left = active.left + "px";
	underline.style.width = active.width + "px";
}

// ###################### SMOOTH SCROLL ########################

function getAnchor(aID) {

	var anchor = document.querySelector(aID),
	    aPos = anchor.offsetTop - 50;

	return aPos;
}

function scroll(aID) {

	var startY = self.pageYOffset,
	    stopY = getAnchor(aID),
	    distance = stopY > startY ? stopY - startY - 200 : startY - stopY + 200;

	if (distance < 100) {

		scrollTo(0, stopY);

		return;
	}

	var speed = 5,
	    step = Math.round(distance / 200),
	    leapY = stopY > startY ? startY + step : startY - step,
	    timer = 0;

	if (stopY > startY) {

		for (var i = startY; i < stopY; i += step) {

			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);

			leapY += step;if (leapY > stopY) leapY = stopY - 100;timer++;
		}

		return;
	}

	for (var _i2 = startY; _i2 > stopY; _i2 -= step) {

		setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);

		leapY -= step;if (leapY < stopY) leapY = stopY - 100;timer++;
	}
}

// ########################### SERVICE DROPDOWN ###############################

function dropdown() {
	var btn = document.querySelectorAll(".arrow--service"),
	    hand = document.querySelectorAll(".service_two--info .info__item");

	var _loop = function _loop(i) {

		hand[i].addEventListener("click", function () {

			var infoCaptionAll = document.querySelectorAll(".info__caption");

			for (var _i3 = 0; _i3 < infoCaptionAll.length; _i3++) {

				infoCaptionAll[_i3].classList.remove("info__caption-open");
				btn[_i3].classList.remove("arrow-rotate");
			}

			infoCaptionAll[i].classList.add("info__caption-open");
			btn[i].classList.add("arrow-rotate");
			return;
		});
	};

	for (var i = 0; i < hand.length; i++) {
		_loop(i);
	}
}
// ########################### Slider ###############################

function slider() {

	var slider = document.querySelectorAll("div[data-type='slider']");

	var _loop2 = function _loop2(i) {

		var slides = slider[i].querySelectorAll(".slide"),
		    goLeft = slider[i].querySelector(".arrow-right"),
		    goRight = slider[i].querySelector(".arrow-left");

		var click = 0;

		for (var _i4 = 0; _i4 < slides.length; _i4++) {
			var slide = slides[_i4];
			slide.style.left = _i4 * 100 + "%";
		}

		goLeft.addEventListener("click", function () {

			click++;

			if (click >= slides.length) {
				click = 0;

				for (var j = 0; j < slides.length; j++) {

					var leftVal = parseInt(slides[j].style.left, 10);
					slides[j].style.left = leftVal + 200 + "%";
				}
			} else {

				for (var _i5 = 0; _i5 < slides.length; _i5++) {

					var _leftVal = parseInt(slides[_i5].style.left, 10);
					slides[_i5].style.left = _leftVal - 100 + "%";
				}
			}
		});

		goRight.addEventListener("click", function () {

			if (click <= 0) {
				click = slides.length;

				for (var j = 0; j < slides.length; j++) {

					var leftVal = parseInt(slides[j].style.left, 10);
					slides[j].style.left = leftVal - 200 + "%";
				}
			} else {

				for (var _i6 = 0; _i6 < slides.length; _i6++) {

					var _leftVal2 = parseInt(slides[_i6].style.left, 10);
					slides[_i6].style.left = _leftVal2 + 100 + "%";
				}
			}

			click--;
		});
	};

	for (var i = 0; i < slider.length; i++) {
		_loop2(i);
	}
}

// ########################### counting up digits #########################

function countingUp(go) {

	if (flag === false && go == 0) {
		(function () {
			var a = 0,
			    b = 3,
			    c = 7;

			var facts = document.querySelectorAll(".facts__item"),
			    coffe = document.querySelector(".facts__item--cupofcoffe > p.number"),
			    DIGITS = Object.freeze({
				WEBDESIGN: '154',
				HAPPYCLIENT: '251',
				AWARDWINNER: '157',
				CUPOFCOFFE: 'infinite',
				MEMBERS: '56'
			});

			var _loop3 = function _loop3(i) {
				var fact = facts[i].querySelector("p.number");
				fact.innerHTML = 0;
				setInterval(function () {
					if (fact.innerHTML < parseInt(Object.values(DIGITS)[i])) {
						fact.innerHTML++;
					} else if (DIGITS.CUPOFCOFFE == "infinite") {

						a < 8 ? a++ : a = 0;
						b < 8 ? b++ : b = 0;
						c < 8 ? c++ : c = 0;

						coffe.innerHTML = a + "" + b + "" + c;
					};
				}, 10);
			};

			for (var i = 0; i < facts.length; i++) {
				_loop3(i);
			}
			flag = true;
			go++;
		})();
	}
}

// ########################### preloader #########################

function preloader() {
	var pre = document.querySelector(".preloader"),
	    logoAnimated = document.querySelector(".logo-animated"),
	    body = document.body;
	setTimeout(function () {
		pre.style.animationName = "preloaderBg";
		pre.style.animationDuration = "1.2s";
		pre.style.animationFillMode = "forwards";
		body.style.overflowY = "scroll";
		logoAnimated.style.display = "none";
	}, 500);
}

// ########################### burger menu #########################

function burgerMenu() {

	var headerNavbar = document.querySelector(".header__navbar");

	burgerButton.addEventListener("click", function () {
		headerNavbar.classList.toggle("showBurger");
		burgerButton.classList.toggle("fa-bars");
		burgerButton.classList.toggle("fa-times");
	});

	var elArr = [main, footer, logoNav];

	for (var i = 0; i < menuLink.length; i++) {
		elArr.push(menuLink[i]);
	}

	elArr.forEach(function (el) {
		return el.addEventListener("click", function () {
			headerNavbar.classList.remove("showBurger");
		});
	});
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
		burgerMenu();
	};
});