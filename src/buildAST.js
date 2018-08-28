import _ from 'lodash';

const buildAST = (data1, data2) => {
  const nodeTypes = [
    {
      type: 'unchanged',
      check: key => _.has(data1, key) && _.has(data2, key) && data1[key] === data2[key],
      process: key => [{ key, value: data1[key], type: 'unchanged' }],
    },
    {
      type: 'changed',
      check: key => _.has(data1, key) && _.has(data2, key),
      process: key => [{ key, value: data2[key], type: 'added' }, { key, value: data1[key], type: 'deleted' }],
    },
    {
      type: 'added',
      check: key => !_.has(data1, key) && _.has(data2, key),
      process: key => [{ key, value: data2[key], type: 'added' }],
    },
    {
      type: 'deleted',
      check: key => _.has(data1, key) && !_.has(data2, key),
      process: key => [{ key, value: data1[key], type: 'deleted' }],
    },
  ];
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    const { process } = nodeTypes.find(({ check }) => check(key));
    return [...acc, ...process(key)];
  }, []);
  return result;
};

export default buildAST;
