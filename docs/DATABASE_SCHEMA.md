# Onirban Foundation — Database Schema

## 1. users

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| email | varchar(255) | NO | unique | |
| email_verified_at | timestamp | YES | null | |
| password | varchar(255) | NO | | hashed |
| phone | varchar(20) | YES | null | |
| avatar | varchar(255) | YES | null | path to image |
| status | enum('active','inactive','banned') | NO | active | |
| last_login_at | timestamp | YES | null | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** email (unique), status

---

## 2. roles (spatie/laravel-permission)

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | e.g., super_admin, admin, editor, viewer |
| guard_name | varchar(255) | NO | api | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** name + guard_name (unique)

---

## 3. permissions (spatie/laravel-permission)

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | e.g., view_page, edit_page, delete_page |
| guard_name | varchar(255) | NO | api | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** name + guard_name (unique)

---

## 4. model_has_roles (spatie)

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| role_id | bigint unsigned | NO | FK → roles.id | |
| model_type | varchar(255) | NO | App\Models\User | |
| model_id | bigint unsigned | NO | FK → users.id | |

**Indexes:** model_id + model_type + role_id (unique)

---

## 5. model_has_permissions (spatie)

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| permission_id | bigint unsigned | NO | FK → permissions.id | |
| model_type | varchar(255) | NO | App\Models\User | |
| model_id | bigint unsigned | NO | FK → users.id | |

**Indexes:** model_id + model_type + permission_id (unique)

---

## 6. pages

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| slug | varchar(255) | NO | unique | URL slug |
| title | varchar(255) | NO | | Page title |
| content | longtext | YES | null | Rich HTML content |
| excerpt | varchar(500) | YES | null | Short summary |
| meta_title | varchar(255) | YES | null | SEO title |
| meta_description | varchar(500) | YES | null | SEO description |
| featured_image | varchar(255) | YES | null | path |
| status | enum('draft','published','archived') | NO | draft | |
| published_at | timestamp | YES | null | |
| created_by | bigint unsigned | NO | FK → users.id | |
| updated_by | bigint unsigned | YES | null | FK → users.id |
| deleted_at | timestamp | YES | null | soft delete |

**Indexes:** slug (unique), status, created_by

---

## 7. programs

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| title | varchar(255) | NO | | |
| slug | varchar(255) | NO | unique | |
| description | longtext | YES | null | |
| short_description | varchar(500) | YES | null | |
| image | varchar(255) | YES | null | |
| start_date | date | YES | null | |
| end_date | date | YES | null | |
| location | varchar(255) | YES | null | |
| status | enum('upcoming','ongoing','completed','cancelled') | NO | upcoming | |
| created_by | bigint unsigned | NO | FK → users.id | |
| updated_by | bigint unsigned | YES | null | FK → users.id |
| deleted_at | timestamp | YES | null | |

**Indexes:** slug (unique), status

---

## 8. gallery_categories

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| slug | varchar(255) | NO | unique | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** slug (unique)

---

## 9. gallery

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| category_id | bigint unsigned | NO | FK → gallery_categories.id | |
| title | varchar(255) | YES | null | |
| image | varchar(255) | NO | | |
| caption | varchar(500) | YES | null | |
| sort_order | int unsigned | NO | 0 | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** category_id, sort_order

---

## 10. team_members

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| designation | varchar(255) | NO | | |
| bio | text | YES | null | |
| photo | varchar(255) | YES | null | |
| email | varchar(255) | YES | null | |
| phone | varchar(20) | YES | null | |
| sort_order | int unsigned | NO | 0 | |
| status | enum('active','inactive') | NO | active | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** status, sort_order

---

## 11. events

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| title | varchar(255) | NO | | |
| slug | varchar(255) | NO | unique | |
| description | longtext | YES | null | |
| event_date | datetime | NO | | |
| end_date | datetime | YES | null | |
| location | varchar(255) | YES | null | |
| image | varchar(255) | YES | null | |
| registration_url | varchar(500) | YES | null | |
| status | enum('upcoming','ongoing','completed','cancelled') | NO | upcoming | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** slug (unique), status, event_date

---

## 12. testimonials

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| designation | varchar(255) | YES | null | |
| content | text | NO | | |
| photo | varchar(255) | YES | null | |
| rating | tinyint unsigned | YES | null | 1-5 |
| status | enum('pending','approved','rejected') | NO | pending | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** status, rating

---

## 13. blood_donors

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| user_id | bigint unsigned | YES | null | FK → users.id (if registered user) |
| name | varchar(255) | NO | | |
| phone | varchar(20) | NO | | |
| email | varchar(255) | YES | null | |
| blood_group | enum('A+','A-','B+','B-','AB+','AB-','O+','O-') | NO | | |
| district | varchar(100) | NO | | |
| last_donation_date | date | YES | null | |
| photo | varchar(255) | YES | null | donor photo |
| nid_number | varchar(50) | YES | null | National ID |
| is_verified | boolean | NO | false | admin verification flag |
| verified_by | bigint unsigned | YES | null | FK → users.id |
| verified_at | timestamp | YES | null | |
| show_phone | boolean | NO | true | privacy setting |
| show_district | boolean | NO | true | privacy setting |
| status | enum('active','inactive','suspended') | NO | active | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | soft delete |

**Indexes:** blood_group, district, is_verified, status, last_donation_date

---

