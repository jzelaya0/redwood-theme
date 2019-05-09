import {trapFocus, removeTrapFocus} from '@shopify/theme-a11y';

/**
 * Drawer Module
 * @class
 *
 * @example
 * const myDrawer = new Drawer('ElemId', 'left', {
 *  onDrawerOpen: () => {
 *    alert('Drawer Opened!');
 *  }
 * });
 */

const cssClases = {
  drawerOpen: 'drawer--open',
  drawerOpenOverlay: 'js-drawer-open'
};

class Drawer {

  /**
   * @param {string} id - Id of DOM node to create a drawer
   * @param {object} options - Custom options
   * @param {string} options.position - Accepts "top", "right", "bottom", "left"
   * @param {string} options.openBtn - Selector that opens the drawer
   * @param {string} options.closeBtn - Selector for closing the drawer
   * @param {string} options.onDrawerOpen - Callback to run after drawer opens
   * @param {string} options.onDrawerClose - Callback to run after drawer closes
  */
  constructor(id, options) {
    const drawer = document.getElementById(id);

    // Stop if no element exists
    if (!drawer) {
      return;
    }

    // Defaults
    let defaults = {
      position: 'left',
      get openBtn() {
        return '.js-drawer-open-' + this.position;
      },
      closeBtn: '.js-drawer-close',
      onDrawerOpen: null,
      onDrawerClose: null,
      ...options
    };

    // Settings
    this.options = defaults;
    // this.position = position;
    this.state = {
      drawerIsOpen: false
    };

    // Selectors
    this.selectors = {
      body: document.querySelector('body'),
      pageContainer: document.getElementById('PageContainer'),
      drawer: drawer,
      openBtn: document.querySelectorAll(this.options.openBtn),
      closeBtn: drawer.querySelector(this.options.closeBtn)
    };

    this.initDrawer();
    this.initCustomEvents();
  }

  /** Bind events on drawer DOM nodes to open/close drawer */
  initDrawer() {
    for (let i = 0; i < this.selectors.openBtn.length; i++) {
      this.selectors.openBtn[i].addEventListener('click', this.openDrawer.bind(this));
    }

    this.selectors.closeBtn.addEventListener('click', this.closeDrawer.bind(this));
  }

  /** Opens the drawer */
  openDrawer(evt) {
    let externalCall = false;

    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      this.selectors.activeSource = evt.currentTarget
    }

    if (this.state.drawerIsOpen && !externalCall) {
      return this.closeDrawer();
    }

    // Open drawer
    this.selectors.body.classList.add(cssClases.drawerOpenOverlay);
    this.selectors.drawer.classList.add(cssClases.drawerOpen);
    this.state.drawerIsOpen = true;

    // Dispatch drawer open event
    if (this.drawerOpenedEvt) {
      document.dispatchEvent(this.drawerOpenedEvt);
    }

    // Bind page event handlers after drawer is open
    this.addPageEvents();

    trapFocus(this.selectors.drawer);
  }

  /** Closes the drawer */
  closeDrawer() {
    // Do not run if drawer is not open
    if (!this.state.drawerIsOpen) {
      return;
    }

    // Close drawer
    this.selectors.body.classList.remove(cssClases.drawerOpenOverlay);
    this.selectors.drawer.classList.remove(cssClases.drawerOpen);
    this.state.drawerIsOpen = false;

    // Dispatch drawer open event
    if (this.drawerClosedEvt) {
      document.dispatchEvent(this.drawerClosedEvt);
    }

    // Unbind page event handlers
    this.removePageEvents();

    removeTrapFocus(this.selectors.drawer)
  }

  /*============================================================================
    Page Event Handling
  ==============================================================================*/
  initCustomEvents() {
    if (typeof this.options.onDrawerOpen === 'function') {
      this.drawerOpenedEvt = new CustomEvent('drawerOpened', {
        detail: {
          position: this.position,
          drawerId: this.selectors.drawer.id
        }
      });
      document.addEventListener('drawerOpened', this.options.onDrawerOpen);
    }

    if (typeof this.options.onDrawerClose === 'function') {
      this.drawerClosedEvt = new CustomEvent('drawerClosed', {
        detail: {
          position: this.position,
          drawerId: this.selectors.drawer
        }
      });
      document.addEventListener('drawerClosed', this.options.onDrawerClose);
    }
  }

  /** Attaches event listeners to body element */
  addPageEvents() {
    this.selectors.body.addEventListener('keyup', this);
    this.selectors.pageContainer.addEventListener('click', this);
    this.selectors.body.addEventListener('touchmove', this, {passive: false});
  }

  /** Detaches event listeners from body element */
  removePageEvents() {
    this.selectors.body.removeEventListener('keyup', this);
    this.selectors.pageContainer.removeEventListener('click', this);
    this.selectors.body.removeEventListener('touchmove', this);
  }

  /** Looks for the correct event type. For removal of event handlers bound with 'this' */
  handleEvent(evt) {
    switch (evt.type) {
      case 'keyup':
        this.onPageKeyUp(evt);
        break;
      case 'click':
        this.onPageClick(evt);
        break;
      case 'touchmove':
        this.onTouchMove(evt);
        break;
    }
  }

  onPageKeyUp(evt) {
    if (evt.keyCode === 27) {
      this.closeDrawer();
      return false;
    } else {
      return true;
    }
  }

  onPageClick(evt) {
    this.closeDrawer();
    return false;
  }

  onTouchMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}

export default Drawer;
