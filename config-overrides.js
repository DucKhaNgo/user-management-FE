/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
  config.resolve.modules = ['node_modules', path.resolve(__dirname, 'src')];
  return config;
};
