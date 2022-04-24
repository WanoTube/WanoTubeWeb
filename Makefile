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
	#cp .env .env.bk && echo "REACT_APP_ENV=dev\nAPI_URL=https://captain.demo.o-redsky.xyz" > .env
	npm run build
	cp captain-definition ./dist
	tar -cvf www.tar ./dist
	echo "=== Pls use private password ==="
	npx caprover deploy -t www.tar -a www -h https://captain.demo.o-redsky.xyz
	#mv .env.bk .env
	rm -rf dist && rm -rf www.tar
