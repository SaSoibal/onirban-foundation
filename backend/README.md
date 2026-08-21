# Onirban Foundation - Backend

Laravel 10+ API backend for the Onirban Foundation full-stack project.

## Features

- Laravel 10+ with Sanctum SPA authentication
- Spatie Laravel Permission for RBAC (53 permissions, 4 roles)
- MySQL database with 15+ tables
- API Resources for consistent response structure
- Form Requests for validation
- Activity logging for audit trail
- Blood donation module with 3-month eligibility logic
- Role-based admin panel controllers

## Requirements

- PHP 8.1+
- Composer 2+
- MySQL 8.0+
- Node.js 20+ (for frontend)

## Installation

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=onirban_foundation
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate

# Seed roles and permissions
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=BloodGroupSeeder
```

## Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=BloodDonorTest

# Run with coverage
php artisan test --coverage
```

## API Documentation

See `docs/API_SPEC.md` for complete API specification.

## License

MIT
