# Onirban Foundation — RBAC Permissions Matrix

## 1. Roles Definition

| Role | Description | Default For |
|------|-------------|-------------|
| **Super Admin** | Full system access. Can manage users, roles, permissions, settings, and all content. | Owner / Developer |
| **Admin** | Full content management access. Can manage all modules except user/role administration and system-level settings. | Operations Manager |
| **Editor** | Can create and edit content. Cannot delete users, change settings, or manage roles. | Content Manager |
| **Viewer** | Read-only access to admin dashboard and content lists. | Stakeholder / Auditor |

---

## 2. Permission Registry

Permissions follow the pattern `{action}_{module}`.

| Module | Permissions |
|--------|-------------|
| **Dashboard** | `view_dashboard` |
| **Pages** | `view_page`, `create_page`, `edit_page`, `delete_page` |
| **Programs** | `view_program`, `create_program`, `edit_program`, `delete_program` |
| **Gallery Categories** | `view_gallery_category`, `create_gallery_category`, `edit_gallery_category`, `delete_gallery_category` |
| **Gallery** | `view_gallery`, `create_gallery`, `edit_gallery`, `delete_gallery` |
| **Team** | `view_team`, `create_team`, `edit_team`, `delete_team` |
| **Events** | `view_event`, `create_event`, `edit_event`, `delete_event` |
| **Testimonials** | `view_testimonial`, `create_testimonial`, `edit_testimonial`, `delete_testimonial`, `approve_testimonial`, `reject_testimonial` |
| **Blood Donors** | `view_donor`, `create_donor`, `edit_donor`, `delete_donor`, `verify_donor` |
| **Blood Requests** | `view_blood_request`, `create_blood_request`, `edit_blood_request`, `delete_blood_request`, `assign_donor` |
| **Volunteers** | `view_volunteer`, `create_volunteer`, `edit_volunteer`, `delete_volunteer` |
| **Contact Messages** | `view_contact_message`, `edit_contact_message`, `delete_contact_message` |
| **Donations** | `view_donation`, `create_donation`, `edit_donation`, `delete_donation` |
| **Site Settings** | `view_setting`, `create_setting`, `edit_setting`, `delete_setting` |
| **Activity Logs** | `view_activity_log` |
| **Users** | `view_user`, `create_user`, `edit_user`, `delete_user` |
| **Roles** | `view_role`, `create_role`, `edit_role`, `delete_role` |
| **Media** | `view_media`, `upload_media`, `delete_media` |

**Total Permissions:** 53

---

## 3. Access Matrix

| Module | Permission | Super Admin | Admin | Editor | Viewer |
|--------|-----------|-------------|-------|--------|--------|
| Dashboard | `view_dashboard` | ✅ | ✅ | ✅ | ✅ |
| Pages | `view_page` | ✅ | ✅ | ✅ | ✅ |
| | `create_page` | ✅ | ✅ | ✅ | ❌ |
| | `edit_page` | ✅ | ✅ | ✅ | ❌ |
| | `delete_page` | ✅ | ✅ | ❌ | ❌ |
| Programs | `view_program` | ✅ | ✅ | ✅ | ✅ |
| | `create_program` | ✅ | ✅ | ✅ | ❌ |
| | `edit_program` | ✅ | ✅ | ✅ | ❌ |
| | `delete_program` | ✅ | ✅ | ❌ | ❌ |
| Gallery Categories | `view_gallery_category` | ✅ | ✅ | ✅ | ✅ |
| | `create_gallery_category` | ✅ | ✅ | ✅ | ❌ |
| | `edit_gallery_category` | ✅ | ✅ | ✅ | ❌ |
| | `delete_gallery_category` | ✅ | ✅ | ❌ | ❌ |
| Gallery | `view_gallery` | ✅ | ✅ | ✅ | ✅ |
| | `create_gallery` | ✅ | ✅ | ✅ | ❌ |
| | `edit_gallery` | ✅ | ✅ | ✅ | ❌ |
| | `delete_gallery` | ✅ | ✅ | ❌ | ❌ |
| Team | `view_team` | ✅ | ✅ | ✅ | ✅ |
| | `create_team` | ✅ | ✅ | ✅ | ❌ |
| | `edit_team` | ✅ | ✅ | ✅ | ❌ |
| | `delete_team` | ✅ | ✅ | ❌ | ❌ |
| Events | `view_event` | ✅ | ✅ | ✅ | ✅ |
| | `create_event` | ✅ | ✅ | ✅ | ❌ |
| | `edit_event` | ✅ | ✅ | ✅ | ❌ |
| | `delete_event` | ✅ | ✅ | ❌ | ❌ |
| Testimonials | `view_testimonial` | ✅ | ✅ | ✅ | ✅ |
| | `create_testimonial` | ✅ | ✅ | ✅ | ❌ |
| | `edit_testimonial` | ✅ | ✅ | ✅ | ❌ |
| | `delete_testimonial` | ✅ | ✅ | ❌ | ❌ |
| | `approve_testimonial` | ✅ | ✅ | ✅ | ❌ |
| | `reject_testimonial` | ✅ | ✅ | ✅ | ❌ |
| Blood Donors | `view_donor` | ✅ | ✅ | ✅ | ✅ |
| | `create_donor` | ✅ | ✅ | ✅ | ❌ |
| | `edit_donor` | ✅ | ✅ | ✅ | ❌ |
| | `delete_donor` | ✅ | ✅ | ❌ | ❌ |
| | `verify_donor` | ✅ | ✅ | ✅ | ❌ |
| Blood Requests | `view_blood_request` | ✅ | ✅ | ✅ | ✅ |
| | `create_blood_request` | ✅ | ✅ | ❌ | ❌ |
| | `edit_blood_request` | ✅ | ✅ | ❌ | ❌ |
| | `delete_blood_request` | ✅ | ✅ | ❌ | ❌ |
| | `assign_donor` | ✅ | ✅ | ✅ | ❌ |
| Volunteers | `view_volunteer` | ✅ | ✅ | ✅ | ✅ |
| | `create_volunteer` | ✅ | ✅ | ✅ | ❌ |
| | `edit_volunteer` | ✅ | ✅ | ✅ | ❌ |
| | `delete_volunteer` | ✅ | ✅ | ❌ | ❌ |
| Contact Messages | `view_contact_message` | ✅ | ✅ | ✅ | ✅ |
| | `edit_contact_message` | ✅ | ✅ | ✅ | ❌ |
| | `delete_contact_message` | ✅ | ✅ | ❌ | ❌ |
| Donations | `view_donation` | ✅ | ✅ | ✅ | ✅ |
| | `create_donation` | ✅ | ✅ | ❌ | ❌ |
| | `edit_donation` | ✅ | ✅ | ❌ | ❌ |
| | `delete_donation` | ✅ | ✅ | ❌ | ❌ |
| Site Settings | `view_setting` | ✅ | ✅ | ❌ | ❌ |
| | `create_setting` | ✅ | ✅ | ❌ | ❌ |
| | `edit_setting` | ✅ | ✅ | ❌ | ❌ |
| | `delete_setting` | ✅ | ✅ | ❌ | ❌ |
| Activity Logs | `view_activity_log` | ✅ | ✅ | ❌ | ❌ |
| Users | `view_user` | ✅ | ❌ | ❌ | ❌ |
| | `create_user` | ✅ | ❌ | ❌ | ❌ |
| | `edit_user` | ✅ | ❌ | ❌ | ❌ |
| | `delete_user` | ✅ | ❌ | ❌ | ❌ |
| Roles | `view_role` | ✅ | ❌ | ❌ | ❌ |
| | `create_role` | ✅ | ❌ | ❌ | ❌ |
| | `edit_role` | ✅ | ❌ | ❌ | ❌ |
| | `delete_role` | ✅ | ❌ | ❌ | ❌ |
| Media | `view_media` | ✅ | ✅ | ✅ | ✅ |
| | `upload_media` | ✅ | ✅ | ✅ | ❌ |
| | `delete_media` | ✅ | ✅ | ❌ | ❌ |

