import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '@/scripts/components/mobile-nav';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';

// Common a11y fixes
focusHash();
bindInPageLinks();

/**
 * Browser cookies are required to use the cart. This function checks if
 * cookies are enabled in the browser.
 */
function cookiesEnabled() {
  let cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled) {
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
  }
  return cookieEnabled;
}

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}
