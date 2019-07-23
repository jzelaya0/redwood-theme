/* eslint promise/catch-or-return: 0 */
import * as cart from '@shopify/theme-cart';
import {formatMoney} from '@shopify/theme-currency';
import {
  serializeArray,
  formatAddItemData,
  validateQuantity,
} from '@/scripts/tools/utils';
import CartTemplate from '@/scripts/handlebars/templates/cart-drawer-template.hbs';
import Drawer from '@/scripts/components/drawers';
import iconPlus from '@/assets/static/icon-plus.svg';
import iconMinus from '@/assets/static/icon-minus.svg';

/**
 * AjaxCart Drawer Module
 * @class
 */

const cssClases = {
  isAdding: 'is-adding',
  isLoading: 'is-loading',
  isRemoved: 'is-removed',
};

const selectors = {
  ajaxRow: '.ajaxcart__row',
  ajaxCartQtyAdjust: '.ajaxcart__qty-adjust',
  ajaxCartQtyNumAdjust: '.ajaxcart__qty-num',
};

/**
 * @param {object} options - Options to override defaults
 * @param {string} options.formSelector - Form DOM selector for ajax-cart usage
 * @param {string} options.cartContainer - DOM selector for injecting cart template
 * @param {string} options.addToCartSelector - Submit button DOM selector
 * @param {string} options.cartCountSelector - DOM selector for updating cart-item count
 *
 */
class AjaxCart {
  constructor(options) {
    const defaults = {
      formSelector: 'form[action^="/cart/add"]',
      cartContainer: '#CartContainer',
      addToCartSelector: '[data-submit-button]',
      cartCountSelector: '[data-cart-count]',
    };

    this.options = {
      ...defaults,
      ...options,
    };

    this.state = {
      cartIsUpdating: false,
    };

    // DOM Selectors
    this.elements = {
      body: document.querySelector('body'),
      formContainer: document.querySelectorAll(this.options.formSelector),
      cartContainer: document.querySelector(this.options.cartContainer),
      cartCountSelector: document.querySelectorAll(
        this.options.cartCountSelector,
      ),
    };
  }

  init() {
    // Create a new cart drawer
    this.cartDrawer = new Drawer('CartDrawer', {
      position: 'right',
      onDrawerOpen: this.loadCart.bind(this),
    });

    this.bindEvents();
    this.initCustomEvents();
  }

  bindEvents() {
    // Attach addEventListener to open cart drawer
    this.elements.body.addEventListener('afterCartLoad', () => {
      this.cartDrawer.openDrawer();
    });

    // Override form submit
    this.elements.formContainer.forEach((form) => {
      form.addEventListener('submit', this.onFormSubmit.bind(this));
    });

    // Quantity adjust buttons
    this.elements.body.addEventListener('click', this.adjustCartQty.bind(this));
    this.elements.body.addEventListener(
      'change',
      this.adjustCartQtyInput.bind(this),
    );
  }

  initCustomEvents() {
    this.onAfterCartLoadEvt = new CustomEvent('afterCartLoad');
  }

