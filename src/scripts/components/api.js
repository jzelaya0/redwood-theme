import Utils from './utils';

const axios = require('axios');
const ShopifyAPI = {}

// Selectors
const selectors = {
  body: document.querySelector('body')
}

/*============================================================================
  API Functions
==============================================================================*/
ShopifyAPI.onCartUpdate = (cart) => {
  //console.log('There are now ' + cart.item_count + ' items in the cart.');
};

/*!
 * Parse and print out error message
 * @param  {JSON} error - The error data associated with 
 */
ShopifyAPI.onError = (error) => {
  const parsedJSON = JSON.parse(error.responseText);
  console.log(parsedJSON);
};

/*!
 * Handle the successful POST of an item
 * @param  {JSON} lineItem - The line item associated with the added variant.
 * @param  {Node} form - The product form
 */
ShopifyAPI.onItemAdded = (lineItem, Form) => {
}

/*!
 * Add an item from a form element
 * @param  {Node} form - The product form
 */
ShopifyAPI.addItemFromForm =(form, callback) => {
  selectors.body.dispatchEvent(new Event('beforeAddItem.ajaxCart'));

  axios.post('/cart/add.js', Utils.serialize(form))
    .then(function (lineItem) {
      // handle success
      typeof callback === 'function' ? callback(lineItem, form) : ShopifyAPI.onItemAdded(lineItem, form);
      selectors.body.dispatchEvent(new Event('afterAddItem.ajaxCart'));
    })
    .catch(function (error) {
      // handle error
      ShopifyAPI.onError(error);
      selectors.body.dispatchEvent(new Event('errorAddItem.ajaxCart'));
    })
    .finally(function () {
      // always executed
      selectors.body.dispatchEvent(new Event('completeAddItem.ajaxCart'));
    });
}

/*!
 * Get the cart as JSON
 */
ShopifyAPI.getCart = (callback) => {
  selectors.body.dispatchEvent(new Event('beforeGetCart.ajaxCart'));

  axios.get('/cart.js')
    .then(function (cart) {
      // handle success
      typeof callback === 'function' ? callback(cart.data) : ShopifyAPI.onCartUpdate(cart.data);
    })
    .catch(function (error) {
      // handle error
      ShopifyAPI.onError(error);
    }) 
    .finally(function () {
      // always executed
      selectors.body.dispatchEvent(new Event('afterGetCart.ajaxCart'));
    });
}

export default ShopifyAPI;