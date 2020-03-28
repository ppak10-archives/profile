/**
 * hot.js
 * Checks for reloads in entry file index.js
 */

import './index';

if (module.hot) {
  module.hot.accept('./index.js', () => {
    require('./index');
  });
}
