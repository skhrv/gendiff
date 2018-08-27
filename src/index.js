import __ from 'lodash';
import getFileFromPath from './parse';

const buildAST = (data1, data2) => {
  const keys = __.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (__.has(data1, key) && __.has(data2, key) && data1[key] === data2[key]) {
      return [...acc, [[key, data1[key]], ' ']];
    }
    if (__.has(data1, key) && __.has(data2, key)) {
      return [...acc, [[key, data2[key]], '+'], [[key, data1[key]], '-']];
    }
    if (__.has(data2, key)) {
      return [...acc, [[key, data2[key]], '+']];
    }
    return [...acc, [[key, data1[key]], '-']];
  }, []);
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
