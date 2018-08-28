import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parse';


const getData = pathfile => fs.readFileSync(pathfile, 'utf-8');

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, { key, value: data1[key], type: 'unchanged' }];
      }
      return [...acc, { key, value: data2[key], type: 'added' }, { key, value: data1[key], type: 'deleted' }];
    }
    if (_.has(data2, key)) {
      return [...acc, { key, value: data2[key], type: 'added' }];
    }
    return [...acc, { key, value: data1[key], type: 'deleted' }];
  }, []);
  return result;
};

const nodeTypesForRender = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const render = (ast) => {
  const str = ast.reduce((acc, item) => {
    const { key, value, type } = item;
    return `${acc}\n    ${nodeTypesForRender[type]} ${key}: ${value}`;
  }, '');
  return `{${str}\n  }`;
};

export default (pathToBefore, pathToAfter) => {
  const extBefore = path.extname(pathToBefore);
  const extAfter = path.extname(pathToAfter);
  const before = parse(extBefore, getData(pathToBefore));
  const after = parse(extAfter, getData(pathToAfter));
  const ast = buildAST(before, after);
  return render(ast);
};
