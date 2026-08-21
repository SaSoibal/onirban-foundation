# Onirban Foundation — Admin Panel Modules Specification

## 1. Pages

**Purpose:** Manage CMS pages (Home, About, Contact, etc.)  
**Table:** `pages`  
**Image Upload:** `featured_image` (image)  
**Search/Filter/Sort:** Search by title/slug, filter by status, sort by created_at, title

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | slug, title, content, excerpt, meta_title, meta_description, featured_image, status, published_at | slug required\|unique:pages,slug; title required\|max:255; status in:draft,published,archived | Super Admin, Admin, Editor |
| **Edit** | All fields optional | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List** | — | — | Super Admin, Admin, Editor, Viewer |
| **View** | — | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** List page with DataTable (title, slug, status, published_at, actions). Form page with slug auto-generation from title, WYSIWYG editor for content, image uploader with preview, status toggle, datetime picker for published_at.

---

## 2. Programs

**Purpose:** Manage NGO programs/projects  
**Table:** `programs`  
**Image Upload:** `image` (image)  
**Search/Filter/Sort:** Search by title, filter by status (upcoming/ongoing/completed), sort by start_date, title

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | title, slug, description, short_description, image, start_date, end_date, location, status | title required; slug required\|unique:programs,slug; status in:upcoming,ongoing,completed,cancelled | Super Admin, Admin, Editor |
| **Edit** | All fields optional | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | All roles |

**UI Pattern:** Card grid on frontend. Admin list with thumbnail, title, status badge, date range. Form with two textareas (short + long description), date pickers, location input, image upload.

---

## 3. Gallery Categories

**Purpose:** Organize gallery images into categories  
**Table:** `gallery_categories`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by name, sort by name, created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | name, slug | name required; slug required\|unique:gallery_categories,slug | Super Admin, Admin, Editor |
| **Edit** | name, slug | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | All roles |

**UI Pattern:** Simple list with name, slug, gallery count, actions. Modal or inline form.

---

## 4. Gallery

**Purpose:** Manage gallery images  
**Table:** `gallery`  
**Image Upload:** `image` (image)  
**Search/Filter/Sort:** Search by title/caption, filter by category_id, sort by sort_order, created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | category_id, title, image, caption, sort_order | category_id required\|exists:gallery_categories,id; image required (file) | Super Admin, Admin, Editor |
| **Edit** | category_id, title, image, caption, sort_order | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | All roles |

**UI Pattern:** Grid of images with category filter dropdown. Form with category select, drag-and-drop image upload, caption input, sort order number input.

---

## 5. Team Members

**Purpose:** Manage team/organization members  
**Table:** `team_members`  
**Image Upload:** `photo` (image)  
**Search/Filter/Sort:** Search by name/designation, filter by status, sort by sort_order, name

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | name, designation, bio, photo, email, phone, sort_order, status | name required; designation required | Super Admin, Admin, Editor |
| **Edit** | All fields optional | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | All roles |

**UI Pattern:** Grid of team cards with photo, name, designation. Form with photo uploader (square crop), bio textarea, email/phone inputs, sort order, status toggle.

---

## 6. Events

**Purpose:** Manage events with registration links  
**Table:** `events`  
**Image Upload:** `image` (image)  
**Search/Filter/Sort:** Search by title/location, filter by status, sort by event_date, title

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | title, slug, description, event_date, end_date, location, image, registration_url, status | title required; slug required\|unique:events,slug; event_date required\|date | Super Admin, Admin, Editor |
| **Edit** | All fields optional | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | All roles |

**UI Pattern:** List with date badges, status, location. Form with date-time pickers, image upload, registration URL input.

---

## 7. Testimonials

**Purpose:** Manage beneficiary stories with approval workflow  
**Table:** `testimonials`  
**Image Upload:** `photo` (image)  
**Search/Filter/Sort:** Search by name/content, filter by status, sort by rating, created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | name, designation, content, photo, rating | name required; content required\|min:10; rating in:1,2,3,4,5 | Super Admin, Admin, Editor |
| **Edit** | name, designation, content, photo, rating, status | Same as create | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **Approve** | status = approved | — | Super Admin, Admin, Editor |
| **Reject** | status = rejected | — | Super Admin, Admin, Editor |
| **List/View** | — | — | All roles |

**UI Pattern:** List with name, status badge (pending/approved/rejected), rating stars, actions. Approve/reject quick actions as buttons. Form with star rating selector, photo upload, content textarea.

