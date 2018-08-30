const getJSONfromNodes = (obj) => {
  const keys = Object.keys(obj);
  return keys.map((key) => {
    const value = obj[key] instanceof Object ? getJSONfromNodes(obj[key]) : obj[key];
    return { type: 'unchanged', key, value };
  }, '');
};

const valueToJSON = value => (value instanceof Object ? getJSONfromNodes(value) : value);
const nodeToJSON = nameValue => ({ type, key }, value) => ({ type, key, [nameValue]: value });

const nodeTypesForRender = {
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
    toJSON: nodeToJSON('valueAfter'),
  },
  deleted: {
    getValue: ({ valueBefore }) => valueToJSON(valueBefore),
    toJSON: nodeToJSON('valueBefore'),
  },
  unchanged: {
    getValue: ({ valueAfter }) => valueToJSON(valueAfter),
    toJSON: nodeToJSON('valueAfter'),
  },
};

const render = (ast) => {
  const iter = nodes => nodes.map((node) => {
    const { type } = node;
    const nodeActionForRender = nodeTypesForRender[type];
    const value = nodeActionForRender.getValue(node, iter);
    return nodeActionForRender.toJSON(node, value);
  });
  return JSON.stringify(iter(ast), null, 2);
};

export default render;
