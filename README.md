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
* Para executar a aplicação containerizada (ignore os passos 4, e 5): `make up`. Neste caso adicione a linha `POSTGRES_HOST="postgres"` no arquivo *compose.env*
4. `make install` para instalar as dependências do node
5. Escolha entre:  
-- `make start-ts` para executar a aplicação sem a necessidade de transpilar o código  
-- `make start-js` transpila para javascript e executa o app

### Rotas 
:heavy_check_mark:
```
POST /transactions/debit
Request body: {
  "amount": 50.00
}

Response: 201 Created
Response body: {
  "id": "05e53de0-8da0-4d2d-9b86-d30e37dfabd6",
  "amount": 50.00,
  "type": "D",
  "datetime": "2023-05-24T19:12:32.876Z"
}
```
:heavy_check_mark:
```
POST /transactions/credit
Request body: {
  "amount": 300.00
}

Response: 201 Created
Response body: {
  "id": "08c71152-c552-42e7-b094-f510ff44e9cb",
  "amount": 300.00,
  "type": "C"
  "datetime": "2023-05-24T19:12:56.519Z"
}
```
:bangbang:
```
GET /transactions/balance
Response: 200 Ok
Response body: {
  "balance": 250.00,
}
```
:bangbang:
```
GET /transactions/cashflow/{date}
Response 200 Ok
Response body: {
  "date": "31-12-2023", # formato dd-mm-yyyy
  "credits": [
    {
      "id": "08c71152-c552-42e7-b094-f510ff44e9cb",
      "amount": 300.00,
      "datetime": "2023-05-24T19:12:56.519Z"
    }
  ],
  "debits": [
    {
      "id": "05e53de0-8da0-4d2d-9b86-d30e37dfabd6",
      "amount": 50.00,
      "datetime": "2023-05-24T19:12:32.876Z"
    }
  ]
}
```

### Sobre os comandos make
Para execução de testes, migrações, transpilação, etc. leia os comentários no arquivo [Makefile](Makefile)
