# Must not use await within chai-as-promised expressions (no-await-in-condition)

## Rule Details

Chai-as-promised checks against a promise--not its resolved value. While writing up some `Promise`-based code, one might be accuomsted to always adding an `await` when handling the `Promise`. This rule therefore prohibits use of `await` within `chai-as-promised`-style conditions.

Examples of **incorrect** code for this rule:

```js
it('should ...', async function() {
  return expect(await promise).to.eventually.deep.equal("foo");
});

it('should ...', async function() {
  await expect(await promise).to.eventually.deep.equal("foo");
});

it('should ...', async function() {
  return expect(await promise).to.be.rejectedWith(Error);
});

it('should ...', async function() {
  return (await promise).should.eventually.deep.equal("foo");
});

it('should ...', async function() {
  return assert.isFulfilled(await promise, "optional message");
});
```

Examples of **correct** code for this rule:

```js
it('should ...', async function() {
  return expect(promise).to.eventually.deep.equal("foo");
});

it('should ...', async function() {
  await expect(promise).to.eventually.deep.equal("foo");
});

it('should ...', async function() {
  return expect(promise).to.be.rejectedWith(Error);
});

it('should ...', async function() {
  return promise.should.eventually.deep.equal("foo");
});

it('should ...', async function() {
  return assert.isFulfilled(promise, "optional message");
});
```
