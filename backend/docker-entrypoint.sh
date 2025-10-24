set -e

echo "Iniciando instalação do projeto..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env criado a partir do .env.example"
fi

echo "Instalando dependências PHP..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Gerando chaves principais..."
php artisan key:generate --force
php artisan jwt:secret --force

if [ ! -f .env.testing ]; then
    cp .env.example .env.testing
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=investidor_testing/" .env.testing
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=laravel/" .env.testing
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=laravel/" .env.testing
    echo ".env.testing criado e configurado para banco de testes"

    echo "Gerando chaves de teste..."
    php artisan key:generate --force --env=testing
    php artisan jwt:secret --force --env=testing
fi


echo "⏳ Aguardando banco de dados..."
until php -r "new PDO('mysql:host=${DB_HOST};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');" 2>/dev/null; do
    sleep 2
done
echo "Banco disponível!"

echo "Rodando migrate/seed do banco principal..."
php artisan migrate --seed --force

echo "✅ Sistema instalado e pronto pra uso!"
php-fpm
