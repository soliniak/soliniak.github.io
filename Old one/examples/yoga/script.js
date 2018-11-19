'use strict';

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

// Use our detect's results. passive applied if supported, capture will be false either way.
// elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false); 

// ---------------------------------------- TOP BAR FIXED START -------------------------------------------------- //

const menu = document.querySelector(".top_bar");

window.addEventListener("scroll", ()=>{
	if(window.scrollY > 50){
		menu.classList.add("top_bar-fixed");
	} else {
		menu.classList.remove("top_bar-fixed");
	}
});


// ---------------------------------------- MODAL START -------------------------------------------------- //

const modal = document.querySelector(".modal");
const regBtns = document.querySelectorAll(".free_reg_button"),
	closeModal = document.querySelector(".close_modal"),
	modalContainer = document.querySelector(".modal-container"),
	body = document.querySelector("body");


function openCloseToggle() {
	modal.classList.toggle("show");
	modal.classList.remove("hide-modal");
	body.classList.toggle("ovhide");
	modal.setAttribute("aria-hidden", "true")
}

closeModal.addEventListener("click", ()=>{
	openCloseToggle();
});

modal.addEventListener("click", (e)=>{
if (!modalContainer.contains(e.target)) {
	openCloseToggle();
  }
});

regBtns.forEach((el, index)=>{
	el.addEventListener("click", ()=>{
		openCloseToggle();
		modal.querySelector("input[name=login]").focus();
	})
});

// ---------------------------------------- SECTION 04 - CAROUSEL START -------------------------------------------------- //

const 	btnL 	= document.querySelector(".carousel_navigation-left"),
		btnR 	= document.querySelector(".carousel_navigation-right"),
		allEls 	= document.querySelectorAll(".carousel_element"),
		qCont	= document.querySelectorAll(".q-container");

let index = 0;

btnR.addEventListener("click", ()=>{
	index--;
	index = (index < 0 ? (allEls.length-1) : index);
	spin(index);
});

btnL.addEventListener("click", ()=>{
	index++;
	index = (index > (allEls.length-1) ? 0 : index);
	spin(index);
});

function spin(to){

	// Testimonials text visiblity
		qCont.forEach((q)=>{
			q.classList.remove("visible");
			q.classList.add("hidden");
			q.setAttribute("aria-hidden", "true");
		});

		qCont[to].classList.add("visible");
		qCont[to].classList.remove("hidden");
		qCont[to].setAttribute("aria-hidden", "false");

	// Testimonials images visiblity
		allEls.forEach((a)=>{
			a.classList.remove("active", "el_left", "el_right", "el_center");
			a.classList.add("not-active");
			a.setAttribute("aria-hidden", "true");			
		});

		let left = (to <= 0 ? 2 : (to-1));
		let right = (to >= 2 ? 0 : (to+1));

		allEls[left].classList.add("el_left");
		allEls[right].classList.add("el_right");

		allEls[to].classList.remove("not-active");
		allEls[to].classList.add("active", "el_center");
		allEls[to].setAttribute("aria-hidden", "false");
};

// ----------------------------- AUTO HIDE MENU BAR --------------------------------

const html = document.querySelector('html');

html.addEventListener('wheel', findScrollDirectionOtherBrowsers, supportsPassive ? { passive: true } : false);
let delta;

function findScrollDirectionOtherBrowsers(event){
    if (event.wheelDelta){
        delta = event.wheelDelta;
    }else{
        delta = -1 * event.deltaY;
    }

    if (delta < 0){
        menu.style.marginTop = -100+"px";
    }else if (delta > 0){
        menu.style.marginTop = 0;
    }
}

// ------------------------------------- BTN TOGGLE MENU -----------------------------

const toggleBtn = document.querySelector(".toggle-btn"),
		menuItem = document.querySelectorAll(".menu_item"),
		headerMenu = document.querySelector(".header_menu"),
		menuLi = document.querySelector(".menu");

toggleBtn.addEventListener("click", ()=>{
	if(toggleBtn.innerHTML !== "<i class=\"fas fa-times\"></i>"){
		open();
	} else {
		close();
	}
});

if(window.innerWidth < 760){
	menuItem.forEach((item)=>{
		item.addEventListener("click", ()=>{
			close();
		});
	});
};

function close(){

	menuItem.forEach((item, i)=>{
		item.style.left = -4000+"px";
		item.style.transitionDelay = "0s";
	});
	toggleBtn.innerHTML = "<i class=\"fas fa-bars\"></i>";
	toggleBtn.setAttribute('aria-expanded', 'false');
	menu.style.height = 55+"px";
	menuLi.style.height = 0;
};

function open(){
	menu.style.height = 100+"%";
	menuLi.style.height = "auto";
	menuItem.forEach((item, i)=>{
		item.style.left = 0+"px";
		item.style.transitionDelay = "0."+i+"s";
	});
	toggleBtn.innerHTML = "<i class=\"fas fa-times\"></i>";
	toggleBtn.setAttribute('aria-expanded', 'true');
};