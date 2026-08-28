FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libwebp-dev \
    libxpm-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring gd exif bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-progress

COPY . .

RUN composer dump-autoload --no-scripts --no-dev --optimize && \
    chown -R www-data:www-data /app/storage /app/bootstrap/cache

COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf

RUN printf '#!/bin/bash\necho "Running database migrations..."\nphp artisan migrate --force\n\necho "Starting PHP-FPM and Nginx..."\nphp-fpm -D\nnginx -g "daemon off;"\n' > /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

CMD ["/usr/local/bin/entrypoint.sh"]
