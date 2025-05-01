# Base PHP image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev npm nodejs \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install JS dependencies and build assets
RUN npm install && npm run build

# Expose Laravel's default dev server port
EXPOSE 8080

# Copy Laravel .env (you can handle this via Railway ENV vars too)
# COPY .env.example .env

# Laravel startup commands
CMD php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache \
 && php artisan migrate --force \
 && php artisan serve --host=0.0.0.0 --port=8080
