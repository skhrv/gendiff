import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  const expected = fs.readFileSync('__test__/__fixtures__/expected.test1.txt', 'utf-8');
  let pathToFile1;
  let pathToFile2;
  it('json', () => {
    pathToFile1 = '__test__/__fixtures__/before.json';
    pathToFile2 = '__test__/__fixtures__/after.json';
    const actual = genDiff(pathToFile1, pathToFile2);
    expect(actual).toBe(expected);
  });
  it('yaml', () => {
    pathToFile1 = '__test__/__fixtures__/before.yaml';
    pathToFile2 = '__test__/__fixtures__/after.yaml';
    const actual = genDiff(pathToFile1, pathToFile2);
    expect(actual).toBe(expected);
  });
});
