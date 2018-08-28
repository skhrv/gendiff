import yaml from 'js-yaml';
import ini from 'ini';


const fileExtensions = [
  {
    ext: '.yaml',
    parse: file => yaml.safeLoad(file),
  },
  {
    ext: '.json',
    parse: file => JSON.parse(file),
  },
  {
    ext: '.ini',
    parse: file => ini.parse(file),
  },
];
const getParsing = extention => fileExtensions.find(({ ext }) => ext === extention);

export default (ext, data) => {
  const { parse } = getParsing(ext);
  return parse(data);
};
