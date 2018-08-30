const getJSONfromNodes = (obj) => {
  const keys = Object.keys(obj);
  return keys.map((key) => {
    const value = obj[key] instanceof Object ? getJSONfromNodes(obj[key]) : obj[key];
    return { type: 'unchanged', key, value };
  }, '');
};

const valueToJSON = value => (value instanceof Object ? getJSONfromNodes(value) : value);

const nodeTypesForiter = {
  nest: {
    getValue: ({ children }, func) => func(children),
    toJSON: ({ key }, valueAfter) => ({ type: 'unchanged', key, valueAfter }),
  },
  changed: {
    getValue: ({ valueBefore, valueAfter }) => [valueToJSON(valueBefore), valueToJSON(valueAfter)],
    toJSON: ({ type, key }, value) => ({
      type, key, valueBefore: value[0], valueAfter: value[1],
    }),
  },
  added: {
    getValue: ({ valueAfter }) => valueToJSON(valueAfter),
    toJSON: ({ type, key }, valueAfter) => ({ type, key, valueAfter }),
  },
  deleted: {
    getValue: ({ valueBefore }) => valueToJSON(valueBefore),
    toJSON: ({ type, key }, valueBefore) => ({ type, key, valueBefore }),
  },
  unchanged: {
    getValue: ({ valueAfter }) => valueToJSON(valueAfter),
    toJSON: ({ type, key }, valueAfter) => ({ type, key, valueAfter }),
  },
};

const render = (ast) => {
  const iter = nodes => nodes.map((node) => {
    const { type } = node;
    const nodeActionForiter = nodeTypesForiter[type];
    const value = nodeActionForiter.getValue(node, iter);
    return nodeActionForiter.toJSON(node, value);
  });
  return JSON.stringify(iter(ast), null, 2);
};

export default render;
