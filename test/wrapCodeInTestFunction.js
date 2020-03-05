'use strict';

module.exports = function wrapCodeInTestFunction(code) {
  return 'it(\'should test\', async function test() { ' + code + '; })';
};
