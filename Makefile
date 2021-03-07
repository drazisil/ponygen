all:

install: web.install pi.install

test: web.test pi.test

release: web.release pi.release

web.install:
	cd services/web && \
	npm ci

pi.install:
	cd services/pi && \
	npm ci

web.test:
	cd services/web && \
	npm test

pi.test:
	cd services/pi && \
	npm test

web.start: web.test
	cd services/web && \
	npm start	

pi.start: pi.test
	cd services/pi && \
	npm start	

web.release:
	cd services/web && \
	npm run release

pi.release:
	cd services/pi && \
	npm run release
