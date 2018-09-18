'use strict';

function isNodeNotify(node) {
  if (node.type === 'MemberExpression' && node.property.name === 'notify') {
    return node.property;
  }
}

module.exports = isNodeNotify;
