# Onirban Foundation — File Manifest & Milestone Breakdown

## 1. Complete Folder Structure

### 1.1 Root Level
```
onirban-foundation-/
├── backend/
├── frontend/
├── docs/
│   ├── MASTER_REQUIREMENTS.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_SPEC.md
│   ├── RBAC_PERMISSIONS_MATRIX.md
│   ├── FRONTEND_ROUTES_AND_UI.md
│   ├── ADMIN_PANEL_MODULES.md
│   ├── CICD_AND_DEPLOYMENT.md
│   └── FILE_MANIFEST.md
├── .github/
│   └── workflows/
│       ├── frontend.yml
│       └── backend.yml
├── .gitignore
└── README.md
```

### 1.2 Backend Structure (`backend/`)

```
backend/
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Page.php
│   │   ├── Program.php
│   │   ├── GalleryCategory.php
│   │   ├── Gallery.php
│   │   ├── TeamMember.php
│   │   ├── Event.php
│   │   ├── Testimonial.php
│   │   ├── BloodDonor.php
│   │   ├── BloodRequest.php
│   │   ├── Volunteer.php
│   │   ├── ContactMessage.php
│   │   ├── Donation.php
│   │   ├── SiteSetting.php
│   │   ├── ActivityLog.php
│   │   └── Media.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PageController.php
│   │   │   │   ├── ProgramController.php
│   │   │   │   ├── GalleryCategoryController.php
│   │   │   │   ├── GalleryController.php
│   │   │   │   ├── TeamController.php
│   │   │   │   ├── EventController.php
│   │   │   │   ├── TestimonialController.php
│   │   │   │   ├── BloodDonorController.php
│   │   │   │   ├── BloodRequestController.php
│   │   │   │   ├── VolunteerController.php
│   │   │   │   ├── ContactController.php
│   │   │   │   ├── DonationController.php
│   │   │   │   ├── SettingController.php
│   │   │   │   ├── MediaController.php
│   │   │   │   └── DashboardController.php
│   │   │   └── Admin/
│   │   │       ├── DashboardController.php
│   │   │       ├── UserController.php
│   │   │       ├── RoleController.php
│   │   │       └── ActivityLogController.php
│   │   ├── Requests/
│   │   │   ├── Api/
│   │   │   │   ├── LoginRequest.php
│   │   │   │   ├── StorePageRequest.php
│   │   │   │   ├── UpdatePageRequest.php
│   │   │   │   ├── StoreProgramRequest.php
│   │   │   │   ├── UpdateProgramRequest.php
│   │   │   │   ├── StoreGalleryRequest.php
│   │   │   │   ├── StoreTeamRequest.php
│   │   │   │   ├── StoreEventRequest.php
│   │   │   │   ├── StoreTestimonialRequest.php
│   │   │   │   ├── RegisterDonorRequest.php
│   │   │   │   ├── UpdateDonorRequest.php
│   │   │   │   ├── VerifyDonorRequest.php
│   │   │   │   ├── StoreBloodRequestRequest.php
│   │   │   │   ├── UpdateBloodRequestRequest.php
│   │   │   │   ├── RegisterVolunteerRequest.php
│   │   │   │   ├── ContactMessageRequest.php
│   │   │   │   ├── StoreDonationRequest.php
│   │   │   │   ├── StoreMediaRequest.php
│   │   │   │   └── UpdateSettingRequest.php
│   │   │   └── Admin/
│   │   │       ├── StoreUserRequest.php
│   │   │       ├── UpdateUserRequest.php
│   │   │       ├── StoreRoleRequest.php
│   │   │       └── UpdateRoleRequest.php
│   │   ├── Resources/
│   │   │   ├── UserResource.php
│   │   │   ├── PageResource.php
│   │   │   ├── ProgramResource.php
│   │   │   ├── GalleryCategoryResource.php
│   │   │   ├── GalleryResource.php
│   │   │   ├── TeamMemberResource.php
│   │   │   ├── EventResource.php
│   │   │   ├── TestimonialResource.php
│   │   │   ├── BloodDonorResource.php
│   │   │   ├── BloodRequestResource.php
│   │   │   ├── VolunteerResource.php
│   │   │   ├── ContactMessageResource.php
│   │   │   ├── DonationResource.php
│   │   │   ├── SettingResource.php
│   │   │   ├── MediaResource.php
│   │   │   ├── ActivityLogResource.php
│   │   │   └── DashboardStatsResource.php
│   │   └── Middleware/
│   │       └── CheckPermission.php
│   ├── Policies/
│   │   ├── PagePolicy.php
│   │   ├── ProgramPolicy.php
│   │   ├── GalleryPolicy.php
│   │   ├── GalleryCategoryPolicy.php
│   │   ├── TeamMemberPolicy.php
│   │   ├── EventPolicy.php
│   │   ├── TestimonialPolicy.php
│   │   ├── BloodDonorPolicy.php
│   │   ├── BloodRequestPolicy.php
│   │   ├── VolunteerPolicy.php
│   │   ├── ContactMessagePolicy.php
│   │   ├── DonationPolicy.php
│   │   ├── SiteSettingPolicy.php
│   │   ├── ActivityLogPolicy.php
│   │   ├── UserPolicy.php
│   │   ├── RolePolicy.php
│   │   └── MediaPolicy.php
│   ├── Observers/
│   │   └── ActivityLogObserver.php
│   └── Providers/
│       ├── AuthServiceProvider.php
│       ├── RouteServiceProvider.php
│       └── AppServiceProvider.php
├── bootstrap/
├── config/
│   ├── cors.php
│   ├── sanctum.php
│   └── filesystems.php
├── database/
│   ├── migrations/
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2014_10_12_100000_create_password_resets_table.php
│   │   ├── 2024_01_01_000001_create_pages_table.php
│   │   ├── 2024_01_01_000002_create_programs_table.php
│   │   ├── 2024_01_01_000003_create_gallery_categories_table.php
│   │   ├── 2024_01_01_000004_create_gallery_table.php
│   │   ├── 2024_01_01_000005_create_team_members_table.php
│   │   ├── 2024_01_01_000006_create_events_table.php
│   │   ├── 2024_01_01_000007_create_testimonials_table.php
│   │   ├── 2024_01_01_000008_create_blood_donors_table.php
│   │   ├── 2024_01_01_000009_create_blood_requests_table.php
│   │   ├── 2024_01_01_000010_create_volunteers_table.php
│   │   ├── 2024_01_01_000011_create_contact_messages_table.php
│   │   ├── 2024_01_01_000012_create_donations_table.php
│   │   ├── 2024_01_01_000013_create_site_settings_table.php
│   │   ├── 2024_01_01_000014_create_activity_logs_table.php
│   │   ├── 2024_01_01_000015_create_media_table.php
│   │   └── (spatie migrations are vendor-provided)
│   ├── factories/
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── RolePermissionSeeder.php
│       └── AdminUserSeeder.php
├── public/
├── resources/
├── routes/
│   ├── api.php
│   └── web.php
├── storage/
├── tests/
│   ├── Feature/
│   │   ├── AuthTest.php
│   │   ├── PageTest.php
│   │   ├── ProgramTest.php
│   │   ├── GalleryTest.php
│   │   ├── TeamTest.php
│   │   ├── EventTest.php
│   │   ├── TestimonialTest.php
│   │   ├── BloodDonorTest.php
│   │   ├── BloodRequestTest.php
│   │   ├── VolunteerTest.php
│   │   ├── ContactMessageTest.php
│   │   ├── DonationTest.php
│   │   ├── SettingTest.php
│   │   └── DashboardTest.php
│   └── Unit/
│       └── EligibilityTest.php
├── composer.json
├── artisan
└── .env.example
```

