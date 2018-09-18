'use strict';

var findInExpressionTree = require('../util/find-in-expression-tree');
var isNodeChaiCall = require('../util/is-node-chai-call');
var isNodeChaiAsPromised = require('../util/is-node-chai-as-promised');
var isNodeNotify = require('../util/is-node-notify');

module.exports = {
  meta: {
    docs: {
      description: "Must handle promises returned from chai-as-promised expressions",
      category: "Possible Errors",
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create: function(context) {
    return {
      ExpressionStatement: function(node) {
        var found = findInExpressionTree(node.expression, [isNodeChaiCall, isNodeChaiAsPromised, isNodeNotify]);
        var chaiCall = found[0];
        var chaiAsPromisedCall = found[1];

        // notify can also be used to alert runner
        var notifyCall = found[2];

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
