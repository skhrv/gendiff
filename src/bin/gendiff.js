#!/usr/bin/env node
import commander from 'commander';

commander
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
