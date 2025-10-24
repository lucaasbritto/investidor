CREATE DATABASE IF NOT EXISTS investidor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS investidor_testing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON investidor.* TO 'laravel'@'%';
GRANT ALL PRIVILEGES ON investidor_testing.* TO 'laravel'@'%';
FLUSH PRIVILEGES;