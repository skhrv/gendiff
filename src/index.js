import fs from 'fs';
import path from 'path';
import parse from './parse';
import buildAST from './buildAST';
import render from './getRender';

const getData = pathfile => fs.readFileSync(pathfile, 'utf-8');

export default (pathToBefore, pathToAfter, option = 'default') => {
  const extBefore = path.extname(pathToBefore);
  const extAfter = path.extname(pathToAfter);
  const before = parse(extBefore, getData(pathToBefore));
  const after = parse(extAfter, getData(pathToAfter));
  const ast = buildAST(before, after);
  return render(ast, option);
};
