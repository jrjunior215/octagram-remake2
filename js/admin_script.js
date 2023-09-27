function MenuController() {
    let menu = document.getElementById('menu_drop');
    menu.classList.toggle("open_menu");
}

document.body.addEventListener("click", function (event) {
    let menu = document.getElementById('menu_drop');
    let containerIcons = document.querySelector('.container_icons');

    if (!containerIcons.contains(event.target)) {
        menu.classList.remove("open_menu");
    }
});