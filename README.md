# @fintechstudios/eslint-plugin-chai-as-promised

Prevent common problems when using chai-as-promised

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@fintechstudios/eslint-plugin-chai-as-promised`:

```
$ npm install @fintechstudios/eslint-plugin-chai-as-promised --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@fintechstudios/eslint-plugin-chai-as-promised` globally.

## Usage for eslint.config.js flat (ESLint >= 8)

Add `@fintechstudios/chai-as-promised` to a plugins object within your `eslint.config.js` configuration file. You can omit the `eslint-plugin-` prefix:

```js
import chaiAsPromised from '@fintechstudios/chai-as-promised';

export default [
  {
    "plugins": {
      "@fintechstudios/eslint-plugin-chai-as-promised": chaiAsPromised
    }
  }
];
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@fintechstudios/chai-as-promised/no-unhandled-promises": 2,
    "@fintechstudios/chai-as-promised/no-await-in-condition": 2
  }
}
```

Or, to just use the configuration above as is, you can simply add the
following instead:

```js
import chaiAsPromised from '@fintechstudios/chai-as-promised';

export default [
  chaiAsPromised.configs['flat/recommended'];
];
```


## Usage for .eslintrc (ESLint < 9)

Add `@fintechstudios/chai-as-promised` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "@fintechstudios/eslint-plugin-chai-as-promised"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@fintechstudios/chai-as-promised/no-unhandled-promises": 2,
    "@fintechstudios/chai-as-promised/no-await-in-condition": 2
  }
}
```

Or, to just use the configuration above as is, you can simply add the
following instead:

```json
{
  "extends": ["plugin:@fintechstudios/chai-as-promised/recommended"]
}
```

## Supported Rules

* [`no-await-in-condition`](./docs/rules/no-await-in-condition.md): Must not use
  await within chai-as-promised expressions
* [`no-unhandled-promises`](./docs/rules/no-unhandled-promises.md): Must handle
  promises returned from chai-as-promised expressions
