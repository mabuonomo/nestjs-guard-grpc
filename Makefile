docker = docker-compose run --service-ports --rm #-u 1000
project = node

include makefiles/style.mk
include makefiles/npm.mk