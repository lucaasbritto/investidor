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

8. **Rode as migrações**
```shell
  php artisan migrate
```


## Acessos
  - Front-end: http://localhost:5173
  - Back-end (API): http://localhost:8080/api