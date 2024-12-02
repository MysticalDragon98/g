current_dir := $(shell pwd)

default:
	npm run build
	chmod +x ./dist/index.js

install:
	ln -sf $(current_dir)/index.ts ~/home/bin/g
