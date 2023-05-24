PACKAGE_MANAGER=npm
PACKAGE_MANAGER_RUN=npm run
BROWSER=open
HUSKY=npx husky install
COMPOSE=docker compose
COPY_ENV_SAMPLE=cat .env.sample 1> .env && echo "POSTGRES_HOST=\"localhost\"" 1>> .env && cat .env.sample 1> compose.env && echo "POSTGRES_HOST=\"postgres\"" 1>> compose.env
REMOVE_FOLDER_RECURSIVE=rm -rf
COMPILED_CODE_FOLDER=dist/
REMOVE_DIST_FOLDER=${REMOVE_FOLDER_RECURSIVE} ${COMPILED_CODE_FOLDER}
DATABASE_UP=${COMPOSE} up postgres migrate -d

# roda a aplicação completamente containerizada
up:
	${COMPOSE} up -d

# sobe o banco de dados e aplica as migracoes
db:
	${DATABASE_UP}

# derruba todos os container iniciados com o comando up
down:
	${COMPOSE} down

# aplica as migracoes no banco
migrate:
	${COMPOSE} up migrate -d

# cria o arquivo .env baseado no .env.sample
env:
	${COPY_ENV_SAMPLE}

## instala o husky e dependências do node
install:
	${HUSKY} && ${PACKAGE_MANAGER} install

## transpila o código para typescript
build:
	${PACKAGE_MANAGER_RUN} build

## roda todos os testes (lento, com logs, informações e detalhes)
test:
	${DATABASE_UP} && ${PACKAGE_MANAGER_RUN} test

## roda os testes de modo simplificado (mais rápido, sem logs, detalhes ou excessos de informações que poluem o terminal)
test-simple:
	${DATABASE_UP} && ${PACKAGE_MANAGER_RUN} test:simplified

## roda todos os testes unitários (localizados em ./tests/unit)
test-unit:
	${PACKAGE_MANAGER_RUN} test:unit

## roda todos os testes de integração (localizados em ./tests/integration)
test-int:
	${DATABASE_UP} && ${PACKAGE_MANAGER_RUN} test:integration

## roda teste de um arquivo específico
test-file:
	${PACKAGE_MANAGER_RUN} test -- tests/unit/test-case.test.ts

## abre a página do repositorio no github
open-repo:
	${BROWSER} "https://github.com/guimassoqueto/opah-test"

# builda e inicia a aplicação em javascript puro
start-js:
	make down && ${DATABASE_UP} && ${REMOVE_DIST_FOLDER} && ${PACKAGE_MANAGER_RUN} build && ${PACKAGE_MANAGER_RUN} start:server

# inicia a aplicação localmente sem transpilar
start-ts:
	make down && ${DATABASE_UP} && ${PACKAGE_MANAGER_RUN} start:ts