---

## 8. Blood Donors

**Purpose:** Manage donor profiles, verification, privacy, and directory  
**Table:** `blood_donors`  
**Image Upload:** `photo` (image), `nid_number` (document optional)  
**Search/Filter/Sort:** Search by name/phone/email, filter by blood_group, district, is_verified, status, sort by last_donation_date, name

### 8.1 Donor Registration Form (Public + Admin)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | text | Yes | Full name |
| phone | text | Yes | 11-digit mobile |
| email | email | No | Optional contact |
| blood_group | select | Yes | A+, A-, B+, B-, AB+, AB-, O+, O- |
| district | select | Yes | Bangladesh districts |
| last_donation_date | date | No | Eligibility calculation |
| photo | image | No | Donor photo |
| nid_number | text | No | National ID for verification |
| show_phone | checkbox | Yes | Privacy: show phone in directory |
| show_district | checkbox | Yes | Privacy: show district in directory |

**Validation:** phone required\|size:11; blood_group required\|in:enum; district required

### 8.2 Verification Workflow
| Step | Action | Who | Result |
|------|--------|-----|--------|
| 1 | Donor registers | Public | `status=active`, `is_verified=false` |
| 2 | Admin reviews profile | Admin | Checks photo, NID, blood group |
| 3 | Admin clicks Verify | Admin with `verify_donor` | `is_verified=true`, `verified_by=<admin_id>`, `verified_at=now` |
| 4 | Admin clicks Reject | Admin with `verify_donor` | `is_verified=false`, `status=suspended` (optional) |

**UI Pattern:** List with blood group badges, verification status badge (verified/pending), district, last donation date with eligibility indicator. Verify button opens confirm dialog. Detail view shows full info with privacy indicators.

### 8.3 Donor Eligibility (3-Month Rule)
- Eligibility query: `last_donation_date IS NULL OR last_donation_date + INTERVAL 3 MONTH <= CURDATE()`
- Display: Green "Eligible" or Red "Not eligible until <date>" badge on donor cards
- Admin can override by editing `last_donation_date`

### 8.4 Privacy Controls
- If `show_phone=false`: phone hidden in public directory, visible only to admin
- If `show_district=false`: district shows as "Hidden" in public directory
- Privacy settings editable by donor (via profile update API) or admin

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Public Register** | name, phone, blood_group, district, last_donation_date, photo, nid_number, show_phone, show_district | phone required\|size:11; blood_group required | Public |
| **Edit** | All donor fields | Same as register | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **Verify** | is_verified, notes | — | Super Admin, Admin, Editor |
| **List** | Filter by blood_group, district, is_verified, search | — | All roles (public sees only verified active donors) |
| **View** | — | — | All roles (public sees only verified active donors) |

---

## 9. Blood Requests

**Purpose:** Manage emergency blood requests and donor matching  
**Table:** `blood_requests`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by requester_name/hospital, filter by blood_group, status, sort by deadline, created_at

### 9.1 Emergency Request Form (Public)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| requester_name | text | Yes | Requester full name |
| requester_phone | text | Yes | Contact phone |
| blood_group | select | Yes | Needed blood group |
| units_needed | number | Yes | Minimum 1 |
| hospital_name | text | Yes | Hospital/clinic name |
| hospital_address | textarea | No | Full address |
| deadline | datetime | No | Urgency deadline |
| reason | textarea | No | Medical reason |

**Validation:** requester_name required; requester_phone required; blood_group required in enum; units_needed required\|integer\|min:1

### 9.2 Request Lifecycle
| Status | Meaning | Who sets |
|--------|---------|----------|
| pending | Newly created, awaiting action | System / Public |
| active | Approved and broadcasting to donors | Admin |
| fulfilled | Donor found and blood collected | Admin |
| cancelled | Request cancelled by requester/admin | Admin / Public |
| expired | Deadline passed without fulfillment | System (cron) |

