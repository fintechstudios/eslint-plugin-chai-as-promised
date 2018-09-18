'use strict';

var chaiAsPromiseProperties = [
  'eventually',
  'fulfilled',
  'become',
  'rejected',
  'rejectedWith',
  'isFulfilled',
  'becomes',
  'doesNotBecome',
  'isRejected',
];

function isNodeChaiAsPromised(node) {
  if (node.type === 'MemberExpression' && chaiAsPromiseProperties.indexOf(node.property.name) >= 0) {
    return node.property;
  }
}

module.exports = isNodeChaiAsPromised;
