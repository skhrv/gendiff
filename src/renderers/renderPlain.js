import _ from 'lodash';

const valueToPlainStr = value => (_.isObject(value) ? '[complex value]' : value);

const nodeTypesForRender = {
  nest: {
    toString: ({ children }, path, func) => func(children, `${path}.`),
  },
  changed: {
    toString: ({ valueBefore, valueAfter }, path) => `Property '${path}' was updated. From '${valueToPlainStr(valueBefore)}' to '${valueToPlainStr(valueAfter)}'`,
  },
  added: {
    toString: ({ valueAfter }, path) => `Property '${path}' was added with value: '${valueToPlainStr(valueAfter)}'`,
  },
  deleted: {
    toString: (node, path) => `Property '${path}' was removed`,
  },
  unchanged: {
    toString: () => '',
  },
};
export default (ast) => {
  const iter = (nodes, path) => nodes.map((node) => {
    const { key, type } = node;
    const newPath = `${path}${key}`;
    const nodeActionForRender = nodeTypesForRender[type];
    return nodeActionForRender.toString(node, newPath, iter);
  }, '');
  const plainNodes = _.flattenDeep(iter(ast, ''));
  return _.compact(plainNodes).join('\n');
};
