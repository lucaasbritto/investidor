# Investidor — Sistema de Notícias

Aplicação completa para gerenciamento de notícias e categorias, com **CRUD**, **autenticação JWT**, **testes automatizados (TDD)** e execução via **Docker**.

## Tecnologias Utilizadas

- **Backend:** Laravel 11, JWT, PHPUnit  
- **Frontend:** Vue.js 3, Quasar, Vite, Pinia, Axios  
- **Infra:** Docker + Docker Compose, Nginx, MySQL


## Funcionalidades

- Login e logout com **JWT**
- CRUD completo de **notícias** e **categorias**
- **Paginação** e **filtros** por título e categoria
- Inserção, edição, visualização e exclusão
- Ambiente totalmente **containerizado** com Docker Compose


## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker instalado]
- [Docker Compose instalado]


## Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/lucaasbritto/investidor.git
cd investidor
```

2. **Suba os containers com Docker**
```shell
  docker-compose up --build
```

### Tudo será configurado automaticamente:
  - Dependências PHP instaladas
  - **.env** e **.env.testing** criados a partir do **.env.example**
  - Chaves Laravel e JWT geradas
  - **Migrations** e **Seeders** executados


3. **Os Seeders criam**
  - 1 usuario
  - 3 noticias
  - 3 categorias  

## Acessos
  - Front-end: http://localhost:5173
  - Back-end (API): http://localhost:8080/api


## Usuários para acesso do sistema (Criado Via Seeder)
| Tipo    | Email                            | Senha                      |
|---------|----------------------------------|----------------------------|
| Usuario | user@teste.com                   | 123456                     |



## Testes Automatizados
- O projeto inclui **testes de feature** para garantir que as funcionalidades principais do backend estejam funcionando corretamente.


1. **Testes implementados**
  - NewsServiceTest
    - Criação de notícia no banco
    - Atualização de notícia
    - Exclusão (soft delete) de notícia
    - Filtro por título
    - Retorno de notícias paginadas corretamente

  - Todos os testes usam o **banco de teste** (.env.testing) e não afetam os dados reais.

2. **Executando o teste:**
```shell
  docker exec -it laravel_app_investidor bash
  php artisan test
```

## Endpoints principais

| Método | Rota                         | Ação                                          |
|--------|------------------------------|-----------------------------------------------|
| POST   | /api/login                   | Login e geração de token JWT                  |
| POST   | /api/logout                  | Logout do sistema                             |
| GET    | /api/me                      | Retorna o usuário autenticado                 |
| GET    | /api/news/                   | Lista todos as noticias                       |
| POST   | /api/news                    | Cria uma nova noticia                         |
| PUT    | /api/news/{id}               | Atualiza uma noticia existente                |
| DELETE | /api/news/{id}               | Deleta uma noticia (soft delete)              |
| GET    | /api/categories              | Lista todas as categorias                     |
| POST   | /api/categories              | Cria uma nova categoria                       |
| PUT    | /api/categories/{id}         | Atualiza uma categoria existente              |
| DELETE | /api/categories/{id}         | Deleta uma categoria (soft delete)            |


##  Comandos úteis

- Parar containers: `docker-compose down`
- Subir containers: `docker-compose up --build`
- Acessar o container: `docker exec -it laravel_app_investidor bash`
- Rodar seeders novamente: `php artisan migrate:fresh --seed`