### 9.3 Donor Matching
- When request is `active`, system finds all eligible donors with matching `blood_group`
- Notification sent (email/SMS) to matching donors
- Admin assigns specific donor via `assign_donor_id`
- Assigned donor receives confirmation

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Public Create** | requester_name, requester_phone, blood_group, units_needed, hospital_name, hospital_address, deadline, reason | See above | Public |
| **Edit** | status, assigned_donor_id, notes | status in enum | Super Admin, Admin |
| **Delete** | — | — | Super Admin, Admin |
| **Assign Donor** | assigned_donor_id | assigned_donor_id exists in blood_donors | Super Admin, Admin, Editor |
| **List** | Filter by blood_group, status, search | — | Super Admin, Admin, Editor, Viewer |
| **View** | — | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** Kanban or list view with status tabs. Public form is simple single-page form. Admin detail shows requester info, status timeline, matching donors list, assign button.

---

## 10. Volunteers

**Purpose:** Manage volunteer registrations  
**Table:** `volunteers`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by name/email, filter by status, sort by created_at, name

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Public Register** | name, email, phone, address, occupation, skills, availability, motivation | name required; email required\|email; phone required | Public |
| **Edit** | All fields + status | Same as register | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** List with name, email, status badge, skills chips. Form with multi-select for skills, textarea for motivation.

---

## 11. Contact Messages

**Purpose:** Manage public contact form submissions  
**Table:** `contact_messages`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by name/email/subject, filter by status, sort by created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Public Create** | name, email, phone, subject, message | name required; email required\|email; subject required; message required\|min:10 | Public |
| **Edit** | status, replied_at, replied_by | status in:new,read,replied,closed | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** List with subject, name, status badge, created_at. Detail view shows full message with reply form (marks as replied).

---

## 12. Donations

**Purpose:** Track online donations  
**Table:** `donations`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by donor_name/email/transaction_id, filter by status, payment_method, sort by amount, created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Public Create** | donor_name, email, phone, amount, currency, payment_method, transaction_id, message | donor_name required; amount required\|numeric\|min:1 | Public |
| **Edit** | status, notes | status in:pending,completed,failed,refunded | Super Admin, Admin |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | — | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** List with donor name, amount (formatted), status badge, payment method. Public form is simple donation form with amount presets.

---

## 13. Site Settings

**Purpose:** Global site configuration without code changes  
**Table:** `site_settings`  
**Image Upload:** `value` field (when type=image, value stores file path)  
**Search/Filter/Sort:** Filter by group, search by key, sort by group, key

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | key, value, type, group, label | key required\|unique:site_settings,key; type in:text,textarea,image,color,url,number,json; group in:enum | Super Admin, Admin |
| **Edit** | value (or all fields) | key required if changing | Super Admin, Admin |
| **Delete** | — | — | Super Admin, Admin |
| **List/View** | Grouped by group | — | Super Admin, Admin |

**UI Pattern:** Grouped settings form (General, SEO, Social, Contact, Donation, Header, Footer). Each setting rendered based on `type` (color picker, text input, textarea, image uploader, URL input, JSON editor).

**Sample Settings Groups:**
- **General:** site_name, site_tagline, logo, favicon, timezone
- **SEO:** meta_title_template, meta_description_template, og_image
- **Social:** facebook_url, twitter_url, linkedin_url, instagram_url, youtube_url
- **Contact:** contact_email, contact_phone, address, map_embed_url
- **Donation:** donation_bank_name, donation_account_number, donation_swift, bkash_number

---

## 14. Activity Logs

**Purpose:** Audit trail for all admin mutations  
**Table:** `activity_logs`  
**Image Upload:** None  
**Search/Filter/Sort:** Search by action/subject, filter by user_id, subject_type, action, sort by created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **List** | Filter by user_id, action, subject_type, date range | — | Super Admin, Admin |
| **View** | Full detail with properties JSON | — | Super Admin, Admin |

**UI Pattern:** Timeline-style list with user avatar, action verb, subject type + ID, timestamp, IP address. Filter sidebar with date range, user dropdown, action dropdown, subject type dropdown. Detail modal shows `properties` JSON diff (old vs new values).

---

## 15. Users & Roles

**Purpose:** Manage admin users and assign roles/permissions  
**Table:** `users`, `roles`, `permissions`, `model_has_roles`, `model_has_permissions`  
**Image Upload:** `avatar` (image)  
**Search/Filter/Sort:** Search by name/email, filter by status, role, sort by created_at, name

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create** | name, email, password, phone, avatar, status, roles (array) | name required; email required\|email\|unique:users,email; password required\|min:8 | Super Admin only |
| **Edit** | name, email, phone, avatar, status, roles (array) | email unique except self | Super Admin only |
| **Delete** | — | Cannot delete self | Super Admin only |
| **List/View** | — | — | Super Admin only |

