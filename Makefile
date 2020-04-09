docker = docker-compose run --service-ports --rm #-u 1000
project = node

init:
	${docker} ${project} npm install

format:
	${docker} ${project} npm run format
	${docker} ${project} npm run lint:fix
