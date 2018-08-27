start:
	npm run babel-node -- src/bin/gendiff.js

install:
	npm install

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm run test