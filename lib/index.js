'use strict';

const noUnhandledPromisesRules = require('./rules/no-unhandled-promises');

module.exports = {
  rules: {
    'no-unhandled-promises': noUnhandledPromisesRules,
  },
};

