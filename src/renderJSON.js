const getJSONfromNodes = (obj) => {
  const keys = Object.keys(obj);
  return keys.map((key) => {
    const value = obj[key] instanceof Object ? getJSONfromNodes(obj[key]) : obj[key];
    return { type: 'unchanged', key, value };
  }, '');
};


const getSimpeValue = ({ value }) => (value instanceof Object
  ? getJSONfromNodes(value) : value);

const nodeTypesForRender = {
  nest: {
    getValue: ({ children }, func) => func(children),
  },
  changed: {
    getValue: ({ value }) => {
      const newValue = value[0] instanceof Object ? getJSONfromNodes(value[0]) : value[0];
      const oldValue = value[1] instanceof Object ? getJSONfromNodes(value[1]) : value[1];
      return { newValue, oldValue };
    },
  },
  added: {
    getValue: getSimpeValue,
  },
  deleted: {
    getValue: getSimpeValue,
  },
  unchanged: {
    getValue: getSimpeValue,
  },
};

const render = ast => ast.map((node) => {
  const { key, type } = node;
  const nodeActionForRender = nodeTypesForRender[type];
  const value = nodeActionForRender.getValue(node, render);
  const newType = type === 'nest' ? 'unchanged' : type;
  return { type: newType, key, value };
});

export default render;
