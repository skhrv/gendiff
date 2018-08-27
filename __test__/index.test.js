import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  it('test 1', () => {
    const expected = fs.readFileSync('__test__/__fixtures__/expected.test1.txt', 'utf-8');
    const pathToFile1 = '__test__/__fixtures__/before.json';
    const pathToFile2 = '__test__/__fixtures__/after.json';
    const actual = genDiff(pathToFile1, pathToFile2);
    expect(actual).toBe(expected);
  });
});