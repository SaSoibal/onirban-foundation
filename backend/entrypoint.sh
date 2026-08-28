#!/bin/bash
# Railway entrypoint - runs migrations on container start
echo "Running database migrations..."
php artisan migrate --force

echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g "daemon off;"
