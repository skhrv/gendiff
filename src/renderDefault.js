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

const getSimpeValue = ({ value }, tabsize) => (value instanceof Object
  ? stringify(value, tabsize) : value);

const nodeTypesForRender = {
  nest: {
    getValue: ({ children }, tabsize, func) => func(children, tabsize),
    toString: (key, value, tabsize) => `\n${tab(tabsize)}  ${key}: ${value}`,
  },
  changed: {
    getValue: ({ value }, tabsize) => {
      const newValue = getSimpeValue(value[0], tabsize);
      const oldValue = getSimpeValue(value[0], tabsize);
      return [newValue, oldValue];
    },
    toString: (key, value, tabsize) => {
      const [newValue, oldValue] = value;
      return `\n${tab(tabsize)}+ ${key}: ${newValue}\n${tab(tabsize)}- ${key}: ${oldValue}`;
    },
  },
  added: {
    getValue: getSimpeValue,
    toString: (key, value, tabsize) => `\n${tab(tabsize)}+ ${key}: ${value}`,
  },
  deleted: {
    getValue: getSimpeValue,
    toString: (key, value, tabsize) => `\n${tab(tabsize)}- ${key}: ${value}`,
  },
  unchanged: {
    getValue: getSimpeValue,
    toString: (key, value, tabsize) => `\n${tab(tabsize)}  ${key}: ${value}`,
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
