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

2. **Copie o arquivo de ambiente para produção**
```bash
  cp backend/.env.example backend/.env
```

3. **Configure o nome do banco em .env**
```env
DB_DATABASE=investidor
```

4. **Suba os containers com Docker**
```shell
  docker-compose up --build -d
```

5. **Entre no container**
```shell
  docker exec -it laravel_app_investidor bash
```

6. **Gere a chave da aplicação**
```shell
  php artisan key:generate
```

7. **Gere a chave JWT**
```shell
  php artisan jwt:secret
```

8. **Rode as migrações e os seeders**
```shell
  php artisan migrate --seed
```

9. **Os Seeders criam**
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



## Rodando os Testes
- Foram criados **testes de feature**.
- Os testes usam o arquivo .env.testing
- Por segurança, o arquivo `.env.testing` **não está incluído no versionamento do Git** (ignorado via `.gitignore`).
- Cada desenvolvedor deve criá-lo localmente na pasta raiz 'investidor' com o comando:


1. **Criando o .env.testing**
```bash
cp backend/.env.example backend/.env.testing
```

2. **Configure o nome do banco em .env.testing**
```env
DB_DATABASE=investidor_testing
```

3. **Acesse o container**
```bash
  docker exec -it laravel_app_investidor bash
```

4. **Gere a chave da aplicação para testes**
```bash
  php artisan key:generate --env=testing
```

5. **Gere a chave JWT para testes**
```bash
  php artisan jwt:secret --env=testing
```

6. **Execute o teste**
```bash
  php artisan test
```

## Variáveis obrigatórias no .env

```env
APP_NAME=Laravel
APP_KEY=           # Gerado via php artisan key:generate
DB_HOST=db
DB_PORT=3306
DB_DATABASE=investidor
DB_USERNAME=laravel
DB_PASSWORD=laravel
QUEUE_CONNECTION=database
JWT_SECRET=        # Gerado via php artisan jwt:secret
```
- (Essas informações do banco estão pre configuradas no Docker)



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
- Subir containers: `docker-compose up --build -d`
- Acessar o container: `docker exec -it laravel_app_investidor bash`
- Rodar seeders novamente: `php artisan migrate:fresh --seed`