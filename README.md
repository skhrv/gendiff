# gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/8fbe69da3fca0e3ccc7e/maintainability)](https://codeclimate.com/github/skhrv/project-lvl2-s317/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8fbe69da3fca0e3ccc7e/test_coverage)](https://codeclimate.com/github/skhrv/project-lvl2-s317/test_coverage) [![Build Status](https://travis-ci.org/skhrv/project-lvl2-s317.svg?branch=master)](https://travis-ci.org/skhrv/project-lvl2-s317)

## Setup

clone git and make installation
```sh
$ make install
```
or install binaries from npm
```sh
$ npm install -g gendiff-skhrv1
```

## Usage

* program supports four input file types: `.yml` `.yaml` `.ini` `.json`
* `$ gendiff before.json after.json` get diff with default output
* `$ gendiff before.yml after.yml --format json` get full diff tree with JSON output
* `-f | --format [type]` formating output to tree, json or plain, default is tree
* `-h | --help` help page
* `-V | --version` program version

## Example

before.json
```json
{
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": "12345"
  }
}
```
after.json
```json
{
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": "100500"
  }
}
```
### Tree output
`$ gendiff before.json after.json`
```
{
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```
### Plain output
`$ gendiff before.json after.json -f plain`
```
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From complex value to 'str'
Property 'group2' was removed
Property 'group3' was added with complex value
```
### JSON output
`$ gendiff before.json after.json -f json`
```json
[
  {
    "key": "group1",
    "type": "branch",
    "children": [
      {
        "key": "baz",
        "type": "modified",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "modified",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "deleted",
    "value": {
      "abc": "12345"
    }
  },
  {
    "key": "group3",
    "type": "inserted",
    "value": {
      "fee": "100500"
    }
  }
]
```
