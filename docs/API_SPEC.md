# Onirban Foundation — API Specification

**Base URL:** `https://api.onirban-foundation.railway.app/api`  
**Auth:** Bearer token (Laravel Sanctum)  
**Content-Type:** `application/json`  
**Pagination:** Laravel default (cursor-based or page-based via `?page=1&per_page=15`)  
**Success Response Wrapper:** `{ "success": true, "data": ... }`  
**Error Response Wrapper:** `{ "success": false, "message": "...", "errors": { ... } }`

---

## 1. Authentication

### POST /auth/login
**Auth:** None  
**Request:**
```json
{
  "email": "admin@example.com",
  "password": "secret",
  "device_name": "web"
}
```
**Validation:** email required|email, password required|string|min:8  
**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "name": "Admin", "email": "admin@example.com", "roles": ["super_admin"] },
    "token": "1|abc123...",
    "token_type": "Bearer"
  }
}
```

### POST /auth/logout
**Auth:** Sanctum  
**Response:** `{ "success": true, "message": "Logged out" }`

### GET /auth/me
**Auth:** Sanctum  
**Response:** `{ "success": true, "data": { ...user with roles and permissions } }`

### POST /auth/refresh
**Auth:** Sanctum  
**Response:** `{ "success": true, "data": { "token": "..." } }`

---

## 2. Pages

### GET /pages
**Auth:** Public  
**Query:** `?status=published&page=1&per_page=15`  
**Response:** Paginated list of PageResource

### GET /pages/{slug}
**Auth:** Public  
**Response:** Single PageResource

### POST /pages
**Auth:** Sanctum + `create_page`  
**Request:**
```json
{
  "slug": "about-us",
  "title": "About Us",
  "content": "<p>HTML content</p>",
  "excerpt": "Short text",
  "meta_title": "About Onirban",
  "meta_description": "...",
  "featured_image": "path/to/image.jpg",
  "status": "published"
}
```
**Validation:** slug required|string|unique:pages,slug; title required|string|max:255; status in:draft,published,archived

### PUT /pages/{id}
**Auth:** Sanctum + `edit_page`  
**Request:** Same fields as POST, all optional except none strictly required

### DELETE /pages/{id}
**Auth:** Sanctum + `delete_page`  
**Response:** `{ "success": true, "message": "Page deleted" }`

---

## 3. Programs

### GET /programs
**Auth:** Public  
**Query:** `?status=ongoing&page=1&per_page=12`

### GET /programs/{slug}
**Auth:** Public

### POST /programs
**Auth:** Sanctum + `create_program`

### PUT /programs/{id}
**Auth:** Sanctum + `edit_program`

### DELETE /programs/{id}
**Auth:** Sanctum + `delete_program`

---

## 4. Gallery Categories

### GET /gallery/categories
**Auth:** Public

### GET /gallery/categories/{id}
**Auth:** Public

### POST /gallery/categories
**Auth:** Sanctum + `create_gallery_category`

### PUT /gallery/categories/{id}
**Auth:** Sanctum + `edit_gallery_category`

### DELETE /gallery/categories/{id}
**Auth:** Sanctum + `delete_gallery_category`

---

## 5. Gallery

### GET /gallery
**Auth:** Public  
**Query:** `?category_id=1&page=1&per_page=24`

### GET /gallery/{id}
**Auth:** Public

### POST /gallery
**Auth:** Sanctum + `create_gallery`  
**Request:** `category_id`, `title`, `image` (file or path), `caption`, `sort_order`

### PUT /gallery/{id}
**Auth:** Sanctum + `edit_gallery`

### DELETE /gallery/{id}
**Auth:** Sanctum + `delete_gallery`

---

## 6. Team Members

### GET /team
**Auth:** Public  
**Query:** `?status=active&sort=sort_order`

### GET /team/{id}
**Auth:** Public

### POST /team
**Auth:** Sanctum + `create_team`

### PUT /team/{id}
**Auth:** Sanctum + `edit_team`

### DELETE /team/{id}
**Auth:** Sanctum + `delete_team`

---

## 7. Events

### GET /events
**Auth:** Public  
**Query:** `?status=upcoming&page=1&per_page=12`

### GET /events/{slug}
**Auth:** Public

### POST /events
**Auth:** Sanctum + `create_event`

### PUT /events/{id}
**Auth:** Sanctum + `edit_event`

### DELETE /events/{id}
**Auth:** Sanctum + `delete_event`

---

## 8. Testimonials

### GET /testimonials
**Auth:** Public  
**Query:** `?status=approved&page=1&per_page=12`

### GET /testimonials/{id}
**Auth:** Public (only approved)

### POST /testimonials
**Auth:** Public (submit)  
**Request:** `name`, `designation`, `content`, `photo` (optional)

### PUT /testimonials/{id}
**Auth:** Sanctum + `edit_testimonial`

### DELETE /testimonials/{id}
**Auth:** Sanctum + `delete_testimonial`

### POST /testimonials/{id}/approve
**Auth:** Sanctum + `approve_testimonial`  
**Response:** `{ "success": true, "data": { "status": "approved" } }`

### POST /testimonials/{id}/reject
**Auth:** Sanctum + `reject_testimonial`

---

## 9. Blood Donors

### POST /blood-donors/register
**Auth:** Public  
**Request:**
```json
{
  "name": "John Doe",
  "phone": "01700000000",
  "email": "john@example.com",
  "blood_group": "O+",
  "district": "Dhaka",
  "last_donation_date": "2024-01-15",
  "photo": "file upload",
  "nid_number": "1234567890",
  "show_phone": true,
  "show_district": true
}
```
**Validation:** name required, phone required|string|size:11, blood_group in enum, district required, last_donation_date date|nullable, email email|nullable

### GET /blood-donors
**Auth:** Public  
**Query:** `?blood_group=O+&district=Dhaka&search=john&is_verified=true&page=1&per_page=15`

### GET /blood-donors/eligible
**Auth:** Public  
**Query:** `?blood_group=O+&district=Dhaka`  
**Response:** List of donors where `last_donation_date` is NULL or `last_donation_date` + 3 months <= today AND `is_verified` = true AND `status` = active

### GET /blood-donors/{id}
**Auth:** Public (respects privacy: omit phone/district if show flags false)

### PUT /blood-donors/{id}
**Auth:** Sanctum + `edit_donor`

### DELETE /blood-donors/{id}
**Auth:** Sanctum + `delete_donor`

### POST /blood-donors/{id}/verify
**Auth:** Sanctum + `verify_donor`  
**Request:** `{ "is_verified": true }`  
**Response:** Updates `is_verified`, `verified_by`, `verified_at`

### GET /blood-donors/stats
**Auth:** Sanctum + `view_donor`  
**Response:** `{ "total": 120, "verified": 85, "by_blood_group": { "O+": 30, ... } }`

---

## 10. Blood Requests

### POST /blood-requests
**Auth:** Public  
**Request:**
```json
{
  "requester_name": "Jane Doe",
  "requester_phone": "01800000000",
  "blood_group": "A+",
  "units_needed": 2,
  "hospital_name": "Square Hospital",
  "hospital_address": "Dhaka",
  "deadline": "2025-01-20T10:00:00",
  "reason": "Accident victim"
}
```
**Validation:** requester_name required, requester_phone required, blood_group required in enum, units_needed required|integer|min:1, hospital_name required, deadline datetime|nullable

### GET /blood-requests
**Auth:** Sanctum + `view_blood_request`  
**Query:** `?status=active&blood_group=A+&page=1&per_page=15`

### GET /blood-requests/{id}
**Auth:** Sanctum + `view_blood_request`

### PUT /blood-requests/{id}
**Auth:** Sanctum + `edit_blood_request`  
**Request:** Any of: status, assigned_donor_id, notes

### DELETE /blood-requests/{id}
**Auth:** Sanctum + `delete_blood_request`

### POST /blood-requests/{id}/assign
**Auth:** Sanctum + `assign_donor`  
**Request:** `{ "assigned_donor_id": 5 }`

---

## 11. Volunteers

### POST /volunteers/register
**Auth:** Public  
**Request:** name, email, phone, address, occupation, skills, availability, motivation

### GET /volunteers
**Auth:** Sanctum + `view_volunteer`

### PUT /volunteers/{id}
**Auth:** Sanctum + `edit_volunteer`

### DELETE /volunteers/{id}
**Auth:** Sanctum + `delete_volunteer`

---

## 12. Contact Messages

### POST /contact
**Auth:** Public  
**Request:** name, email, phone (optional), subject, message

### GET /contact-messages
**Auth:** Sanctum + `view_contact_message`

### PUT /contact-messages/{id}
**Auth:** Sanctum + `edit_contact_message`  
**Request:** status (new, read, replied, closed)

### DELETE /contact-messages/{id}
**Auth:** Sanctum + `delete_contact_message`

---

## 13. Donations

### POST /donations
**Auth:** Public  
**Request:** donor_name, email, phone, amount, currency (BDT), payment_method, transaction_id, message

### GET /donations
**Auth:** Sanctum + `view_donation`

### PUT /donations/{id}
**Auth:** Sanctum + `edit_donation`

### DELETE /donations/{id}
**Auth:** Sanctum + `delete_donation`

---

## 14. Site Settings

### GET /settings
**Auth:** Public  
**Query:** `?group=general` or omit for all  
**Response:** `{ "success": true, "data": { "site_name": "Onirban", "logo": "...", ... } }`

### GET /settings/{key}
**Auth:** Public

### PUT /settings/{key}
**Auth:** Sanctum + `edit_setting`  
**Request:** `{ "value": "new value" }` or multipart for image uploads

### POST /settings
**Auth:** Sanctum + `create_setting`  
**Request:** key, value, type, group, label

### DELETE /settings/{id}
**Auth:** Sanctum + `delete_setting`

---

## 15. Activity Logs

### GET /activity-logs
**Auth:** Sanctum + `view_activity_log`  
**Query:** `?user_id=1&action=created&subject_type=App\Models\BloodDonor&page=1&per_page=20`

### GET /activity-logs/{id}
**Auth:** Sanctum + `view_activity_log`

---

## 16. Users & Roles (Admin)

### GET /users
**Auth:** Sanctum + `view_user`

### POST /users
**Auth:** Sanctum + `create_user`  
**Request:** name, email, password, phone, roles (array of role names), status

### PUT /users/{id}
**Auth:** Sanctum + `edit_user`

### DELETE /users/{id}
**Auth:** Sanctum + `delete_user`

### GET /roles
**Auth:** Sanctum + `view_role`

### POST /roles
**Auth:** Sanctum + `create_role`  
**Request:** name, permissions (array of permission names)

### PUT /roles/{id}
**Auth:** Sanctum + `edit_role`

### DELETE /roles/{id}
**Auth:** Sanctum + `delete_role`

---

## 17. Media Library

### POST /media/upload
**Auth:** Sanctum + `upload_media`  
**Request:** multipart/form-data with `file`, `collection`, `sort_order`

### GET /media
**Auth:** Sanctum + `view_media`  
**Query:** `?collection=gallery&page=1&per_page=20`

### DELETE /media/{id}
**Auth:** Sanctum + `delete_media`

---

## 18. Dashboard Stats

### GET /dashboard/stats
**Auth:** Sanctum  
**Response:**
```json
{
  "success": true,
  "data": {
    "total_donors": 120,
    "pending_requests": 8,
    "total_volunteers": 45,
    "unread_messages": 3,
    "total_donations": 150000.00,
    "recent_activity": [ ... ]
  }
}
```

---

## Pagination Format (All List Endpoints)

```json
{
  "success": true,
  "data": [ ... ],
  "links": {
    "first": "https://api.../api/blood-donors?page=1",
    "last": "https://api.../api/blood-donors?page=5",
    "prev": null,
    "next": "https://api.../api/blood-donors?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "path": "https://api.../api/blood-donors",
    "per_page": 15,
    "to": 15,
    "total": 75
  }
}
```

---

## 403 / 401 Response Format

```json
{
  "success": false,
  "message": "Unauthenticated."
}
```

```json
{
  "success": false,
  "message": "This action is unauthorized."
}
```

---

## 422 Validation Error Format

```json
{
  "success": false,
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

---

## CORS Headers Required

```
Access-Control-Allow-Origin: https://sasoibal.github.io
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
```
