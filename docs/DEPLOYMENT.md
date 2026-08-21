# Deployment Guide

## Backend Deployment (Railway)

1. Create a Railway account at https://railway.app
2. Create a new project and add MySQL plugin
3. Connect your GitHub repository
4. Set the following environment variables:

```
APP_NAME=Onirban Foundation
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.onirban-foundation.railway.app

DB_CONNECTION=mysql
DB_HOST=<from Railway MySQL plugin>
DB_PORT=<from Railway MySQL plugin>
DB_DATABASE=<from Railway MySQL plugin>
DB_USERNAME=<from Railway MySQL plugin>
DB_PASSWORD=<from Railway MySQL plugin>

SANCTUM_STATEFUL_DOMAINS=sasoibal.github.io
SESSION_DOMAIN=.sasoibal.github.io
```

5. Railway will automatically deploy on push to main

## Frontend Deployment (GitHub Pages)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to `gh-pages` branch
4. GitHub Actions will automatically deploy on push to main

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- **Backend CI/CD**: Runs on every push to `backend/**` paths
  - Lint with Laravel Pint
  - Static analysis with PHPStan
  - Tests with PHPUnit (MySQL service in GitHub Actions)
  - Deploy to Railway on main branch

- **Frontend CI/CD**: Runs on every push to `frontend/**` paths
  - Lint with ESLint
  - Tests with Jest
  - Build with Vite
  - Deploy to GitHub Pages on main branch

- **PR Validation**: Runs on every pull request
- **Security Scan**: Weekly Trivy vulnerability scan
- **Database Backup**: Daily backup to S3 (optional)

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `RAILWAY_TOKEN` | Railway API token for deployment |
| `RAILWAY_PROJECT_ID` | Railway project ID |
| `RAILWAY_SERVICE_ID` | Railway service ID |
| `AWS_S3_BUCKET` | S3 bucket for database backups (optional) |
| `AWS_ACCESS_KEY_ID` | AWS access key (optional) |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key (optional) |
| `AWS_REGION` | AWS region (optional) |
