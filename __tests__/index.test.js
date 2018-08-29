import fs from 'fs';
import genDiff from '../src';

const pathToFixture = filename => `__tests__/__fixtures__/${filename}`;

const file1JSONflat = pathToFixture('before.json');
const file2JSONflat = pathToFixture('after.json');
const file1JSONrecursive = pathToFixture('beforeRecursive.json');
const file2JSONrecursive = pathToFixture('afterRecursive.json');

const file1YAMLflat = pathToFixture('before.yaml');
const file2YAMLflat = pathToFixture('after.yaml');
const file1YAMLrecursive = pathToFixture('beforeRecursive.yaml');
const file2YAMLrecursive = pathToFixture('afterRecursive.yaml');

const file1INIflat = pathToFixture('before.ini');
const file2INIflat = pathToFixture('after.ini');
const file1INIrecursive = pathToFixture('beforeRecursive.ini');
const file2INIrecursive = pathToFixture('afterRecursive.ini');

describe('flat data', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.test1.txt', 'utf-8');
  it('json', () => {
    expect(genDiff(file1JSONflat, file2JSONflat)).toBe(expected);
  });
  it('yaml', () => {
    expect(genDiff(file1YAMLflat, file2YAMLflat)).toBe(expected);
  });
  it('ini', () => {
    expect(genDiff(file1INIflat, file2INIflat)).toBe(expected);
  });
});
describe('recursive data', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.test2.txt', 'utf-8');
  it('json', () => {
    expect(genDiff(file1JSONrecursive, file2JSONrecursive)).toBe(expected);
  });
  it('yaml', () => {
    expect(genDiff(file1YAMLrecursive, file2YAMLrecursive)).toBe(expected);
  });
  it('ini', () => {
    expect(genDiff(file1INIrecursive, file2INIrecursive)).toBe(expected);
  });
});
