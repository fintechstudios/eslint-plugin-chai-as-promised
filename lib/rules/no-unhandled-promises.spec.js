'use strict';

var rule = require('./no-unhandled-promises');

function wrapCodeInTestFunction(code) {
  return 'it(\'should test\', async function test() { ' + code + '; })';
}

var unhandledExpressions = [
  'expect(promise).to.eventually.deep.equal("foo")',
  'expect(promise).to.eventually.be.true',
  'expect(promise).to.be.fulfilled',
  'expect(promise).to.become("foo")',
  'expect(promise).to.be.rejected',
  'expect(promise).to.be.rejectedWith(Error)',
  'promise.should.eventually.deep.equal("foo")',
  'promise.should.eventually.be.true',
  'promise.should.be.fulfilled',
  'promise.should.become("foo")',
  'promise.should.be.rejected',
  'promise.should.be.rejectedWith(Error)',
  'assert.isFulfilled(promise, "optional message")',
  'assert.becomes(promise, "foo", "optional message")',
  'assert.doesNotBecome(promise, "foo", "optional message")',
  'assert.isRejected(promise, Error, "optional message")',
  'assert.isRejected(promise, /error message regex matcher/, "optional message")',
  'assert.isRejected(promise, "substring to search error message for", "optional message")',
];

ruleTester.run('no-unhandled-promises', rule, {
  valid: [].concat(
    unhandledExpressions.map(function (code) {
      return 'return ' + code;
    }),
    unhandledExpressions.map(function (code) {
      return 'await ' + code;
    }),
    unhandledExpressions.map(function (code) {
      return code + '.notify(done)';
    }),
    [
      // Promise.all handles promises
      'await Promise.all([' +
      unhandledExpressions.reduce(function(out, expression) {
        return out + '\n  ' + expression + ',';
      }, '') +
      '\n]);'
    ],
    [
      // regular chai calls that shouldn't false-positive
      'expect(promise).to.be.true',
      'expect(promise).to.be.a(\'string\')',
      'expect(promise).to.equal(\'bar\')',
      'expect(promise).to.have.lengthOf(3)',
      'expect(promise).to.have.property(\'flavors\').with.lengthOf(3)',
      'promise.should.be.a(\'string\')',
      'promise.should.equal(\'bar\')',
      'promise.should.have.lengthOf(3)',
      'promise.should.have.property(\'flavors\').with.lengthOf(3)',
      'assert.typeOf(promise, \'string\')',
      'assert.equal(promise, \'bar\')',
      'assert.lengthOf(promise, 3)',
      'assert.property(promise, \'flavors\')',
      'assert.lengthOf(promise.flavors, 3)'
    ]
  ).map(function (code) {
    return wrapCodeInTestFunction(code);
  }),

  invalid: unhandledExpressions.map(function (code) {
    return {
      code: wrapCodeInTestFunction(code),
      errors: [{
        message: 'Uses of chai-as-promised must be handled with await, return, or notify',
        type: 'Identifier',
      }],
    };
  })
});
