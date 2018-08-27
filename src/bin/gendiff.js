#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';
import { version, description } from '../../package.json';

commander
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
const [,, path1, path2] = process.argv;

// eslint-disable-next-line no-console
console.log(gendiff(path1, path2));