## 14. blood_requests

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| requester_name | varchar(255) | NO | | |
| requester_phone | varchar(20) | NO | | |
| blood_group | enum('A+','A-','B+','B-','AB+','AB-','O+','O-') | NO | | |
| units_needed | tinyint unsigned | NO | | |
| hospital_name | varchar(255) | NO | | |
| hospital_address | text | YES | null | |
| deadline | datetime | YES | null | | urgency deadline |
| reason | text | YES | null | |
| status | enum('pending','active','fulfilled','cancelled','expired') | NO | pending | |
| assigned_donor_id | bigint unsigned | YES | null | FK → blood_donors.id |
| notes | text | YES | null | admin notes |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | soft delete |

**Indexes:** blood_group, status, deadline, requester_phone

---

## 15. volunteers

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| email | varchar(255) | NO | | |
| phone | varchar(20) | NO | | |
| address | text | YES | null | |
| occupation | varchar(255) | YES | null | |
| skills | text | YES | null | comma separated |
| availability | varchar(255) | YES | null | |
| motivation | text | YES | null | |
| status | enum('pending','approved','rejected','inactive') | NO | pending | |
| created_by | bigint unsigned | YES | null | FK → users.id |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** status, email

---

## 16. contact_messages

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| name | varchar(255) | NO | | |
| email | varchar(255) | NO | | |
| phone | varchar(20) | YES | null | |
| subject | varchar(255) | NO | | |
| message | text | NO | | |
| status | enum('new','read','replied','closed') | NO | new | |
| replied_at | timestamp | YES | null | |
| replied_by | bigint unsigned | YES | null | FK → users.id |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** status, created_at

---

## 17. donations

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| donor_name | varchar(255) | NO | | |
| email | varchar(255) | YES | null | |
| phone | varchar(20) | YES | null | |
| amount | decimal(12,2) unsigned | NO | | |
| currency | varchar(10) | NO | BDT | |
| payment_method | varchar(50) | YES | null | e.g., bKash, bank, card |
| transaction_id | varchar(100) | YES | null | |
| message | text | YES | null | |
| status | enum('pending','completed','failed','refunded') | NO | pending | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** status, transaction_id, email

---

## 18. site_settings

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| `key` | varchar(255) | NO | unique | setting key |
| `value` | longtext | YES | null | setting value |
| type | enum('text','textarea','image','color','url','number','json') | NO | text | |
| `group` | enum('general','seo','social','contact','donation','header','footer') | NO | general | |
| label | varchar(255) | YES | null | human-readable label |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** key (unique), group

**Sample keys:** site_name, site_tagline, logo, favicon, primary_color, facebook_url, twitter_url, contact_email, contact_phone, address, footer_text, donation_bank_name, donation_account_number

---

## 19. activity_logs

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| user_id | bigint unsigned | YES | null | FK → users.id |
| action | varchar(100) | NO | | e.g., created, updated, deleted, verified |
| subject_type | varchar(255) | NO | | e.g., App\Models\BloodDonor |
| subject_id | bigint unsigned | YES | null | |
| properties | json | YES | null | old/new values, snapshots |
| ip_address | varchar(45) | YES | null | |
| user_agent | text | YES | null | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** user_id, subject_type + subject_id, action, created_at

---

## 20. media

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| file_name | varchar(255) | NO | | original file name |
| file_path | varchar(500) | NO | | stored path / URL |
| file_type | enum('image','document','video','audio') | NO | image | |
| file_size | int unsigned | YES | null | bytes |
| mime_type | varchar(100) | YES | null | |
| collection | varchar(100) | YES | null | e.g., pages, gallery, team |
| sort_order | int unsigned | NO | 0 | |
| created_by | bigint unsigned | NO | FK → users.id | |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |
| deleted_at | timestamp | YES | null | |

**Indexes:** collection, file_type, created_by

---

## 21. personal_access_tokens (Sanctum)

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| id | bigint unsigned | NO | AI PK | |
| tokenable_type | varchar(255) | NO | | |
| tokenable_id | bigint unsigned | NO | | |
| name | varchar(255) | NO | | token name |
| token | varchar(64) | NO | unique | hashed token |
| abilities | text | YES | null | JSON array of abilities |
| last_used_at | timestamp | YES | null | |
| expires_at | timestamp | YES | null | optional expiration |
| created_at | timestamp | YES | null | |
| updated_at | timestamp | YES | null | |

**Indexes:** tokenable_type + tokenable_id + name, token (unique)

---

## Relationship Diagram (Textual)

```
users (1) ←→ (N) blood_donors (via user_id)
users (1) ←→ (N) pages (created_by / updated_by)
users (1) ←→ (N) programs
users (1) ←→ (N) gallery
users (1) ←→ (N) team_members
users (1) ←→ (N) events
users (1) ←→ (N) testimonials
users (1) ←→ (N) media
users (1) ←→ (N) activity_logs (via user_id)

users (N) ←→ (N) roles (via model_has_roles)
users (N) ←→ (N) permissions (via model_has_permissions)

gallery_categories (1) ←→ (N) gallery
blood_donors (1) ←→ (N) blood_requests (via assigned_donor_id)

blood_donors.verified_by → users.id
blood_requests.assigned_donor_id → blood_donors.id
contact_messages.replied_by → users.id
volunteers.created_by → users.id
```

---

## Migration Priority Order

1. users
2. spatie: roles, permissions, model_has_roles, model_has_permissions
3. personal_access_tokens (Sanctum)
4. site_settings
5. pages
6. programs
7. gallery_categories + gallery
8. team_members
9. events
10. testimonials
11. blood_donors
12. blood_requests
13. volunteers
14. contact_messages
15. donations
16. activity_logs
17. media
