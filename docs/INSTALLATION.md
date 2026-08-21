# Installation Guide

## Prerequisites

- PHP 8.1+
- Composer 2+
- MySQL 8.0+
- Node.js 20+
- npm 9+

## Backend Setup

```bash
# Clone repository
git clone https://github.com/SaSoibal/onirban-foundation-.git
cd onirban-foundation-/backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=onirban_foundation
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=BloodGroupSeeder

# Start server
php artisan serve
```

## Frontend Setup

```bash
cd onirban-foundation-/frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## Running Tests

```bash
# Backend tests
cd backend
php artisan test

# Frontend tests
cd frontend
npm test
```
