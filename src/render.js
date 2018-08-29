import _ from 'lodash';

const indentation = '    ';
const tab = tabsize => _.repeat(indentation, tabsize);
const tabForClosingBracket = '  ';

const stringify = (obj, tabsize) => {
  const keys = Object.keys(obj);
  const str = keys.reduce((acc, key) => {
    const value = obj[key] instanceof Object ? stringify(obj[key], tabsize + 1) : obj[key];
    return `${acc}\n${tab(tabsize)}  ${key}: ${value}`;
  }, '');
  return `{${str}\n${tab(tabsize - 1)}${tabForClosingBracket}}`;
};

const nodeTypesForRender = {
  nest: {
    symbol: ' ',
    getValue: ({ children }, tabsize, func) => func(children, tabsize),
  },
  added: {
    symbol: '+',
    getValue: ({ value }, tabsize) => (value instanceof Object ? stringify(value, tabsize) : value),
  },
  deleted: {
    symbol: '-',
    getValue: ({ value }, tabsize) => (value instanceof Object ? stringify(value, tabsize) : value),
  },
  unchanged: {
    symbol: ' ',
    getValue: ({ value }, tabsize) => (value instanceof Object ? stringify(value, tabsize) : value),
  },
};

const render = (ast) => {
  const iter = (nodes, tabsize) => {
    const str = nodes.reduce((acc, node) => {
      const { key, type } = node;
      const nodeActionForRender = nodeTypesForRender[type];
      const value = nodeActionForRender.getValue(node, tabsize + 1, iter);
      return `${acc}\n${tab(tabsize)}${nodeActionForRender.symbol} ${key}: ${value}`;
    }, '');
    return tabsize === 1
      ? `{${str}\n${tab(tabsize - 1)}}` : `{${str}\n${tab(tabsize - 1)}${tabForClosingBracket}}`;
  };
  return iter(ast, 1);
};

export default render;