**Role Management:**
| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Create Role** | name, permissions (array) | name required\|unique:roles,name | Super Admin only |
| **Edit Role** | name, permissions (array) | Same as create | Super Admin only |
| **Delete Role** | — | Cannot delete roles in use | Super Admin only |
| **List/View** | — | — | Super Admin only |

**UI Pattern:** User list with name, email, role badges, status, last login. User form with role multi-select, password field (optional on edit), avatar upload. Role form with permission checklist grouped by module.

---

## 16. Media Library

**Purpose:** Centralized file/image management  
**Table:** `media`  
**Image Upload:** `file` (any file type, primarily images)  
**Search/Filter/Sort:** Search by file_name, filter by collection, file_type, sort by created_at

| Operation | Fields | Validation | Access |
|-----------|--------|-----------|--------|
| **Upload** | file, collection, sort_order | file required\|mimes:jpg,png,pdf,doc,mp4; collection in:pages,gallery,team,events,general | Super Admin, Admin, Editor |
| **Delete** | — | — | Super Admin, Admin |
| **List** | Filter by collection, file_type | — | Super Admin, Admin, Editor, Viewer |

**UI Pattern:** Grid of file thumbnails with name, type, size, collection tag. Upload button opens drag-and-drop zone. Click thumbnail to copy URL. Delete with confirmation.

---

## 17. Admin Dashboard

**Purpose:** Overview statistics and quick actions  
**Endpoint:** `GET /admin/dashboard/stats`

| Stat Card | Data Source | Calculation |
|-----------|-------------|-------------|
| Total Donors | blood_donors | COUNT |
| Verified Donors | blood_donors | WHERE is_verified=true |
| Active Blood Requests | blood_requests | WHERE status=active |
| Pending Volunteers | volunteers | WHERE status=pending |
| Unread Messages | contact_messages | WHERE status=new |
| Total Donations | donations | SUM(amount) WHERE status=completed |
| Recent Activity | activity_logs | Last 10 entries |

**UI Pattern:** Grid of stat cards with trend indicators. Recent activity timeline sidebar. Quick action buttons (Add Program, Verify Donor, Reply Message).

---

## 18. Shared Admin Patterns

| Pattern | Implementation |
|---------|---------------|
| **Image Upload** | Drag-and-drop zone, preview thumbnail, delete button, stores path in DB |
| **Rich Text Editor** | TipTap or CKEditor 5 for content fields |
| **Status Toggle** | Switch component, updates `status` field |
| **Bulk Actions** | Select rows in DataTable, actions: delete, change status, export |
| **Search** | Debounced input, filters DataTable rows client-side or API query |
| **Pagination** | Server-side pagination with per-page selector (10, 15, 25, 50) |
| **Sort** | Clickable column headers, persists in URL query params |
| **Soft Delete** | "Deleted" items go to trash, recoverable from Activity Logs or dedicated trash page |
| **Audit Trail** | Every create/update/delete triggers `activity_logs` entry via model observer |
| **Validation Errors** | Display server errors below each field, toast for global errors |
| **Loading States** | Skeleton loaders for tables, spinners for form submission |
| **Empty States** | Custom illustrations + text when list is empty |
| **Confirm Dialogs** | All destructive actions require confirmation modal |

---

## 19. Module Access Summary (Quick Reference)

| Module | Super Admin | Admin | Editor | Viewer |
|--------|-------------|-------|--------|--------|
| Dashboard | Full | Full | Read | Read |
| Pages | CRUD | CRUD | CRUD | Read |
| Programs | CRUD | CRUD | CRUD | Read |
| Gallery | CRUD | CRUD | CRUD | Read |
| Team | CRUD | CRUD | CRUD | Read |
| Events | CRUD | CRUD | CRUD | Read |
| Testimonials | CRUD | CRUD | CRUD | Read |
| Blood Donors | CRUD + Verify | CRUD + Verify | CRUD + Verify | Read |
| Blood Requests | Full | Full | Edit + Assign | Read |
| Volunteers | CRUD | CRUD | CRUD | Read |
| Contact Messages | CRUD | CRUD | Edit only | Read |
| Donations | CRUD | CRUD | Read | Read |
| Site Settings | Full | Full | None | None |
| Activity Logs | Read | Read | None | None |
| Users & Roles | Full | None | None | None |
| Media | Full | Full | Upload | Read |
