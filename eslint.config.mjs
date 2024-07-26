import eslint from '@eslint/js';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        expect: true,
        ruleTester: true,
        RuleTester: true
      },
      sourceType: 'commonjs',
      ecmaVersion: 2015
    }
  },
  {
    rules: {
      'strict': ['error'],
      'indent': ['error', 2],

      'semi': ['error'],
      'prefer-const': ['error'],
      'no-var': ['error'],
      'prefer-destructuring': ['error'],
      'object-shorthand': ['error'],
      'quotes': ['error', 'single']
    }
  }
];
