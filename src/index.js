import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parse';


const getData = pathfile => fs.readFileSync(pathfile);

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (data1[key] === data2[key]) {
      return [...acc, { key: [key], value: [data1[key]], diff: ' ' }];
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return [...acc, { key: [key], value: [data2[key]], diff: '+' }, { key: [key], value: [data1[key]], diff: '-' }];
    }
    if (_.has(data2, key)) {
      return [...acc, { key: [key], value: [data2[key]], diff: '+' }];
    }
    return [...acc, { key: [key], value: [data1[key]], diff: '-' }];
  }, []);
  return result;
};

const genDiff = (ast) => {
  const str = ast.reduce((acc, item) => {
    const { key, value, diff } = item;
    return `${acc}\n    ${diff} ${key}: ${value}`;
  }, '');
  return `{${str}\n  }`;
};

export default (pathToBefore, pathToAfter) => {
  const ext = path.extname(pathToBefore);
  const before = parse(ext, getData(pathToBefore));
  const after = parse(ext, getData(pathToAfter));
  const ast = buildAST(before, after);
  return genDiff(ast);
};
