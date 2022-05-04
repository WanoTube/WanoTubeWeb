bootstrap:
	yarn
	cp .env.example .env
	yarn start

dev:
	yarn start

build:
	yarn build

analyze:
	yarn analyze

deploy-dev:
	@echo "Building project ..."
	npm run build
	cp captain-definition ./dist
	tar -cvf www.tar ./dist
	echo "=== Pls use private password ==="
	npx caprover deploy -t www.tar -a www -h https://captain.demo.o-redsky.xyz
	rm -rf dist && rm -rf www.tar
