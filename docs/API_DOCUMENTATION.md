# Onirban Foundation - API Documentation

Base URL: `https://api.onirban-foundation.railway.app/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header.

```
Authorization: Bearer {sanctum_token}
```

## Public Endpoints

### Pages
- `GET /pages` - List published pages
- `GET /pages/{slug}` - Get single page

### Programs
- `GET /programs` - List programs
- `GET /programs/{slug}` - Get single program

### Gallery
- `GET /gallery` - List gallery images
- `GET /gallery/categories` - List categories

### Team
- `GET /team` - List team members

### Events
- `GET /events` - List events
- `GET /events/{slug}` - Get single event

### Testimonials
- `GET /testimonials` - List approved testimonials

### Blood Donors
- `GET /blood-donors` - List verified donors (supports ?blood_group=&district=&search=)
- `GET /blood-donors/eligible` - List eligible donors (3-month rule)
- `GET /blood-donors/{id}` - Get single donor
- `POST /blood-donors/register` - Register as donor

### Blood Requests
- `GET /blood-requests` - List active/pending requests
- `POST /blood-requests` - Submit emergency request

### Contact
- `POST /contact` - Submit contact message

### Volunteers
- `POST /volunteers/register` - Register as volunteer

### Donations
- `POST /donations` - Submit donation

### Settings
- `GET /settings` - List all settings
- `GET /settings/{key}` - Get single setting

## Authenticated Endpoints

### Auth
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

## Admin Endpoints

All admin endpoints are prefixed with `/admin` and require authentication + permissions.

### Dashboard
- `GET /admin/dashboard/stats` - Get dashboard statistics

### Pages
- `GET /admin/pages` - List all pages
- `POST /admin/pages` - Create page
- `GET /admin/pages/{id}` - Get page
- `PUT /admin/pages/{id}` - Update page
- `DELETE /admin/pages/{id}` - Delete page

### Programs
- `GET /admin/programs` - List all programs
- `POST /admin/programs` - Create program
- `GET /admin/programs/{id}` - Get program
- `PUT /admin/programs/{id}` - Update program
- `DELETE /admin/programs/{id}` - Delete program

### Gallery
- `GET /admin/gallery` - List all gallery items
- `POST /admin/gallery` - Create gallery item
- `GET /admin/gallery/{id}` - Get gallery item
- `PUT /admin/gallery/{id}` - Update gallery item
- `DELETE /admin/gallery/{id}` - Delete gallery item

### Team
- `GET /admin/team` - List all team members
- `POST /admin/team` - Create team member
- `GET /admin/team/{id}` - Get team member
- `PUT /admin/team/{id}` - Update team member
- `DELETE /admin/team/{id}` - Delete team member

### Events
- `GET /admin/events` - List all events
- `POST /admin/events` - Create event
- `GET /admin/events/{id}` - Get event
- `PUT /admin/events/{id}` - Update event
- `DELETE /admin/events/{id}` - Delete event

### Testimonials
- `GET /admin/testimonials` - List all testimonials
- `POST /admin/testimonials` - Create testimonial
- `POST /admin/testimonials/{id}/approve` - Approve testimonial
- `POST /admin/testimonials/{id}/reject` - Reject testimonial
- `PUT /admin/testimonials/{id}` - Update testimonial
- `DELETE /admin/testimonials/{id}` - Delete testimonial

### Blood Donors
- `GET /admin/blood-donors` - List all donors
- `GET /admin/blood-donors/{id}` - Get donor
- `PUT /admin/blood-donors/{id}` - Update donor
- `DELETE /admin/blood-donors/{id}` - Delete donor
- `POST /admin/blood-donors/{id}/verify` - Verify donor
- `GET /admin/blood-donors/stats` - Get donor statistics

### Blood Requests
- `GET /admin/blood-requests` - List all requests
- `GET /admin/blood-requests/{id}` - Get request
- `PUT /admin/blood-requests/{id}` - Update request
- `DELETE /admin/blood-requests/{id}` - Delete request
- `POST /admin/blood-requests/{id}/assign` - Assign donor to request

### Volunteers
- `GET /admin/volunteers` - List all volunteers
- `GET /admin/volunteers/{id}` - Get volunteer
- `PUT /admin/volunteers/{id}` - Update volunteer
- `DELETE /admin/volunteers/{id}` - Delete volunteer

### Contact Messages
- `GET /admin/contact-messages` - List all messages
- `GET /admin/contact-messages/{id}` - Get message
- `PUT /admin/contact-messages/{id}` - Update message
- `DELETE /admin/contact-messages/{id}` - Delete message

### Users
- `GET /admin/users` - List all users
- `POST /admin/users` - Create user
- `GET /admin/users/{id}` - Get user
- `PUT /admin/users/{id}` - Update user
- `DELETE /admin/users/{id}` - Delete user

### Roles
- `GET /admin/roles` - List all roles
- `POST /admin/roles` - Create role
- `GET /admin/roles/{id}` - Get role
- `PUT /admin/roles/{id}` - Update role
- `DELETE /admin/roles/{id}` - Delete role

### Activity Logs
- `GET /admin/activity-logs` - List activity logs
- `GET /admin/activity-logs/{id}` - Get log detail

### Media
- `GET /admin/media` - List media
- `POST /admin/media/upload` - Upload media
- `DELETE /admin/media/{id}` - Delete media

### Settings
- `GET /admin/settings` - List all settings
- `GET /admin/settings/{key}` - Get setting
- `POST /admin/settings` - Create setting
- `PUT /admin/settings/{key}` - Update setting
- `DELETE /admin/settings/{key}` - Delete setting

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```
