# Must handle promises returned from chai-as-promised expressions (no-unhandled-promises)


## Rule Details

Chai-as-promised makes chai calls return promises. These can easily be fogotten
about, leading to unhandled promises in your test suite. This rule checks for those and
enforces using return or await.

Examples of **incorrect** code for this rule:

```js
it('should ...', async function() {
  expect(promise).to.eventually.be.true;
});
```

Examples of **correct** code for this rule:

```js
it('should ...', async function() {
  await expect(promise).to.eventually.be.true;
});

it('should ...', function() {
  return expect(promise).to.eventually.be.true;
});

it('should ...', function(done) {
  expect(promise).to.eventually.be.true.and.notify(done);
});
```
