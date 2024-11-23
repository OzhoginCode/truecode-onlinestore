install:
	npm ci

lint:
	npm run lint

lint-fix:
	npm run lint:fix

dev-server:
	npm run dev:server

build-server:
	npm run build:server

start-server:
	npm run start:server

start:
	docker-compose up --build