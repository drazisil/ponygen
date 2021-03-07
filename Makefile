all:

test: web.test pi.test

release: web.release pi.release

web.test:
	cd services/web && \
	npm ci && \
	npm test

pi.test:
	cd services/pi && \
	npm ci && \
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
