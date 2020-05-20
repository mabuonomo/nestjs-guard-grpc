init:
	${docker} ${project} npm install

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

npm_update_last:
	${docker} ${project} ncu -u
	make init