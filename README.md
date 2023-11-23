# Daily Diet API 🍲

API desenvolvida como base para uma aplicação de registro de refeições. O usuário pode se registrar e
realizar login na aplicação. Uma vez _logado_ o usuário é capaz de acessar, adicionar, editar e deletar suas próprias refeições. Além disso é possível obter métricas a respeito de registro.

## Conceitos utilizados no projeto 💭:

- Arquitetura Hexagonal
- Ports & Adapters
- Typescript
- Fastify
- Query Builder (Knex)
- Environment Managment

## Regras da aplicação 🎯

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:

  _As refeições devem ser relacionadas a um usuário._

  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Instalação

```bash

# clone o projeto
https://github.com/Wendller/dailyDietAPI.git

# acesse a pasta e instale as dependencias
npm install

# levante o banco de dados e execute as migracoes
npx run knex --migrate:latest

# adicione as variaveis de ambiente no arquivo .env
# inicie o servidor
npm run dev
```

#### \*Importe o arquivo _dailydietroutes.json_ no [insômnia](https://insomnia.rest/) para acessar as rotas
