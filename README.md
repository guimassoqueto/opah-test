## Opah Test

## Requisitos
* [Node 20+](https://nodejs.org/en)
* [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/)


## Como rodar a aplicação

### Para usuários Linux (Debian)
1. Instale o pacote buid-essential: `sudo apt-get install build-essential`
2. `make env` para gerar os arquivos *compose.env* e *.env*
* Para rodar a aplicação completamente containerizada (banco de dados + migrações + aplicacção node): `make up`
3. `make install` para instalar as dependências do node
4. Escolha entre:  
-- `make start-ts` para executar a aplicação sem a necessidade de transpilar o código  
-- `make start-js` transpila para javascript e executa o app

### Para usuários Windows
1. Instale o gerenciador [Gerenciador Chocolatey](https://chocolatey.org/install)
2. Instale o pacote make (para rodar comandos make): `choco install make`
3. Configure as varáveis de ambiente *.env* e *compose.env* a partir do *.env.sample*
* Para executar a aplicação containerizada (ignore os passos 3, 4, e 5): `make up`. Neste caso adicione a linha `POSTGRES_HOST="postgres"` no arquivo *compose.env*
4. `make install` para instalar as dependências do node
5. Escolha entre:  
-- `make start-ts` para executar a aplicação sem a necessidade de transpilar o código  
-- `make start-js` transpila para javascript e executa o app

### Sobre os comandos make
Para execução de testes, migrações, transpilação, etc. leia os comentários no arquivo [Makefile](Makefile)