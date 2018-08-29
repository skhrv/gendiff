import yaml from 'js-yaml';
import ini from 'ini';

const dataFormats = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const getParsing = ext => dataFormats[ext];

export default (ext, data) => {
  const parse = getParsing(ext);
  return parse(data);
};
