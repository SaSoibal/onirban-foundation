# Onirban Foundation — Master Requirements

## 1. Project Overview

**Name:** Onirban Foundation  
**Purpose:** Full-stack CMS + Blood Donation platform for an NGO  
**Frontend:** React (hosted on GitHub Pages)  
**Backend:** Laravel 10+ (hosted on Railway/Render)  
**Database:** MySQL 8+  
**Auth:** Laravel Sanctum (SPA token-based)  
**RBAC:** spatie/laravel-permission  
**Frontend URL:** https://sasoibal.github.io/onirban-foundation-/  
**API Base URL:** https://api.onirban-foundation.railway.app/api  
**GitHub Repo:** https://github.com/SaSoibal/onirban-foundation-.git  

## 2. Core Functional Modules (13+)

| # | Module | Description |
|---|--------|-------------|
| 1 | **Pages** | Editable CMS pages (Home, About, Contact, etc.) |
| 2 | **Programs** | NGO programs/projects with details, images, status |
| 3 | **Gallery** | Photo gallery with albums/categories |
| 4 | **Team** | Team members with roles, photos, bios |
| 5 | **Events** | Upcoming/past events with registration |
| 6 | **Testimonials** | Beneficiary stories with photos |
| 7 | **Blood Donors** | Donor profiles with verification workflow, privacy controls |
| 8 | **Blood Requests** | Emergency blood requests with donor matching |
| 9 | **Volunteers** | Volunteer registration and management |
| 10 | **Contact Messages** | Public contact form submissions |
| 11 | **Donations** | Online donation records and tracking |
| 12 | **Site Settings** | Global site configuration (logo, colors, SEO, social links) |
| 13 | **Activity Logs** | Audit trail for all admin actions |
| 14 | **Users & Roles** | Admin user management with RBAC |
| 15 | **Media Library** | Centralized file/image management |

## 3. Feature Requirements

### 3.1 Public Frontend
- Responsive design (mobile-first)
- Dynamic pages rendered from CMS
- Blood donor directory with filters (blood group, district, search)
- Emergency blood request form (public)
- Volunteer registration form
- Donation page (payment gateway ready)
- Event listing and details
- Gallery with lightbox
- Testimonials carousel
- Contact form
- SEO meta tags per page

### 3.2 Blood Donation Module
- Donor self-registration (name, phone, blood group, district, last donation date, photo, NID)
- Admin verification workflow (pending → verified / rejected)
- 3-month eligibility rule (auto-calculated based on `last_donation_date`)
- Donor privacy settings (show/hide phone, show/hide district)
- Emergency request form (blood group, units needed, hospital, deadline, contact)
- Donor matching notification system
- Donor directory public view with filters

### 3.3 Admin Panel
- Role-based access (Super Admin, Admin, Editor, Viewer)
- EVERY content entity fully editable via admin
- Dashboard with statistics
- CRUD for all 15 modules
- Image upload with preview and deletion
- Search, filter, sort on all list pages
- Bulk actions where applicable
- Activity logs showing who did what and when

### 3.4 Authentication & Security
- Sanctum SPA auth (Bearer token in Authorization header)
- CORS configured for GitHub Pages origin only
- Password hashing (bcrypt)
- Rate limiting on auth endpoints
- Form Request validation on all endpoints
- API Resources for consistent response structure
- Soft deletes where appropriate
- No SQL injection, XSS protection

### 3.5 SEO & Performance
- Meta titles, descriptions per page
- Open Graph tags
- Lazy loading for images
- API response caching headers
- Frontend code splitting

## 4. Constraints
- Frontend MUST be deployable to GitHub Pages
- Backend MUST NOT be on GitHub Pages (Railway/Render only)
- All admin content must be editable through API (no hardcoded content)
- CORS must whitelist exact GitHub Pages domain
- Sanctum tokens must have expiration and revocation
- Laravel queues for email notifications (blood request alerts)
- MySQL only (no SQLite in production)
- GitHub Actions must run MySQL service for backend tests
- All secrets stored in GitHub Secrets (no plaintext in code)

## 5. Success Criteria
- [ ] All 15 modules functional in both frontend and backend
- [ ] Blood donor verification workflow works end-to-end
- [ ] Admin can edit every piece of content
- [ ] Sanctum auth works from GitHub Pages domain
- [ ] GitHub Actions deploy frontend to gh-pages branch automatically
- [ ] Backend tests pass with MySQL service in CI
- [ ] Activity logs capture all admin mutations
- [ ] RBAC enforces correct module access per role
- [ ] Donor directory filters work (blood group, district, search)
- [ ] Emergency blood requests create notifications for matching donors
- [ ] Site settings control frontend appearance without code changes
