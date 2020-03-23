'use strict';

const esquery = require('esquery');

const findInExpressionTree = require('../util/find-in-expression-tree');
const isNodeChaiCall = require('../util/is-node-chai-call');
const isNodeChaiAsPromised = require('../util/is-node-chai-as-promised');

function checkHasAwait (context, node) {
  const [
    chaiCall,
    chaiAsPromisedCall
  ] = findInExpressionTree(node, [
    isNodeChaiCall, isNodeChaiAsPromised
  ]);

  if (chaiAsPromisedCall &&
    chaiCall && esquery(chaiCall.parent, '.arguments[type="AwaitExpression"]')
  ) {
    context.report({
      node: chaiAsPromisedCall,
      message: 'Uses of chai-as-promised must not occur with an inner await',
    });
    return true;
  }
  return false;
}

module.exports = {
  meta: {
    docs: {
      description: 'Must not use await within chai-as-promised expressions',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        checkHasAwait(context, node.expression);
      },
      ReturnStatement(node) {
        checkHasAwait(context, node.argument);
      },
      AwaitExpression(node) {
        checkHasAwait(context, node.argument);
      },
      [
      // Promise.all([...])
      'CallExpression' +
        '[callee.type="MemberExpression"]' +
          '[callee.object.name="Promise"]' +
            '[callee.object.type="Identifier"]' +
          '[callee.property.name="all"]' +
            '[callee.property.type="Identifier"]'
      ](node) {
        const [arrayExpression] = esquery(node, '.arguments[type="ArrayExpression"]');
        arrayExpression.elements.some((element) => {
          return checkHasAwait(context, element);
        });
      }
    };
  }
};
