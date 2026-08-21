# Onirban Foundation

![PHP](https://img.shields.io/badge/PHP-8.1%2B-blue)
![Laravel](https://img.shields.io/badge/Laravel-10%2B-red)
![React](https://img.shields.io/badge/React-18%2B-cyan)
![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-orange)
![License](https://img.shields.io/badge/License-MIT-green)

**Full-stack NGO platform with blood donation module, role-based admin panel, and automated CI/CD.**

🌐 **Live Demo:** https://sasoibal.github.io/onirban-foundation-  
🔌 **API:** https://api.onirban-foundation.railway.app/api

---

## Features

- 🩸 **Blood Donation Module** - Donor registration, 3-month eligibility rule, verification workflow, emergency requests, donor directory with filters
- 👥 **Role-Based Admin Panel** - Super Admin, Admin, Editor, Viewer with 53 granular permissions (Spatie Permission)
- 📝 **13+ Editable Modules** - Pages, Programs, Gallery, Team, Events, Testimonials, Donors, Requests, Volunteers, Messages, Donations, Settings, Activity Logs
- 🔐 **Sanctum SPA Auth** - Token-based authentication for React frontend
- 📱 **Responsive Public Site** - Dynamic CMS pages, donor directory, emergency request form
- 🚀 **CI/CD Pipelines** - GitHub Actions for backend (tests + Railway deploy) and frontend (tests + GitHub Pages deploy)
- 🧪 **Test Coverage** - PHPUnit backend tests, Jest frontend tests

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Laravel 10+, Sanctum, Spatie Permission |
| Database | MySQL 8.0 |
| Deployment | Railway (backend), GitHub Pages (frontend) |
| CI/CD | GitHub Actions |

## Project Structure

```
onirban-foundation-/
├── backend/           # Laravel API
├── frontend/          # React SPA
├── docs/              # Documentation
├── .github/workflows/ # CI/CD pipelines
└── README.md
```

## Quick Start

### Prerequisites
- PHP 8.1+, Composer 2+, MySQL 8.0+
- Node.js 20+, npm 9+

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=RoleSeeder
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@onirban.org | password |

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Installation Guide](docs/INSTALLATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [CI/CD Guide](docs/CICD_GUIDE.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [RBAC Matrix](docs/RBAC_PERMISSIONS_MATRIX.md)

## Testing

```bash
# Backend
cd backend && php artisan test

# Frontend
cd frontend && npm test
```

## CI/CD

- Backend CI/CD: `.github/workflows/backend-ci-cd.yml`
- Frontend CI/CD: `.github/workflows/frontend-ci-cd.yml`
- PR Validation: `.github/workflows/pr-validation.yml`
- Security Scan: `.github/workflows/security-scan.yml`
- Database Backup: `.github/workflows/db-backup.yml`

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/SaSoibal/onirban-foundation-/issues) tab.

---

Built with ❤️ by the Onirban Foundation team
