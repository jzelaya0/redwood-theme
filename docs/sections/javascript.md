# JavaScript
Included javascript modules and utilities

## Utilities
Built in helper functions
A list of utility functions can be found here:
```
project   
│
└───src
│   │
│   └───scripts
│       │   
│       └───tools
│           │   
│           └───utils.js
```

### serialize

`serialize(form)` -> Serialized String

Serialize all form data into a query string.


#### Parameters:
| Name      | Type | Description           |
|-----------|------|-----------------------|
| form      | Node | The form to serialize |

#### Returns:

| Type   | Description              |
|--------|--------------------------|
| String | The serialized form data |

### serializeArray

`serializeArray(form)` -> Serialized Array

Serialize all form data into an array.

#### Parameters:
| Name      | Type | Description           |
|-----------|------|-----------------------|
| form      | Node | The form to serialize |

#### Returns:

| Type   | Description              |
|--------|--------------------------|
| String | The serialized form data |

### getLineItemPropertiesString

`getLineItemPropertiesString(lineItemProps)` -> JSON string of line-item properties

Get line item properties from an array and returns as a JSON string for submitting to the cart.

#### Parameters:
| Name          | Type  | Description                      |
|---------------|-------|----------------------------------|
| lineItemProps | array | The list of line item properties |

#### Returns:
| Type   | Description                            |
|--------|----------------------------------------|
| String | JSON string containing key value pairs |

### formatAddItemData

`formatAddItemData(serializedArray)` -> Formatted data id, quantity, properties;

Formats a serialized array as an object to send to the cart via theme-cart.js addItem method.

#### Parameters:
| Name            | Type  | Description           |
|-----------------|-------|-----------------------|
| serializedArray | array | List of all form data |

#### Returns:

| Type   | Description                              |
|--------|------------------------------------------|
| Object | Formatted data id, quantity, properties; |

### validateQuantity

`validateQuantity(qty)` -> Valid number

Validates numbers entered in a form input. Returns 1 if invalid number is passed.

#### Parameters:
| Name | Type           | Description               |
|------|----------------|---------------------------|
| qty  | Number, String | Number or string to parse |

#### Returns:

| Type   | Description  |
|--------|--------------|
| Number | Valid number |

## Modules

### Drawers
Drawers have been ported over from Shopify's Timber framework but with a few slight modifications.

#### Parameters

| Name                 | Type     | Default                           | Description                              |
|----------------------|----------|-----------------------------------|------------------------------------------|
| id                   | String   | null                                | Id of DOM node to create a drawer        |
| options              | Object   | null                                | Object with custom options               |
| options.position     | String   | 'left'                              | Accepts "top", "right", "bottom", "left" |
| options.openBtn      | String   | 'js-drawer-open-${option.position}' | Selector that opens the drawer           |
| options.closeBtn     | String   | '.js-drawer-close'                  | Selector for closing the drawer          |
| options.onDrawerOpen | Function | null                                | Callback to run after drawer opens       |
| option.onDrawerClose | Function | null                                | Callback to run after drawer closes      |

#### Usage

```html
<!-- NOTE: Drawers must be placed outside the #PageContainer wrapper -->
<div id="MyDrawer" class="custom-drawer drawer drawer--right">
  <div class="drawer__header">
    <div class="drawer__title">My Custom Drawer</div>
    <button type="button" class="drawer__close-btn js-drawer-close">X</button>
  </div>
  <div class="drawer__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
</div>

<div id="PageContainer" class="page-container">
  <main role="main" id="MainContent">
    <!-- Content for Layout -->
  </main>
</div>
```

```javascript
const myDrawer = new Drawer('MyDrawer', {
  position: 'right',
  onDrawerOpen: () => {
    console.log('Drawer has opened!');
  }
});
```

## Libraries

Included libraries available for use:

- [Lazysizes.js](https://github.com/aFarkas/lazysizes)
- [Lodash](https://lodash.com/)
- [Lodash](https://lodash.com/)
- [JQuery](https://jquery.com/)
- [Handlebars Loader](https://github.com/pcardune/handlebars-loader)
