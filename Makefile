PACKAGE_MANAGER=npm
PACKAGE_MANAGER_RUN=npm run
BROWSER=firefox --url
HUSKY=npx husky install

## instala o husky e dependências do node
install:
	${HUSKY} && ${PACKAGE_MANAGER} install

## transpila o código para typescript
build:
	${PACKAGE_MANAGER_RUN} build

## roda todos os testes (lento, com logs, informações e detalhes)
test:
	${PACKAGE_MANAGER_RUN} test

## roda os testes de modo simplificado (mais rápido, sem logs, detalhes ou excessos de informações que poluem o terminal)
test-simple:
	${PACKAGE_MANAGER_RUN} test:simplified

## roda todos os testes unitários (localizados em ./tests/unit)
test-unit:
	${PACKAGE_MANAGER_RUN} test:unit

## roda todos os testes de integração (localizados em ./tests/integration)
test-int:
	${PACKAGE_MANAGER_RUN} test:integration

## roda teste de um arquivo específico
test-file:
	${PACKAGE_MANAGER_RUN} test -- tests/unit/test-case.test.ts

## abre a página do repositorio no github
open-repo:
	${BROWSER} "https://github.com/guimassoqueto/scraper-puppeteer"
