"use strict";

import Projects from "/js/projects.js";

// get data from projects and put it in article mockup
Object.entries(Projects).forEach(([project, projectValue]) => {
  let stackData = "";
  if (typeof projectValue.stack != "undefined") {
    Object.entries(projectValue.stack).forEach(([stack, stackValue]) => {
      if (stackValue[0] == "true") {
        stackData += stackValue[1];
        return stackData;
      }
    });
  }

  let articleMockup = `
  <div class="card__description">
    <div class="card__header">
        <h2 class="card__title">${projectValue.name}</h2>
        <span>
          <a href="${
            projectValue.live
          }" class="btn--square btn--live"> live </a>
          <a href="${projectValue.src}" class="btn--square"> src </a>
        </span>
    </div>
    <p class="card__text">
      ${projectValue.alt}
    </p>
    <div class="card__stack">
    
      ${stackData}
    </div>
  </div>
  <picture class="image__container portfolio-image__container">
    <source type="image/webp" srcset="${
      projectValue.webp
    }" class="card__image portfolio-image" />
    <img src="${projectValue.img}" alt="${
    projectValue.alt
  }" class="card__image portfolio-image" />
  </picture>`;

  let article = document.createElement("article");
  article.classList.add("card", "portfolio__card");
  article.style.order = projectValue.order;
  article.innerHTML = articleMockup;
  portfolio.appendChild(article);
});

const cards = document.querySelectorAll(".card");

[].forEach.call(cards, card => {
  card.addEventListener("mousedown", () => {
    card.style.backgroundColor = "#fbfbfb";
  });
  card.addEventListener("mouseup", () => {
    card.style.backgroundColor = "#fff";
  });
});

// --- active section
const btnContact = document.querySelector(".btn--contact"),
  menuLink = document.querySelectorAll(".menu__link"),
  linkMobile = document.querySelectorAll("[data-mobile=false]"),
  btnGotoContact = document.querySelector(".btn--goto-contact"),
  aboutSection = -100,
  portfolioSection = 0,
  contactSection = 100;

btnGotoContact.addEventListener("click", () => {
  showActiveSectionHideRest(contactSection);
  adjustWindowHeightTo(contact);
  btnContact.classList.add("link--active");
  window.innerHeight = "400px";
});
// navigate thgrough sections and set aria-hidden
menu.addEventListener("click", function(e) {
  if (e.target) {
    let offset;
    const sectionTarget = e.target.getAttribute("href");
    const section = document.querySelector(sectionTarget);

    if (sectionTarget == "#about") offset = -100;
    if (sectionTarget == "#portfolio") offset = 0;
    if (sectionTarget == "#contact") offset = 100;

    if (
      sectionTarget == "#about" ||
      sectionTarget == "#portfolio" ||
      sectionTarget == "#contact"
    ) {
      e.preventDefault();

      adjustWindowHeightTo(section);
      // scrollbarVisible(section);
    }
    showActiveSectionHideRest(offset);
    section.setAttribute("aria-hidden", "false");

    e.target.classList.add("link--active");
  }
});

const adjustWindowHeightTo = section => {
  const thisSection = section.offsetHeight;
  html.style.height = thisSection + 50 + "px";
  body.style.height = thisSection + 50 + "px";
  // scrollbarVisible(portfolio);
};

const setAriaHiddenToButtons = () => {
  if (body.offsetWidth > 1024) {
    [].forEach.call(linkMobile, item => {
      item.setAttribute("aria-hidden", "false");
    });
  } else {
    [].forEach.call(linkMobile, item => {
      item.setAttribute("aria-hidden", "true");
    });
  }
};

function windowHeightAndAriaHidden() {
  setAriaHiddenToButtons();
  adjustWindowHeightTo(portfolio);
}

window.addEventListener("load", windowHeightAndAriaHidden());
window.addEventListener("resize", windowHeightAndAriaHidden());

let showActiveSectionHideRest = offset => {
  about.style.left = aboutSection - offset + "vw";
  about.setAttribute("aria-hidden", "true");

  portfolio.style.left = portfolioSection - offset + "vw";
  portfolio.setAttribute("aria-hidden", "true");

  contact.style.left = contactSection - offset + "vw";
  contact.setAttribute("aria-hidden", "true");

  [].forEach.call(menuLink, link => {
    link.classList.remove("link--active");
  });
};

// check if scrollbar is visible
let scrollbarVisible = section => {
  if (
    document.documentElement.clientHeight < html.offsetHeight &&
    body.offsetWidth > 768
  ) {
    section.style.paddingRight = "3rem";
  }
};
