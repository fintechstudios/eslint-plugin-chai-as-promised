'use strict';

const findInExpressionTree = require('../util/find-in-expression-tree');
const isNodeChaiCall = require('../util/is-node-chai-call');
const isNodeChaiAsPromised = require('../util/is-node-chai-as-promised');
const isNodeNotify = require('../util/is-node-notify');

module.exports = {
  meta: {
    docs: {
      description: 'Must handle promises returned from chai-as-promised expressions',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        const [
          chaiCall,
          chaiAsPromisedCall,
          // notify can also be used to alert runner
          notifyCall
        ] = findInExpressionTree(node.expression, [isNodeChaiCall, isNodeChaiAsPromised, isNodeNotify]);

        if (!notifyCall && chaiCall && chaiAsPromisedCall) {
          context.report({
            node: chaiAsPromisedCall,
            message: 'Uses of chai-as-promised must be handled with await, return, or notify',
          });
        }
      },
    };
  }
};
