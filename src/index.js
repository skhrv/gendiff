import __ from 'lodash';
import getFileFromPath from './parse';

const buildAST = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const astData1 = keys1.reduce((acc, key) => {
    if (__.has(data2, key) && data1[key] === data2[key]) {
      return [...acc, [[key, data1[key]], ' ']];
    }
    if (__.has(data2, key)) {
      return [...acc, [[key, data2[key]], '+'], [[key, data1[key]], '-']];
    }
    return [...acc, [[key, data1[key]], '-']];
  }, []);
  const result = keys2.reduce((acc, key) => (__.has(data1, key) ? acc : [...acc, [[key, data2[key]], '+']]), astData1);
  return result;
};

const genDiff = (ast) => {
  const str = ast.reduce((acc, item) => {
    const [obj, diff] = item;
    const [key, value] = obj;
    return `${acc}\n    ${diff} ${key}: ${value}`;
  }, '');
  return `{${str}\n  }`;
};

export default (pathToBefore, pathToAfter) => {
  const before = getFileFromPath(pathToBefore);
  const after = getFileFromPath(pathToAfter);
  const ast = buildAST(before, after);
  return genDiff(ast);
};
