all:
	make web.test

web.test:
	cd services/web && \
	npm ci && \
	npm test
