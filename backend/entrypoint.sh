<?php
// Railway entrypoint - runs migrations on container start
echo "Running database migrations...\n";
passthru('php artisan migrate --force');

echo "Starting PHP-FPM and Nginx...\n";
passthru('php-fpm -D');
passthru('nginx -g "daemon off;"');
