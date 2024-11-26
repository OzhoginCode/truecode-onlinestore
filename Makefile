install:
	npm ci

lint:
	npm run lint

lint-fix:
	npm run lint:fix

build:
	docker compose -f docker-compose.yml up --build

dev:
	docker compose up --build

drop-database:
	docker-compose down -v