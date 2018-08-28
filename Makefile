start:
	npx babel-node -- src/bin/gendiff.js

install:
	npm install

publish:
	npm publish

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm test -- --watch