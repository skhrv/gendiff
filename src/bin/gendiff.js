#!/usr/bin/env node
import commander from 'commander';
import { version, description } from '../../package.json';

commander
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
