import _ from 'lodash';

const indentation = '    ';
const tab = deepLevel => _.repeat(indentation, deepLevel);
const tabForClosingBracket = '  ';

const stringify = (obj, deepLevel) => {
  const keys = Object.keys(obj);
  const str = keys.reduce((acc, key) => {
    const value = _.isObject(obj[key]) ? stringify(obj[key], deepLevel + 1) : obj[key];
    return `${acc}\n${tab(deepLevel)}  ${key}: ${value}`;
  }, '');
  return `{${str}\n${tab(deepLevel - 1)}${tabForClosingBracket}}`;
};

const valueToString = (value, deepLevel) => (_.isObject(value)
  ? stringify(value, deepLevel + 1) : value);

const nodeToStr = (key, value, symbol, deepLevel) => `${tab(deepLevel)}${symbol} ${key}: ${value}`;

const nodeTypesForRender = {
  nest: {
    toString: ({ key, children }, deepLevel, func) => {
      const processedValue = func(children, deepLevel);
      return nodeToStr(key, processedValue, ' ', deepLevel);
    },
  },
  changed: {
    toString: ({ key, valueBefore, valueAfter }, deepLevel) => {
      const processedValueBefore = valueToString(valueBefore, deepLevel);
      const processedValueAfter = valueToString(valueAfter, deepLevel);
      return [nodeToStr(key, processedValueBefore, '-', deepLevel),
        nodeToStr(key, processedValueAfter, '+', deepLevel)];
    },
  },
  added: {
    toString: ({ key, valueAfter }, deepLevel) => nodeToStr(key, valueToString(valueAfter, deepLevel), '+', deepLevel),
  },
  deleted: {
    toString: ({ key, valueBefore }, deepLevel) => nodeToStr(key, valueToString(valueBefore, deepLevel), '-', deepLevel),
  },
  unchanged: {
    toString: ({ key, valueAfter }, deepLevel) => nodeToStr(key, valueToString(valueAfter, deepLevel), ' ', deepLevel),
  },
};

export default (ast) => {
  const iter = (nodes, deepLevel) => {
    const nodesProccesed = nodes.map((node) => {
      const { type } = node;
      const nodeActionForRender = nodeTypesForRender[type];
      return nodeActionForRender.toString(node, deepLevel + 1, iter);
    });
    const result = _.flattenDeep(nodesProccesed).join('\n');
    return deepLevel === 0
      ? `{\n${result}\n${tab(deepLevel)}}` : `{\n${result}\n${tab(deepLevel)}${tabForClosingBracket}}`;
  };
  return iter(ast, 0);
};
