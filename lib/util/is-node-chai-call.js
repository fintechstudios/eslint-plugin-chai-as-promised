'use strict';

function isNodeChaiCall(node) {
  // obj.should.be
  if (node.type === 'MemberExpression' && node.property.name === 'should') {
    return node.property;
  }

  // assert(condition)
  if (node.type === 'MemberExpression' && node.object.type === 'Identifier' && node.object.name === 'assert') {
    return node;
  }

  // expect(condition)
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'expect') {
    return node;
  }
}

module.exports = isNodeChaiCall;
