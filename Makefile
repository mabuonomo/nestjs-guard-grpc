docker = docker-compose run --service-ports --rm #-u 1000
project = node

init:
	${docker} ${project} npm install

format:
	${docker} ${project} npm run format
	${docker} ${project} npm run lint:fix

build:
	make format
	rm -R dist/
	./node_modules/.bin/tsc -p ./tsconfig.json

npm_publish:
	make build
	git add .
	git commit -m "publish"
	npm version patch
	npm publish