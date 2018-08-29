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

const expectedFlatFilePath = pathToFixture('expectedFlat.txt');
const expectedRecursiveFilePath = pathToFixture('expectedRecursive.txt');

describe('flat data', () => {
  const expectedFlat = fs.readFileSync(expectedFlatFilePath, 'utf-8');
  const expectedRecursive = fs.readFileSync(expectedRecursiveFilePath, 'utf-8');
  it('json flat', () => {
    expect(genDiff(file1JSONflat, file2JSONflat)).toBe(expectedFlat);
  });
  it('yaml flat', () => {
    expect(genDiff(file1YAMLflat, file2YAMLflat)).toBe(expectedFlat);
  });
  it('ini flat', () => {
    expect(genDiff(file1INIflat, file2INIflat)).toBe(expectedFlat);
  });
  it('json recursive', () => {
    expect(genDiff(file1JSONrecursive, file2JSONrecursive)).toBe(expectedRecursive);
  });
  it('yaml recursive', () => {
    expect(genDiff(file1YAMLrecursive, file2YAMLrecursive)).toBe(expectedRecursive);
  });
  it('ini recursive', () => {
    expect(genDiff(file1INIrecursive, file2INIrecursive)).toBe(expectedRecursive);
  });
});