  // Get the current cart state and build cart in drawer
  loadCart() {
    cart
      .getState()
      .then((cartData) => {
        this.buildCart(cartData);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Add a product from a form
   * @param {nodelist} - DOM form selector
   * @param {addToCart} - Submit button
   */
  addItemFromForm(form, addToCart) {
    const serializedArray = serializeArray(form);
    const formData = formatAddItemData(serializedArray);

    return cart
      .addItem(formData.id, {
        quantity: formData.quantity,
        properties: formData.properties,
      })
      .then(() => {
        this.itemAddedCallback();
      })
      .catch((err) => {
        this.itemErrorCallback(err);
      })
      .finally(() => {
        this.state.cartIsUpdating = false;
        addToCart.classList.remove(cssClases.isAdding);
      });
  }

  itemAddedCallback() {
    this.elements.body.dispatchEvent(this.onAfterCartLoadEvt);
  }

  itemErrorCallback(err) {
    console.log(err);
    if (err.status === 422) {
      err.text().then((data) => {
        console.log(JSON.parse(data));
      });
    } else {
      console.log(err);
    }
  }

  /**
   * Builds a fresh cart in the cart drawer
   *
   * @param {string} key - Current cart state
   */
  buildCart(cartData) {
    const cartContainer = this.elements.cartContainer;
    while (cartContainer.firstChild) {
      cartContainer.removeChild(cartContainer.firstChild);
    }

    if (cartData.item_count === 0) {
      const cartEmpty = document.createElement('p');
      const emptyNode = document.createTextNode(`${theme.strings.cart_empty}`);
      cartEmpty.appendChild(emptyNode);

      cartContainer.appendChild(cartEmpty);
      return;
    }

    const items = [];
    let data = {};

    // Build data for template
    cartData.items.forEach((item, index) => {
      let itemImg = null;

      if (item.image == null) {
        itemImg =
          '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif';
      } else {
        itemImg = item.image
          .replace(/(\.[^.]*)$/, '_small$1')
          .replace('http:', '');
      }

      const itemData = {
        key: item.key,
        // Shopify uses a 1+ index in the API
        line: index + 1,
        url: item.url,
        img: itemImg,
        name: item.product_title,
        variation: item.variant_title,
        properties: item.properties,
        itemAdd: item.quantity + 1,
        itemMinus: item.quantity - 1,
        itemQty: item.quantity,
        price: formatMoney(item.price, theme.moneyFormat),
        vendor: item.vendor,
        linePrice: formatMoney(item.line_price, theme.moneyFormat),
        originalLinePrice: formatMoney(
          item.original_line_price,
          theme.moneyFormat,
        ),
        discounts: item.discounts,
        discountsApplied: item.line_price !== item.original_line_price,
      };

      items.push(itemData);
    });

    // Gather all cart data and add to DOM
    data = {
      items,
      note: cartData.note,
      totalPrice: formatMoney(cartData.total_price, theme.moneyFormat),
      totalCartDiscount:
        cartData.total_discount === 0
          ? 0
          : `${theme.strings.cartSavings} ${formatMoney(
              cartData.total_discount,
              theme.moneyFormat,
            )}`,
      totalCartDiscountApplied: cartData.total_discount !== 0,
      iconPlus,
      iconMinus,
      strings: {
        empty: theme.strings.cart_empty,
        note: theme.strings.cart_note,
        subtotal: theme.strings.cart_subtotal,
        shippingAtCheckout: theme.strings.cart_shipping_at_checkout,
        checkout: theme.strings.cart_checkout,
      },
    };

    // Append ajaxcart template to cart container
    cartContainer.innerHTML = CartTemplate(data);
  }

  /**
   * Updates line-item's quantity
   *
   * @param {string} key - Cart line-item key ID
   * @param {number} qty - New quantity number
   */
  updateQuantity(key, quantity) {
    this.state.cartIsUpdating = true;

    const rowElem = document.querySelector(
      `${selectors.ajaxRow}[data-key="${key}"]`,
    );
    rowElem.classList.add(cssClases.isLoading);

    // Animate row before updating cart
    if (quantity === 0) {
      rowElem.parentNode.classList.add(cssClases.isRemoved);
    }

    // Update cart via API
    cart
      .updateItem(key, {quantity})
      .then((cartData) => {
        this.adjustCartCallback(cartData);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        rowElem.classList.remove(cssClases.isLoading);
        this.state.cartIsUpdating = false;
      });
  }

  /**
   * Rebuilds the cart and updates cart prices
   *
   * @param {object} cartData - Current cart state
   */
  adjustCartCallback(cartData) {
    this.updateCartCount(cartData);
    setTimeout(() => {
      this.buildCart(cartData);
    }, 150);
  }

  /**
   * Updates the current cart item count anywhere on the page
   *
   * @param {object} cartData - Current cart state
   */
  updateCartCount(cartData) {
    const cartCountSelector = this.elements.cartCountSelector;
    if (cartCountSelector.length > 0) {
      cartCountSelector.forEach((el) => {
        el.innerHTML = cartData.item_count;
      });
    }
  }

  /* ===========================================================================
    UI Event Handlers
  ============================================================================== */
  onFormSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const addToCart = form.querySelector(this.options.addToCartSelector);

    this.state.cartIsUpdating = true;
    addToCart.classList.add(cssClases.isAdding);

    // Small timeout to allow variant id input change in form
    setTimeout(() => {
      this.addItemFromForm(form, addToCart);
    }, 100);
  }

  adjustCartQty(evt) {
    if (!evt.target.matches(selectors.ajaxCartQtyAdjust)) {
      return;
    }

    if (this.state.cartIsUpdating) {
      return;
    }

    const el = evt.target;
    const key = el.dataset.key;
    const qty = validateQuantity(el.dataset.qty);
    this.updateQuantity(key, qty);
  }

  adjustCartQtyInput(evt) {
    if (
      !evt.target.matches(selectors.ajaxCartQtyNumAdjust) ||
      this.state.isUpdating
    ) {
      return;
    }

    const el = evt.target;
    const key = el.dataset.key;
    let qty = parseInt(el.value.replace(/\D/g, ''));
    qty = validateQuantity(qty);
    this.updateQuantity(key, qty);
  }
}

// Set as a singleton to prevent modifications
const AjaxCartInstance = new AjaxCart();
AjaxCartInstance.init();
Object.freeze(AjaxCartInstance);

export default AjaxCartInstance;
