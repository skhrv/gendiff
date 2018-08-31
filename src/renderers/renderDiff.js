import _ from 'lodash';

const indentation = '    ';
const tab = tabsize => _.repeat(indentation, tabsize);
const tabForClosingBracket = '  ';

const stringify = (obj, tabsize) => {
  const keys = Object.keys(obj);
  const str = keys.reduce((acc, key) => {
    const value = _.isObject(obj[key]) ? stringify(obj[key], tabsize + 1) : obj[key];
    return `${acc}\n${tab(tabsize)}  ${key}: ${value}`;
  }, '');
  return `{${str}\n${tab(tabsize - 1)}${tabForClosingBracket}}`;
};

const valueToString = (value, tabsize) => (_.isObject(value) ? stringify(value, tabsize) : value);

const nodeToStr = symbol => (key, value, tabsize) => `\n${tab(tabsize)}${symbol} ${key}: ${value}`;

const nodeTypesForRender = {
  nest: {
    getValue: ({ children }, tabsize, func) => func(children, tabsize),
    toString: nodeToStr(' '),
  },
  changed: {
    getValue: ({ valueBefore, valueAfter }, tabsize) => [valueToString(valueBefore, tabsize),
      valueToString(valueAfter, tabsize)],

    toString: (key, value, tabsize) => `\n${tab(tabsize)}- ${key}: ${value[0]}\n${tab(tabsize)}+ ${key}: ${value[1]}`,
  },
  added: {
    getValue: ({ valueAfter }, tabsize) => valueToString(valueAfter, tabsize),
    toString: nodeToStr('+'),
  },
  deleted: {
    symbol: '-',
    getValue: ({ valueBefore }, tabsize) => valueToString(valueBefore, tabsize),
    toString: nodeToStr('-'),
  },
  unchanged: {
    symbol: ' ',
    getValue: ({ valueAfter }, tabsize) => valueToString(valueAfter, tabsize),
    toString: nodeToStr(' '),
  },
};

export default (ast) => {
  const iter = (nodes, tabsize) => {
    const str = nodes.reduce((acc, node) => {
      const { key, type } = node;
      const nodeActionForRender = nodeTypesForRender[type];
      const value = nodeActionForRender.getValue(node, tabsize + 1, iter);
      return `${acc}${nodeActionForRender.toString(key, value, tabsize)}`;
    }, '');
    return tabsize === 1
      ? `{${str}\n${tab(tabsize - 1)}}` : `{${str}\n${tab(tabsize - 1)}${tabForClosingBracket}}`;
  };
  return iter(ast, 1);
};
