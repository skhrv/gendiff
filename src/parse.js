import path from 'path';
import yaml from 'js-yaml';


const fileExtensions = [
  {
    ext: '.yaml',
    parse: file => yaml.safeLoad(file),
  },
  {
    ext: '.json',
    parse: file => JSON.parse(file),
  },
];
const getParsing = extention => fileExtensions.find(({ ext }) => ext === extention);

export default (pathToFile) => {
  const ext = path.extname(pathToFile);
  const { parse } = getParsing(ext);
  return parse;
};
