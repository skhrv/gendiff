import fs from 'fs';
import genDiff from '../src';

const pathToFixture = filename => `__tests__/__fixtures__/${filename}`;

const typesFile = ['.json', '.yaml', '.ini'];

const filename1Flat = pathToFixture('before');
const filename2Flat = pathToFixture('after');
const filename1Recursive = pathToFixture('beforeRecursive');
const filename2Recursive = pathToFixture('afterRecursive');

const expectedFlatFilePath = pathToFixture('expectedFlat.txt');
const expectedRecursiveFilePath = pathToFixture('expectedRecursive.txt');
const expectedPlainFilePath = pathToFixture('expectedPlain.txt');

const iter = (file1, file2, type, option) => {
  const before = `${file1}${type}`;
  const after = `${file2}${type}`;
  return genDiff(before, after, option);
};

describe('flat data', () => {
  const expectedFlat = fs.readFileSync(expectedFlatFilePath, 'utf-8');
  const expectedRecursive = fs.readFileSync(expectedRecursiveFilePath, 'utf-8');
  const expectedPlain = fs.readFileSync(expectedPlainFilePath, 'utf-8');
  it('json flat', () => {
    expect(iter(filename1Flat, filename2Flat, typesFile[0])).toBe(expectedFlat);
  });
  it('yaml flat', () => {
    expect(iter(filename1Flat, filename2Flat, typesFile[1])).toBe(expectedFlat);
  });
  it('ini flat', () => {
    expect(iter(filename1Flat, filename2Flat, typesFile[2])).toBe(expectedFlat);
  });
  it('json recursive', () => {
    expect(iter(filename1Recursive, filename2Recursive, typesFile[0])).toBe(expectedRecursive);
  });
  it('yaml recursive', () => {
    expect(iter(filename1Recursive, filename2Recursive, typesFile[1])).toBe(expectedRecursive);
  });
  it('ini recursive', () => {
    expect(iter(filename1Recursive, filename2Recursive, typesFile[2])).toBe(expectedRecursive);
  });
  it('plain render', () => {
    expect(iter(filename1Recursive, filename2Recursive, typesFile[1], 'plain')).toBe(expectedPlain);
  });
});
