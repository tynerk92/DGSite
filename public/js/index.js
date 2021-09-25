/**
 * Main entry point for the script
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('dg-menu');

    menuButton.addEventListener('click', (e) => {
        toggleMenu();
    });

    window.addEventListener('resize', () => {
        updateServicesSectionMargin();
        updateProcessSectionMargin();

        // TODO do this for the other dark section too
    });
    updateServicesSectionMargin();
    updateProcessSectionMargin();
});

function updateServicesSectionMargin() {
    const containerStyle = window.getComputedStyle(document.querySelector('.dg-container'));
    const containerPadding = parseFloat(containerStyle.paddingLeft);
    const containerMargin = parseFloat(containerStyle.marginLeft);
    const initialMargin = 40;

    const servicesSection = document.querySelector('.dg-services');
    if (containerPadding >= initialMargin + 36.2) {
        // 36.2 is the distance to the left of the container it should be
        servicesSection.style.marginLeft = `${containerPadding + containerMargin - 36.2}px`;
    } else {
        servicesSection.style.marginLeft = `${initialMargin}px`;
    }
}

function updateProcessSectionMargin() {
    const containerStyle = window.getComputedStyle(document.querySelector('.dg-container'));
    const containerPadding = parseFloat(containerStyle.paddingLeft);
    const containerMargin = parseFloat(containerStyle.marginLeft);
    const initialMargin = 40;

    const servicesSection = document.querySelector('.dg-process');
    if (containerPadding >= initialMargin + 36.2) {
        // 36.2 is the distance to the left of the container it should be
        servicesSection.style.marginRight = `${containerPadding + containerMargin + 36.2}px`;
    } else {
        servicesSection.style.marginRight = `${initialMargin}px`;
    }
}

/**
 * Animate the menu.
 * 
 * In the off-chance that a user adjusts the height of the browser from the bottom,
 * it can show artifacts from the menu.
 * 
 * To avoid that, we keep the menu twice as high as it should be.
 * When it is toggled, we turn off animations, make the menu exactly as high as it should be,
 * turn transitions back on, and then change the top variable so that it animates properly.
 * 
 * The same process is done in reverse, but with a timeout to account for the animation time.
 */
function toggleMenu() {
    const menuOverlay = document.getElementById('dg-menu-overlay');
    const menuText = document.getElementById('dg-menu-button-text');

    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
        
    if (toggleClass(document.body, 'menu-open')) {
        // Account for the scrollbar disappearing due to overflow-y: hidden when the menu is open
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        menuText.innerHTML = 'Close';

        menuOverlay.style.top = "0px";
    } else {
        document.body.style.paddingRight = 0;
        menuText.innerHTML = 'Menu';

        menuOverlay.style.top = "100vh";
        setTimeout(() => { // After the animation is done, have the menu hack its way back to above the screen without animating
            setTimeout(() => {
                menuOverlay.style.display = 'none';
            }, 10);

            setTimeout(() => {
                menuOverlay.style.top = "-200vh";
                menuOverlay.style.display = 'block';
            }, 50);
        }, 500);
    }
}

/**
 * Toggles a given class on a given element.
 * 
 * @param {string} element - the element that the class should be toggled on
 * @param {string} classString - the string of the class which should be toggled
 * @returns void
 */
function toggleClass(element, classString) {
    if (element.classList.contains(classString)) {
        element.classList.remove(classString);
        return false;
    } else {
        element.classList.add(classString);
        return true;
    }
}