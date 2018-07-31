const ocMenu = document.querySelector(".ocMenu"),
		menu = document.querySelector(".burger_menu")
		body = document.querySelector("body");

function showMenu() {
  ocMenu.innerHTML = 'Zamknij menu';
  ocMenu.setAttribute('aria-expanded', 'true');
  menu.classList.add("menu-opened");
}
 
function hideMenu() {
  ocMenu.setAttribute('aria-expanded', 'false');
  ocMenu.innerHTML = 'Otwórz menu';
  menu.classList.remove("menu-opened");
}
 
ocMenu.addEventListener('click', function() {
  if (menu.classList.contains('menu-opened')) {
    hideMenu();
  } else {
    showMenu()
  }
}, hideMenu());