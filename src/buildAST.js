
import _ from 'lodash';

const nodeTypes = [
  {
    type: 'unchanged',
    check: (key, data1, data2) => _.has(data1, key) && _.has(data2, key)
    && data1[key] === data2[key],
    process: (key, data1) => [{ key, value: data1[key], type: 'unchanged' }],
  },
  {
    type: 'changed',
    check: (key, data1, data2) => _.has(data1, key) && _.has(data2, key),
    process: (key, data1, data2) => [{ key, value: data2[key], type: 'added' }, { key, value: data1[key], type: 'deleted' }],
  },
  {
    type: 'added',
    check: (key, data1, data2) => !_.has(data1, key) && _.has(data2, key),
    process: (key, data1, data2) => [{ key, value: data2[key], type: 'added' }],
  },
  {
    type: 'deleted',
    check: (key, data1, data2) => _.has(data1, key) && !_.has(data2, key),
    process: (key, data1) => [{ key, value: data1[key], type: 'deleted' }],
  },
];
const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    const { process } = nodeTypes.find(({ check }) => check(key, data1, data2));
    return [...acc, ...process(key, data1, data2)];
  }, []);
  return result;
};

export default buildAST;
