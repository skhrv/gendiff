import yaml from 'js-yaml';
import ini from 'ini';

const dataFormats = {
  '.yaml': data => yaml.safeLoad(data),
  '.json': data => JSON.parse(data),
  '.ini': data => ini.parse(data),
};

const getParsing = ext => dataFormats[ext];

export default (ext, data) => {
  const parse = getParsing(ext);
  return parse(data);
};