### 1.3 Frontend Structure (`frontend/`)

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── 404.html
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   └── endpoints.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── PublicLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── shared/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── RichEditor.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── StatsCard.jsx
│   │   └── blood/
│   │       ├── DonorCard.jsx
│   │       ├── RequestCard.jsx
│   │       └── EligibilityBadge.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── SettingsContext.jsx
│   ├── hooks/
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   └── useSettings.js
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Programs.jsx
│   │   │   ├── ProgramDetail.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── BloodDonors.jsx
│   │   │   ├── BloodRequestForm.jsx
│   │   │   ├── VolunteerRegister.jsx
│   │   │   ├── Donate.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── PageBySlug.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Pages/
│   │       │   ├── PagesList.jsx
│   │       │   └── PageForm.jsx
│   │       ├── Programs/
│   │       │   ├── ProgramsList.jsx
│   │       │   └── ProgramForm.jsx
│   │       ├── Gallery/
│   │       │   ├── GalleryList.jsx
│   │       │   └── GalleryForm.jsx
│   │       ├── GalleryCategories/
│   │       │   ├── CategoriesList.jsx
│   │       │   └── CategoryForm.jsx
│   │       ├── Team/
│   │       │   ├── TeamList.jsx
│   │       │   └── TeamForm.jsx
│   │       ├── Events/
│   │       │   ├── EventsList.jsx
│   │       │   └── EventForm.jsx
│   │       ├── Testimonials/
│   │       │   ├── TestimonialsList.jsx
│   │       │   └── TestimonialForm.jsx
│   │       ├── BloodDonors/
│   │       │   ├── DonorsList.jsx
│   │       │   ├── DonorForm.jsx
│   │       │   └── DonorVerify.jsx
│   │       ├── BloodRequests/
│   │       │   ├── RequestsList.jsx
│   │       │   └── RequestForm.jsx
│   │       ├── Volunteers/
│   │       │   ├── VolunteersList.jsx
│   │       │   └── VolunteerForm.jsx
│   │       ├── ContactMessages/
│   │       │   ├── MessagesList.jsx
│   │       │   └── MessageDetail.jsx
│   │       ├── Donations/
│   │       │   ├── DonationsList.jsx
│   │       │   └── DonationForm.jsx
│   │       ├── Settings/
│   │       │   ├── GeneralSettings.jsx
│   │       │   ├── SeoSettings.jsx
│   │       │   └── SocialSettings.jsx
│   │       ├── ActivityLogs/
│   │       │   └── LogsList.jsx
│   │       ├── Users/
│   │       │   ├── UsersList.jsx
│   │       │   └── UserForm.jsx
│   │       ├── Roles/
│   │       │   ├── RolesList.jsx
│   │       │   └── RoleForm.jsx
│   │       └── Media/
│   │           └── MediaLibrary.jsx
│   ├── resources/
│   │   ├── styles/
│   │   │   ├── admin.css
│   │   │   └── public.css
│   │   └── images/
│   │       ├── empty-state.svg
│   │       └── loading.svg
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── tailwind.config.js (or equivalent)
```

---

## 2. Milestone Breakdown

### Milestone 1: Core Setup & Infrastructure
**Goal:** Initialize both apps, set up CI/CD, establish database and auth foundations.

| File | Purpose |
|------|---------|
| `backend/composer.json` | PHP dependencies (Laravel, Sanctum, Spatie Permission, etc.) |
| `backend/.env.example` | Environment template |
| `backend/config/cors.php` | CORS configuration for GitHub Pages |
| `backend/config/sanctum.php` | Sanctum configuration |
| `backend/routes/api.php` | API route definitions |
| `backend/routes/web.php` | Web routes (if any) |
| `frontend/package.json` | JS dependencies (React, React Router, Axios, etc.) |
| `frontend/vite.config.js` | Vite config with basename and proxy |
| `frontend/.env.example` | Frontend env template |
| `frontend/src/main.jsx` | App entry point |
| `frontend/src/App.jsx` | Root component with Router |
| `.github/workflows/frontend.yml` | Frontend CI/CD pipeline |
| `.github/workflows/backend.yml` | Backend CI/CD pipeline |

**Deliverables:**
- Both repos initialize and build successfully
- GitHub Actions workflows are active
- Database migrations can run

---

### Milestone 2: Database, Auth & RBAC
**Goal:** Complete database schema, Sanctum auth, Spatie permissions, activity logging.

| File | Purpose |
|------|---------|
| `backend/database/migrations/2014_10_12_000000_create_users_table.php` | Users table |
| `backend/database/migrations/2014_10_12_100000_create_password_resets_table.php` | Password resets |
| `backend/database/migrations/2024_01_01_000001_create_pages_table.php` | Pages |
| `backend/database/migrations/2024_01_01_000002_create_programs_table.php` | Programs |
| `backend/database/migrations/2024_01_01_000003_create_gallery_categories_table.php` | Gallery categories |
| `backend/database/migrations/2024_01_01_000004_create_gallery_table.php` | Gallery |
| `backend/database/migrations/2024_01_01_000005_create_team_members_table.php` | Team |
| `backend/database/migrations/2024_01_01_000006_create_events_table.php` | Events |
| `backend/database/migrations/2024_01_01_000007_create_testimonials_table.php` | Testimonials |
| `backend/database/migrations/2024_01_01_000008_create_blood_donors_table.php` | Blood donors |
| `backend/database/migrations/2024_01_01_000009_create_blood_requests_table.php` | Blood requests |
| `backend/database/migrations/2024_01_01_000010_create_volunteers_table.php` | Volunteers |
| `backend/database/migrations/2024_01_01_000011_create_contact_messages_table.php` | Contact |
| `backend/database/migrations/2024_01_01_000012_create_donations_table.php` | Donations |
| `backend/database/migrations/2024_01_01_000013_create_site_settings_table.php` | Settings |
| `backend/database/migrations/2024_01_01_000014_create_activity_logs_table.php` | Activity logs |
| `backend/database/migrations/2024_01_01_000015_create_media_table.php` | Media |
| `backend/database/seeders/DatabaseSeeder.php` | Master seeder |
| `backend/database/seeders/RolePermissionSeeder.php` | Roles and permissions |
| `backend/database/seeders/AdminUserSeeder.php` | Default admin user |
| `backend/app/Observers/ActivityLogObserver.php` | Auto-log model events |
| `backend/app/Http/Middleware/CheckPermission.php` | Permission middleware |
| `backend/app/Policies/*` | 17 policy classes |
| `backend/app/Providers/AuthServiceProvider.php` | Gate definitions |
| `backend/app/Http/Requests/Api/LoginRequest.php` | Login validation |
| `backend/app/Http/Controllers/Api/AuthController.php` | Login/logout/me |
| `frontend/src/api/axios.js` | Configured Axios instance |
| `frontend/src/contexts/AuthContext.jsx` | Auth state management |

**Deliverables:**
- All migrations run successfully
- Admin can log in with Sanctum
- Roles and permissions seed correctly
- Activity logs capture model events

---

### Milestone 3: Core Content Modules
**Goal:** Implement Pages, Programs, Gallery, Team, Events, Testimonials on both backend and frontend.

| Backend Files | Purpose |
|---------------|---------|
| `app/Models/Page.php` | Page model |
| `app/Http/Controllers/Api/PageController.php` | Page API |
| `app/Http/Requests/Api/StorePageRequest.php` | Page validation |
| `app/Http/Requests/Api/UpdatePageRequest.php` | Page validation |
| `app/Http/Resources/PageResource.php` | Page response format |
| `app/Models/Program.php` | Program model |
| `app/Http/Controllers/Api/ProgramController.php` | Program API |
| `app/Http/Requests/Api/StoreProgramRequest.php` | Program validation |
| `app/Http/Requests/Api/UpdateProgramRequest.php` | Program validation |
| `app/Http/Resources/ProgramResource.php` | Program response |
| `app/Models/GalleryCategory.php` | Gallery category model |
| `app/Http/Controllers/Api/GalleryCategoryController.php` | Category API |
| `app/Http/Requests/Api/StoreGalleryCategoryRequest.php` | Category validation |
| `app/Http/Resources/GalleryCategoryResource.php` | Category response |
| `app/Models/Gallery.php` | Gallery model |
| `app/Http/Controllers/Api/GalleryController.php` | Gallery API |
| `app/Http/Requests/Api/StoreGalleryRequest.php` | Gallery validation |
| `app/Http/Resources/GalleryResource.php` | Gallery response |
| `app/Models/TeamMember.php` | Team model |
| `app/Http/Controllers/Api/TeamController.php` | Team API |
| `app/Http/Requests/Api/StoreTeamRequest.php` | Team validation |
| `app/Http/Resources/TeamMemberResource.php` | Team response |
| `app/Models/Event.php` | Event model |
| `app/Http/Controllers/Api/EventController.php` | Event API |
| `app/Http/Requests/Api/StoreEventRequest.php` | Event validation |
| `app/Http/Resources/EventResource.php` | Event response |
| `app/Models/Testimonial.php` | Testimonial model |
| `app/Http/Controllers/Api/TestimonialController.php` | Testimonial API |
| `app/Http/Requests/Api/StoreTestimonialRequest.php` | Testimonial validation |
| `app/Http/Resources/TestimonialResource.php` | Testimonial response |

| Frontend Files | Purpose |
|----------------|---------|
| `src/components/layout/PublicLayout.jsx` | Public site layout |
| `src/components/layout/Header.jsx` | Public header with nav |
| `src/components/layout/Footer.jsx` | Public footer |
| `src/components/layout/AdminLayout.jsx` | Admin layout |
| `src/components/layout/Sidebar.jsx` | Admin sidebar |
| `src/components/shared/ProtectedRoute.jsx` | Permission guard |
| `src/pages/public/Home.jsx` | Homepage |
| `src/pages/public/About.jsx` | About page |
| `src/pages/public/Programs.jsx` | Programs list |
| `src/pages/public/ProgramDetail.jsx` | Program detail |
| `src/pages/public/Gallery.jsx` | Gallery |
| `src/pages/public/Team.jsx` | Team list |
| `src/pages/public/Events.jsx` | Events list |
| `src/pages/public/EventDetail.jsx` | Event detail |
| `src/pages/public/Testimonials.jsx` | Testimonials |
| `src/pages/admin/Pages/PagesList.jsx` | Admin pages CRUD |
| `src/pages/admin/Pages/PageForm.jsx` | Page form |
| `src/pages/admin/Programs/ProgramsList.jsx` | Admin programs CRUD |
| `src/pages/admin/Team/TeamList.jsx` | Admin team CRUD |
| `src/pages/admin/Events/EventsList.jsx` | Admin events CRUD |
| `src/pages/admin/Testimonials/TestimonialsList.jsx` | Admin testimonials CRUD |
| `src/components/shared/DataTable.jsx` | Reusable table |
| `src/components/shared/ImageUpload.jsx` | Image uploader |
| `src/components/shared/RichEditor.jsx` | WYSIWYG editor |

**Deliverables:**
- All 6 content modules fully CRUD in admin
- Public pages render dynamic CMS content
- Images upload and display correctly

---

### Milestone 4: Blood Donation Module
**Goal:** Complete donor management, verification, eligibility, emergency requests, matching.

| Backend Files | Purpose |
|---------------|---------|
| `app/Models/BloodDonor.php` | Donor model |
| `app/Http/Controllers/Api/BloodDonorController.php` | Donor API |
| `app/Http/Requests/Api/RegisterDonorRequest.php` | Registration validation |
| `app/Http/Requests/Api/UpdateDonorRequest.php` | Update validation |
| `app/Http/Requests/Api/VerifyDonorRequest.php` | Verification validation |
| `app/Http/Resources/BloodDonorResource.php` | Donor response |
| `app/Models/BloodRequest.php` | Request model |
| `app/Http/Controllers/Api/BloodRequestController.php` | Request API |
| `app/Http/Requests/Api/StoreBloodRequestRequest.php` | Request validation |
| `app/Http/Requests/Api/UpdateBloodRequestRequest.php` | Request validation |
| `app/Http/Resources/BloodRequestResource.php` | Request response |

| Frontend Files | Purpose |
|----------------|---------|
| `src/components/blood/DonorCard.jsx` | Donor card component |
| `src/components/blood/RequestCard.jsx` | Request card component |
| `src/components/blood/EligibilityBadge.jsx` | Eligibility indicator |
| `src/pages/public/BloodDonors.jsx` | Public donor directory |
| `src/pages/public/BloodRequestForm.jsx` | Emergency request form |
| `src/pages/admin/BloodDonors/DonorsList.jsx` | Admin donors list |
| `src/pages/admin/BloodDonors/DonorForm.jsx` | Donor form |
| `src/pages/admin/BloodDonors/DonorVerify.jsx` | Verification action |
| `src/pages/admin/BloodRequests/RequestsList.jsx` | Admin requests list |
| `src/pages/admin/BloodRequests/RequestForm.jsx` | Request form |

**Deliverables:**
- Public can register as donor
- Admin can verify/reject donors
- 3-month eligibility calculation works
- Public can submit emergency blood requests
- Admin can view, filter, and assign donors to requests
- Privacy settings respected in public directory

---

### Milestone 5: Supporting Modules
**Goal:** Volunteers, Contact Messages, Donations, Site Settings.

| Backend Files | Purpose |
|---------------|---------|
| `app/Models/Volunteer.php` | Volunteer model |
| `app/Http/Controllers/Api/VolunteerController.php` | Volunteer API |
| `app/Http/Requests/Api/RegisterVolunteerRequest.php` | Volunteer validation |
| `app/Http/Resources/VolunteerResource.php` | Volunteer response |
| `app/Models/ContactMessage.php` | Contact model |
| `app/Http/Controllers/Api/ContactController.php` | Contact API |
| `app/Http/Requests/Api/ContactMessageRequest.php` | Contact validation |
| `app/Http/Resources/ContactMessageResource.php` | Contact response |
| `app/Models/Donation.php` | Donation model |
| `app/Http/Controllers/Api/DonationController.php` | Donation API |
| `app/Http/Requests/Api/StoreDonationRequest.php` | Donation validation |
| `app/Http/Resources/DonationResource.php` | Donation response |
| `app/Models/SiteSetting.php` | Setting model |
| `app/Http/Controllers/Api/SettingController.php` | Settings API |
| `app/Http/Requests/Api/UpdateSettingRequest.php` | Setting validation |
| `app/Http/Resources/SettingResource.php` | Setting response |

| Frontend Files | Purpose |
|----------------|---------|
| `src/pages/public/VolunteerRegister.jsx` | Volunteer form |
| `src/pages/public/Contact.jsx` | Contact form |
| `src/pages/public/Donate.jsx` | Donation form |
| `src/pages/admin/Volunteers/VolunteersList.jsx` | Volunteers CRUD |
| `src/pages/admin/ContactMessages/MessagesList.jsx` | Messages list |
| `src/pages/admin/ContactMessages/MessageDetail.jsx` | Message detail/reply |
| `src/pages/admin/Donations/DonationsList.jsx` | Donations list |
| `src/pages/admin/Settings/GeneralSettings.jsx` | General settings |
| `src/pages/admin/Settings/SeoSettings.jsx` | SEO settings |
| `src/pages/admin/Settings/SocialSettings.jsx` | Social settings |

**Deliverables:**
- All supporting modules functional
- Site settings control frontend appearance dynamically

---

### Milestone 6: Admin Panel Completion
**Goal:** Users, Roles, Media Library, Activity Logs, Dashboard.

| Backend Files | Purpose |
|---------------|---------|
| `app/Http/Controllers/Admin/DashboardController.php` | Stats API |
| `app/Http/Resources/DashboardStatsResource.php` | Stats response |
| `app/Http/Controllers/Admin/UserController.php` | User CRUD |
| `app/Http/Requests/Admin/StoreUserRequest.php` | User validation |
| `app/Http/Requests/Admin/UpdateUserRequest.php` | User validation |
| `app/Http/Controllers/Admin/RoleController.php` | Role CRUD |
| `app/Http/Requests/Admin/StoreRoleRequest.php` | Role validation |
| `app/Http/Requests/Admin/UpdateRoleRequest.php` | Role validation |
| `app/Http/Controllers/Admin/ActivityLogController.php` | Logs API |
| `app/Http/Resources/ActivityLogResource.php` | Log response |
| `app/Http/Controllers/Api/MediaController.php` | Media upload/list/delete |
| `app/Http/Requests/Api/StoreMediaRequest.php` | Media validation |
| `app/Http/Resources/MediaResource.php` | Media response |
| `app/Models/ActivityLog.php` | Activity log model |

| Frontend Files | Purpose |
|----------------|---------|
| `src/pages/admin/Dashboard.jsx` | Admin dashboard |
| `src/pages/admin/Users/UsersList.jsx` | Users list |
| `src/pages/admin/Users/UserForm.jsx` | User form |
| `src/pages/admin/Roles/RolesList.jsx` | Roles list |
| `src/pages/admin/Roles/RoleForm.jsx` | Role/permission form |
| `src/pages/admin/ActivityLogs/LogsList.jsx` | Audit trail |
| `src/pages/admin/Media/MediaLibrary.jsx` | Media manager |
| `src/components/shared/StatsCard.jsx` | Dashboard stat card |
| `src/components/shared/ActivityTimeline.jsx` | Activity feed |

**Deliverables:**
- Complete RBAC enforced in admin
- Dashboard shows real-time stats
- Activity logs capture all mutations
- Media library works for all uploads

---

### Milestone 7: Frontend Polish & Deployment
**Goal:** Public UI refinement, routing, GitHub Pages deployment, final testing.

| Files | Purpose |
|-------|---------|
| `frontend/src/contexts/SettingsContext.jsx` | Global site settings |
| `frontend/src/utils/helpers.js` | Date formatting, currency, eligibility calc |
| `frontend/src/utils/constants.js` | Blood groups, districts, enums |
| `frontend/src/utils/validators.js` | Client-side validators |
| `frontend/src/pages/public/PageBySlug.jsx` | Dynamic CMS page renderer |
| `frontend/src/components/shared/FilterBar.jsx` | Search/filter component |
| `frontend/src/components/shared/ConfirmDialog.jsx` | Delete confirmation |
| `frontend/src/resources/styles/public.css` | Public site styles |
| `frontend/src/resources/styles/admin.css` | Admin styles |
| `frontend/public/404.html` | GitHub Pages fallback |
| `frontend/tailwind.config.js` | Tailwind config (if using) |

**Deliverables:**
- All public pages responsive and styled
- GitHub Pages deploys successfully
- CORS verified from frontend to backend
- All forms have client-side validation
- SEO meta tags render correctly

---

## 3. Dependency Lists

### 3.1 Backend (`composer.json` require)
| Package | Purpose |
|---------|---------|
| `laravel/framework` | Core framework |
| `laravel/sanctum` | SPA authentication |
| `spatie/laravel-permission` | RBAC |
| `tymon/jwt-auth` | (Alternative to Sanctum, not needed if using Sanctum) |
| ` Intervention/image` | Image manipulation |
| `laravel/horizon` | Queue monitoring (optional) |
| `guzzlehttp/guzzle` | HTTP client |

### 3.2 Frontend (`package.json` dependencies)
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-dom` | React DOM |
| `react-router-dom` | Routing |
| `axios` | HTTP client |
| `react-hot-toast` | Notifications |
| `@tiptap/react` | Rich text editor |
| `react-dropzone` | File uploads |
| `react-image-crop` | Image cropping |
| `date-fns` | Date formatting |

---

## 4. Environment Variables Summary

### Backend (`.env`)
```
APP_NAME=Onirban Foundation
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.onirban-foundation.railway.app

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=onirban
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=database
SESSION_DRIVER=cookie
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=sasoibal.github.io
SESSION_DOMAIN=.sasoibal.github.io
```

### Frontend (`.env`)
```
VITE_API_BASE_URL=https://api.onirban-foundation.railway.app/api
VITE_APP_URL=https://sasoibal.github.io/onirban-foundation-
```

---

## 5. File Creation Priority

**Week 1:** Milestone 1 files + Milestone 2 migrations  
**Week 2:** Milestone 2 Models + Controllers + Milestone 3 Content Modules  
**Week 3:** Milestone 3 Frontend + Milestone 4 Blood Donation  
**Week 4:** Milestone 4 Frontend + Milestone 5 Supporting Modules  
**Week 5:** Milestone 5 Frontend + Milestone 6 Admin Completion  
**Week 6:** Milestone 7 Frontend Polish + CI/CD finalization  
**Week 7:** Testing, bug fixes, deployment verification  

---

## 6. Lines of Code Estimate

| Layer | Files | Estimated LOC |
|-------|-------|---------------|
| Backend Migrations | 16 | ~1,200 |
| Backend Models | 15 | ~800 |
| Backend Controllers | 24 | ~4,500 |
| Backend Requests | 20 | ~2,000 |
| Backend Resources | 17 | ~1,800 |
| Backend Policies | 17 | ~1,700 |
| Backend Seeders | 3 | ~400 |
| Backend Routes | 2 | ~300 |
| Backend Tests | 14 | ~3,000 |
| Backend Total | ~128 | ~15,700 |
| Frontend Pages (Public) | 14 | ~4,200 |
| Frontend Pages (Admin) | 26 | ~8,500 |
| Frontend Components | 22 | ~3,800 |
| Frontend Contexts | 2 | ~400 |
| Frontend Utils | 3 | ~300 |
| Frontend Styles | 2 | ~1,500 |
| Frontend Total | ~69 | ~18,700 |
| **Grand Total** | **~197** | **~34,400** |
