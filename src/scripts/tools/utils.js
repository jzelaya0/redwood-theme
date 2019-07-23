/**
 * Utilities Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts with helper functions
 *
 * @namespace cart
 */

/**
  * Serialize all form data into a query string
  * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
  * @param {node} form -  The form to serialize
  * @return {string} The serialized form data
  */
export function serialize(form) {
  // Setup our serialized data
  const serialized = [];

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i++) {

    const field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') { continue; }

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) { continue; }
         // Convert field data to a query string;
        serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.options[n].value)}`);
      }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`);
    }
  }

  return serialized.join('&');
}

/**
 * Serialize all form data into an array
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {node} form - The form to serialize
 * @return {string} The serialized form data
 */
export function serializeArray(form) {

  // Setup our serialized data
  const serialized = [];

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i++) {

    const field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') { continue; }

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) { continue; }
        // Convert field data to a query string;
        serialized.push({name: field.name, value: field.options[n].value});
      }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push({name: field.name, value: field.value});
    }
  }

  return serialized;
}

/**
 * Get line item properties from an array and returns
 * as a JSON string for submitting to the cart
 * @param {array} lineItemProps - The list of line item properties
 * @return {string} JSON string containing key value pairs
 */
export function getLineItemPropertiesString(properties) {
  const propsObj = {};

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const propKey = prop.name.replace(/(properties)(\[)/, '').replace(/]/g, '');
    propsObj[propKey] = prop.value;
  }

  return JSON.stringify(propsObj);
}

/**
 * Formats a serialized array as an object to send to the
 * cart via theme-cart.js addItem method
 * @param {array} serializedArray - List of all form data
 * @return {object} Formatted data id, quantity, properties;
 */
export function formatAddItemData(serializedArray) {
  const id = parseInt(serializedArray.find((x) => x.name === 'id').value) || null;
  const quantity = parseInt(serializedArray.find((x) => x.name === 'quantity').value) || 1;
  const properties = serializedArray.filter((x) => x.name.includes('properties'));
  const propertiesObj = {};

  if (properties.length) {

    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      const key = prop.name.replace(/(properties)(\[)/, '').replace(/]/g, '');
      propertiesObj[key] = prop.value;
    }
  }

  return {
    id,
    quantity,
    properties: propertiesObj,
  };
}

/**
 * Validates numbers entered in a form input
 * Returns 1 if invalid number is passed
 * @param {number|string} qty - Number or string to parse
 * @return {number} Valid number
 */

/* eslint-disable no-param-reassign */
export function validateQuantity(qty) {
  if ((parseFloat(qty) === parseInt(qty)) && !isNaN(qty)) {
    qty = parseInt(qty);
  } else {
    // Not a number. Default to 1.
    qty = 1;
  }
  return qty;
}
/* eslint-enable no-param-reassign */
