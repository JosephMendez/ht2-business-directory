/*
Nuxt.js module for ht2-business-directory
Usage:
    - Install ht2-business-directory package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'ht2-business-directory/nuxt'
            // Optionally passing options in module configuration
            ['ht2-business-directory/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        HiretradesBusinessDirectory: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.HiretradesBusinessDirectory, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'ht2-business-directory-plugin.template.js.tpl'),
    fileName: 'ht2-business-directory-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
