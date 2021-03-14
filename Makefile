all:

clean: web.clean api.clean

docker: clean
	@docker-compose up --build

build: web.build api.build

install: web.install api.install

test: web.test api.test

release: web.release api.release

web.clean:
	rm -rf services/web/built

api.clean:
	rm -rf services/api/built

web.build: web.install
	@cd services/web && \
	npm run build

api.build: api.install
	@cd services/api && \
	npm run build


web.install:
	@cd services/web && \
	npm ci

api.install:
	@cd services/api && \
	npm ci

web.test: web.clean
	@cd services/web && \
	npm test

api.test: api.clean
	@cd services/api && \
	npm test

web.start: web.test
	@cd services/web && \
	npm start	

api.start: api.test
	@cd services/api && \
	npm start	

web.start.only:
	@cd services/web && \
	npm start	

api.start.only:
	@cd services/api && \
	npm start	

web.release:
	@cd services/web && \
	npm run release

api.release:
	@cd services/api && \
	npm run release

api.docker: api.build
	@cd services/api && \
	docker build -t drazisil:ponygen_api --no-cache=true .
