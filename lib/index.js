'use strict';

const noUnhandledPromisesRules = require('./rules/no-unhandled-promises');

module.exports = {
  configs: {
    recommended: {
      plugins: ['@fintechstudios/chai-as-promised'],
      rules: {
        '@fintechstudios/chai-as-promised/no-unhandled-promises': 'error'
      }
    }
  },
  rules: {
    'no-unhandled-promises': noUnhandledPromisesRules,
  },
};
