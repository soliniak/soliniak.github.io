const btnAbout = document.querySelector(".btn--about"),
  btnPortfolio = document.querySelector(".btn--portfolio"),
  btnContact2 = document.querySelector(".btn--contact"),
  btnGoContact = document.querySelector(".btn--goto-contact");
let mouseDownPosition = null,
  trackPosition = 0;

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
  mouseDownPosition = unify(e).clientX;
}

function move(e) {
  if (mouseDownPosition || mouseDownPosition === 0) {
    let calculatedDirection = unify(e).clientX - mouseDownPosition,
      leftOrRight = Math.sign(calculatedDirection);
    let threshold = +(
      (leftOrRight * calculatedDirection) /
      body.offsetWidth
    ).toFixed(2);

    if (threshold > 0.15) {
      trackPosition += leftOrRight;
    }

    btnAbout.addEventListener("click", () => {
      trackPosition = 1;
    });
    btnPortfolio.addEventListener("click", () => {
      trackPosition = 0;
    });
    btnContact2.addEventListener("click", () => {
      trackPosition = -1;
    });
    // btnGoContact.addEventListener("click", () => {
    //   trackPosition = -1;
    // });

    if (trackPosition > 1) trackPosition = 1;
    if (trackPosition < -1) trackPosition = -1;

    moveSection(trackPosition, threshold);
    mouseDownPosition = null;
  }
}

function moveSection(direction) {
  highlightActiveLink(direction);
  direction = direction * 100;
  if (direction <= 100 && direction >= -100) {
    about.style.left = -100 + direction + "vw";
    portfolio.style.left = 0 + direction + "vw";
    contact.style.left = 100 + direction + "vw";
  }
}

function highlightActiveLink(link) {
  btnAbout.classList.remove("link--active");
  btnPortfolio.classList.remove("link--active");
  btnContact2.classList.remove("link--active");

  if (link == 1) {
    btnAbout.classList.add("link--active");
    const thisSection = about.offsetHeight;

    html.style.height = thisSection + 50 + "px";
    body.style.height = thisSection + 50 + "px";
  }
  if (link == 0) {
    btnPortfolio.classList.add("link--active");
    const thisSection = portfolio.offsetHeight;

    html.style.height = thisSection + 50 + "px";
    body.style.height = thisSection + 50 + "px";
  }
  if (link == -1) {
    btnContact2.classList.add("link--active");
    const thisSection = contact.offsetHeight;

    html.style.height = thisSection + 50 + "px";
    body.style.height = thisSection + 50 + "px";
  }
}
body.addEventListener("mousedown", lock, false);
body.addEventListener("touchstart", lock, false);

body.addEventListener("mouseup", move, false);
body.addEventListener("touchend", move, false);
