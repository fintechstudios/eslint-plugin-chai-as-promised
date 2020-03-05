'use strict';

/**
 * Test for each item in an expression tree, returning first result for each test.
 *
 * @param {object} startNode - expression tree to start at
 * @param {Array<function(object): *>} tests - list of tests to run, return truthy to be marked as found
 * @return {Array<*>} each index will be the result of the corresponding tests index result
 */
function findInExpressionTree(startNode, tests) {
  const found = [];

  let node = startNode;
  let numFound = 0;

  while (node) {
    for (let i = 0; i < tests.length; i += 1) {
      if (found[i]) {
        continue;
      }
      const result = tests[i](node);
      if (result) {
        found[i] = result;
        numFound += 1;
      }
    }

    if (numFound === tests.length) {
      return found;
    }

    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
      node = node.callee;
    } else if (node.type === 'MemberExpression') {
      node = node.object;
    } else {
      return found;
    }
  }

  /* istanbul ignore next */
  return found;
}

module.exports = findInExpressionTree;
