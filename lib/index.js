'use strict';

const noAwaitInCondition = require('./rules/no-await-in-condition');
const noUnhandledPromisesRules = require('./rules/no-unhandled-promises');

module.exports = {
  rules: {
    'no-await-in-condition': noAwaitInCondition,
    'no-unhandled-promises': noUnhandledPromisesRules,
  },
};

module.exports.configs = {
  recommended: {
    plugins: ['@fintechstudios/chai-as-promised'],
    rules: {
      '@fintechstudios/chai-as-promised/no-await-in-condition': 'error',
      '@fintechstudios/chai-as-promised/no-unhandled-promises': 'error'
    }
  },
  'flat/recommended': {
    name: '@fintechstudios/chai-as-promised/flat/recommended',
    plugins: {
      '@fintechstudios/chai-as-promised': module.exports
    },
    rules: {
      '@fintechstudios/chai-as-promised/no-await-in-condition': 'error',
      '@fintechstudios/chai-as-promised/no-unhandled-promises': 'error'
    }
  }
};
