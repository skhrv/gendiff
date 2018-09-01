import _ from 'lodash';

const valueToPlainStr = value => (_.isObject(value) ? '[complex value]' : value);

const nodeTypesForRender = {
  nest: ({ children }, path, func) => func(children, `${path}.`),
  changed: ({ valueBefore, valueAfter }, path) => `Property '${path}' was updated. From '${valueToPlainStr(valueBefore)}' to '${valueToPlainStr(valueAfter)}'`,

  added: ({ valueAfter }, path) => `Property '${path}' was added with value: '${valueToPlainStr(valueAfter)}'`,

  deleted: (node, path) => `Property '${path}' was removed`,
};

export default (ast) => {
  const iter = (nodes, path) => nodes.filter(({ type }) => type !== 'unchanged')
    .map((node) => {
      const { key, type } = node;
      const newPath = `${path}${key}`;
      const nodeRender = nodeTypesForRender[type];
      return nodeRender(node, newPath, iter);
    }, '');
  const plainNodes = _.flatten(iter(ast, ''));
  return plainNodes.join('\n');
};
