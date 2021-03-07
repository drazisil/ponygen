all:

test: web.test pi.test

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
