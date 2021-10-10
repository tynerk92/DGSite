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
    });
    updateServicesSectionMargin();
    updateProcessSectionMargin();
});

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function updateServicesSectionMargin() {
    const containerStyle = window.getComputedStyle(document.querySelector('.dg-container'));
    const containerPadding = parseFloat(containerStyle.paddingLeft);
    const containerWidth = parseFloat(containerStyle.width) - containerPadding * 2;

    const textContainer = document.querySelector('.dg-services .dg-wrapper');
    textContainer.style.maxWidth = `${containerWidth}px`;
}

function updateProcessSectionMargin() {
    const containerStyle = window.getComputedStyle(document.querySelector('.dg-container'));
    const containerPadding = parseFloat(containerStyle.paddingLeft);
    const containerMargin = parseFloat(containerStyle.marginLeft);
    const containerWidth = parseFloat(containerStyle.width) - containerPadding * 2;

    const processSection = document.querySelector('.dg-process');
    const darkSection = processSection.querySelector('.dg-section-dark');
    
    // at 1440px, will be -80. at 426px, will be 0
    const offsetFromContainer = clamp(-80, 0 - 33.6094674556213 * ((window.innerWidth - 426) / 426), 0);
    darkSection.style.width = `${containerPadding + containerMargin + containerWidth + offsetFromContainer}px`;

    // Keep text anchored to the left side of the container
    const textContainer = processSection.querySelector('.dg-wrapper');
    textContainer.style.marginLeft = `${containerPadding + containerMargin}px`;

    processSection.style.height = `${darkSection.offsetHeight}px`;
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