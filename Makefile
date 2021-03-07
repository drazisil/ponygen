all:
	make web.test

web.test:
	cd services/web && \
	npm ci && \
	npm test

web.start: web.test
	cd services/web && \
	npm start	
