import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


const fileExtension = [
  {
    ext: '.yaml',
    parse: file => yaml.safeLoad(file),
  },
  {
    ext: '.json',
    parse: file => JSON.parse(file),
  },
];
const getParsing = extention => fileExtension.find(({ ext }) => ext === extention);

export default (pathToFile) => {
  const ext = path.extname(pathToFile);
  const { parse } = getParsing(ext);
  return parse(fs.readFileSync(pathToFile));
};
