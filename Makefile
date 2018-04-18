install:
	npm install

start:
	npm run nodemon -- --exec npm run babel-node -- server/bin/slack.js

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint

publish:
	npm publish

srv: start

s:
	npm run babel-node -- server/bin/slack.js

b: build

bs:
	npm run build-server

bc:
	npm run build-app

.PHONY: test
