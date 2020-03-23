'use strict';

const rule = require('./no-await-in-condition');
const wrapCodeInTestFunction = require('../../test/wrapCodeInTestFunction');

const innerAwaitExpressions = [
  'expect(await promise).to.eventually.deep.equal("foo")',
  'expect(await promise).to.eventually.be.true',
  'expect(await promise).to.be.fulfilled',
  'expect(await promise).to.become("foo")',
  'expect(await promise).to.be.rejected',
  'expect(await promise).to.be.rejectedWith(Error)',
  '(await promise).should.eventually.deep.equal("foo")',
  '(await promise).should.eventually.be.true',
  '(await promise).should.be.fulfilled',
  '(await promise).should.become("foo")',
  '(await promise).should.be.rejected',
  '(await promise).should.be.rejectedWith(Error)',
  'assert.isFulfilled(await promise, "optional message")',
  'assert.becomes(await promise, "foo", "optional message")',
  'assert.doesNotBecome(await promise, "foo", "optional message")',
  'assert.isRejected(await promise, Error, "optional message")',
  'assert.isRejected(await promise, /error message regex matcher/, "optional message")',
  'assert.isRejected(await promise, "substring to search error message for", "optional message")',
];

ruleTester.run('no-await-in-condition', rule, {
  valid: [].concat(
    [
      // regular chai calls that shouldn't be false-positive
      'expect(promise).to.be.true',
      'expect(promise).to.be.a(\'string\')',
      'expect(promise).to.equal(\'bar\')',
      'expect(promise).to.have.lengthOf(3)',
      'expect(promise).to.have.property(\'flavors\').with.lengthOf(3)',
      'expect(await promise).to.be.true',
      'promise.should.be.a(\'string\')',
      'promise.should.equal(\'bar\')',
      'promise.should.have.lengthOf(3)',
      'promise.should.have.property(\'flavors\').with.lengthOf(3)',
      '(await promise).should.be.a(\'string\')',
      'assert.typeOf(promise, \'string\')',
      'assert.equal(promise, \'bar\')',
      'assert.lengthOf(promise, 3)',
      'assert.property(promise, \'flavors\')',
      'assert.lengthOf(promise.flavors, 3)',
      'assert.equal(await promise, \'bar\')'
    ]
  ).map(function (code) {
    return wrapCodeInTestFunction(code);
  }),

  invalid: [].concat(
    // No matter the wrapping, we don't want `await` permitted inside
    innerAwaitExpressions.map((code) => `return ${code}`),
    innerAwaitExpressions.map((code) => `await ${code}`),
    innerAwaitExpressions.map((code) => `${code}.notify(done)`),
    [
      'await Promise.all([' +
      innerAwaitExpressions.reduce((out, expression) => `${out}\n ${expression},`, '') +
      '\n]);'
    ],
    innerAwaitExpressions
  ).map(function (code) {
    return {
      code: wrapCodeInTestFunction(code),
      errors: [{
        message: 'Uses of chai-as-promised must not occur with an inner await',
        type: 'Identifier',
      }],
    };
  })
});
