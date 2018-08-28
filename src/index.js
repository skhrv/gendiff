import fs from 'fs';
import path from 'path';
import parse from './parse';
import buildAST from './buildAST';


const getData = pathfile => fs.readFileSync(pathfile, 'utf-8');

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
