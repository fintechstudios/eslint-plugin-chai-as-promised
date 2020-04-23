'use strict';

const esquery = require('esquery');

const findInExpressionTree = require('../util/find-in-expression-tree');
const isNodeChaiCall = require('../util/is-node-chai-call');
const isNodeChaiAsPromised = require('../util/is-node-chai-as-promised');

const PromiseAllSelector = 'CallExpression' +
  '[callee.type="MemberExpression"]' +
    '[callee.object.name="Promise"]' +
      '[callee.object.type="Identifier"]' +
    '[callee.property.name="all"]' +
      '[callee.property.type="Identifier"]';

function checkHasAwait (context, node) {
  const [
    chaiCall,
    chaiAsPromisedCall
  ] = findInExpressionTree(node, [
    isNodeChaiCall, isNodeChaiAsPromised
  ]);

  if (chaiAsPromisedCall && chaiCall && esquery(
    chaiCall.parent,
    ':matches(.arguments[type="AwaitExpression"], .object[type="AwaitExpression"])'
  ).length && !esquery(
    chaiCall.parent.parent,
    PromiseAllSelector
  ).length) {
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
    type: 'problem',
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
      [PromiseAllSelector](node) {
        const [arrayExpression] = esquery(node, '.arguments[type="ArrayExpression"]');
        if (!arrayExpression) {
          return;
        }
        arrayExpression.elements.some((element) => {
          return checkHasAwait(context, element);
        });
      }
    };
  }
};
