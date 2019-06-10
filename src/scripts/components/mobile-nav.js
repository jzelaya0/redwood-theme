import Drawer from '@/scripts/components/drawers';

/**
 * Mobile Nav Script
 * ------------------------------------------------------------------------------
 *
 * @namespace mobileNav
 */

// Selectors
const selectors = {
  mobileNavId: 'MobileNav',
  mobileNavToggle: '[data-mobile-nav-toggle]',
};

const cssClasses = {
  activeBtn: 'is-active',
  openMenu: 'is-open',
};

// Init mobile nav drawer
new Drawer('MobileNavDrawer', {position: 'left'});

// Cached Selectors
const mobileNav = document.getElementById(selectors.mobileNavId);
const mobileNavToggle = mobileNav.querySelectorAll(selectors.mobileNavToggle);

// Bind event handlers
mobileNavToggle.forEach((button) => {
  button.addEventListener('click', toggleSubMenu);
});

function toggleSubMenu(evt) {
  const button = evt.currentTarget;
  const subMenu = button.nextElementSibling;

  button.classList.toggle(cssClasses.activeBtn);
  subMenu.classList.toggle(cssClasses.openMenu);
}
