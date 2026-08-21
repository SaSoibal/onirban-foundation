# CI/CD Guide

## GitHub Actions Workflows

### 1. Backend CI/CD (`.github/workflows/backend-ci-cd.yml`)

**Triggers:**
- Push to `main` branch with changes in `backend/**`
- Pull requests to `main` branch with changes in `backend/**`

**Jobs:**
1. **lint** - Runs Laravel Pint for code style
2. **stan** - Runs PHPStan for static analysis
3. **test** - Runs PHPUnit tests with MySQL 8.0 service
4. **deploy** - Deploys to Railway (only on main branch)

### 2. Frontend CI/CD (`.github/workflows/frontend-ci-cd.yml`)

**Triggers:**
- Push to `main` branch with changes in `frontend/**`
- Pull requests to `main` branch with changes in `frontend/**`

**Jobs:**
1. **lint-and-test** - Runs ESLint, Jest tests, and Vite build
2. **deploy** - Deploys to GitHub Pages (only on main branch)

### 3. PR Validation (`.github/workflows/pr-validation.yml`)

**Triggers:**
- All pull requests to `main`

**Jobs:**
- Validates backend code style and static analysis
- Validates frontend lint and tests

### 4. Security Scan (`.github/workflows/security-scan.yml`)

**Triggers:**
- Push to `main`
- Pull requests to `main`
- Weekly schedule (Sundays)

**Jobs:**
- Runs Trivy vulnerability scanner
- Uploads results to GitHub Security tab

### 5. Database Backup (`.github/workflows/db-backup.yml`)

**Triggers:**
- Daily schedule (2 AM UTC)
- Manual trigger

**Jobs:**
- Creates MySQL dump
- Uploads to S3 (optional)

## Branch Protection

Enable branch protection on `main`:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators in restrictions

## Deployment Flow

```
Developer pushes to main
    ↓
GitHub Actions triggers
    ↓
Backend: lint → stan → test → deploy to Railway
Frontend: lint → test → build → deploy to GitHub Pages
    ↓
Live at https://api.onirban-foundation.railway.app
Live at https://sasoibal.github.io/onirban-foundation/
```