---

## 4. Gate Definitions (Laravel)

All gates defined in `AuthServiceProvider` or `Gate::before()`:

```php
// Super admin bypass
Gate::before(function ($user, $ability) {
    return $user->hasRole('super_admin') ? true : null;
});

// Module-level gates
Gate::define('view_page', [PagePolicy::class, 'view']);
Gate::define('create_page', [PagePolicy::class, 'create']);
// ... repeat for all 53 permissions
```

**Policy Coverage:** Every Eloquent model with admin CRUD must have a Policy class.

---

## 5. Middleware Stack (API Routes)

```
auth:sanctum → EnsureAuthenticated
can:{permission} → EnsurePermission
verified → EnsureEmailVerified (optional)
throttle:api → Rate limiting
```

Route group structure:
```php
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::middleware('can:view_dashboard')->get('/dashboard/stats', ...);
    Route::resource('pages', PageController::class);
    // ...
});
```

---

## 6. Default Roles Seeder

| Role | Permissions Assigned |
|------|---------------------|
| super_admin | All 53 permissions |
| admin | All except user_*, role_*, delete_setting, delete_media |
| editor | create_*, edit_*, view_* for content modules + approve_testimonial + verify_donor + assign_donor + upload_media |
| viewer | view_* for content modules only |

---

## 7. Special Access Rules

| Rule | Description |
|------|-------------|
| **Self-edit** | Users can edit their own profile (`edit_user` + own record) |
| **Verified flag** | Only users with `verify_donor` can change donor verification status |
| **Settings guard** | Only `super_admin` and `admin` can edit `site_settings` with group `general`, `seo`, `social` |
| **Public endpoints** | Pages, Programs, Gallery, Team, Events, Testimonials (approved), Blood Donors directory, Blood Requests (POST only), Volunteers register, Contact (POST only), Donations (POST only), Settings (GET only) do NOT require auth |
| **Sanctum token expiry** | Tokens expire after 30 days (configurable) |
| **IP logging** | All admin actions log `ip_address` and `user_agent` in `activity_logs` |

---

## 8. Permission Check Flow (API)

1. Request arrives with `Authorization: Bearer {token}`
2. Sanctum authenticates user
3. Route middleware checks `can:{permission}`
4. If fails → 403 `This action is unauthorized.`
5. If passes → Controller executes
6. Controller dispatches `ActivityLog` event via observer
7. Response returns API Resource

---

## 9. Frontend Route Guards

| Admin Route | Required Permission | Fallback |
|-------------|---------------------|----------|
| /admin/dashboard | `view_dashboard` | /admin/login |
| /admin/pages | `view_page` | /admin/dashboard |
| /admin/pages/create | `create_page` | /admin/pages |
| /admin/programs | `view_program` | /admin/dashboard |
| /admin/blood-donors | `view_donor` | /admin/dashboard |
| /admin/blood-requests | `view_blood_request` | /admin/dashboard |
| /admin/settings | `view_setting` | /admin/dashboard |
| /admin/users | `view_user` | /admin/dashboard |
| /admin/roles | `view_role` | /admin/dashboard |
| /admin/activity-logs | `view_activity_log` | /admin/dashboard |
