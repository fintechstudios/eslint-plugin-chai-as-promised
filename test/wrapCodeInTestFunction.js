'use strict';

function wrapCodeInTestFunction(code) {
  return `it('should test', async function test() { ${code}; })`;
};

module.exports = wrapCodeInTestFunction;
