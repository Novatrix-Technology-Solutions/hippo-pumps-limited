FROM node:18-bullseye

# Install PHP and required extensions
RUN apt-get update && apt-get install -y \
    php-cli php-mbstring php-xml php-curl php-bcmath php-pgsql unzip curl git \
    && apt-get clean

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy and install PHP and Node deps
COPY . .

RUN composer install
RUN npm install

# Expose ports for Laravel and Vite
EXPOSE 8000 5173

# Run the concurrent dev setup
CMD ["npx", "concurrently", "-c", "#93c5fd,#c4b5fd,#fdba74", "php artisan serve --host=0.0.0.0 --port=8000", "php artisan queue:listen --tries=1", "npm run dev"]
