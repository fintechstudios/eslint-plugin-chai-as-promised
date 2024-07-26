'use strict';

global.RuleTester = require('eslint').RuleTester;

global.RuleTester.setDefaultConfig({
  languageOptions: {
    ecmaVersion: 2017,
    globals: {
      expect: true,
      assert: true,
    },
  },
});

global.ruleTester = new global.RuleTester();
