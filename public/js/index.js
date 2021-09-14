document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('dg-menu');

    menuButton.addEventListener('click', (e) => {
        toggleClass(document.body, 'menu-open');
    });
});

function toggleClass(element, classString) {
    if (element.classList.contains(classString)) {
        element.classList.remove(classString);
    } else {
        element.classList.add(classString);
    }
}