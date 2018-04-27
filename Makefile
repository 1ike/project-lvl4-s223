install:
	npm install

start:
	rm -rf dist/assets
	npm run nodemon -- --exec npm run babel-node -- server/bin/slack.js

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint src

publish:
	npm publish

srv: start

s:
	rm -rf dist/assets
	npm run babel-node -- server/bin/slack.js

b: build

bs:
	npm run build-server

bc:
	npm run build-app

.PHONY: test
