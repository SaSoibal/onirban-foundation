# Onirban Foundation — Frontend Routes & UI Architecture

## 1. Routing Strategy

### Recommended: BrowserRouter + 404.html Fallback
- Use `react-router-dom` `BrowserRouter` with `basename="/onirban-foundation"`
- Deploy `404.html` to GitHub Pages root that redirects all unmatched paths to `/onirban-foundation/index.html`
- Enables clean URLs (no `#` in URLs)
- SEO-friendly for public pages

### Alternative: HashRouter
- Use `HashRouter` with `basename="/onirban-foundation"`
- No 404.html required
- URLs contain `#` (e.g., `https://sasoibal.github.io/onirban-foundation#/programs`)
- Simpler for GitHub Pages but less clean

### CORS Configuration
Backend `config/cors.php` must allow:
```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['https://sasoibal.github.io'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'supports_credentials' => true,
'exposed_headers' => [],
'max_age' => 0,
```

---

## 2. React App Structure

```
src/
  api/
    axios.js
    endpoints.js
  components/
    layout/
      AdminLayout.jsx
      PublicLayout.jsx
      Sidebar.jsx
      Header.jsx
      Footer.jsx
    shared/
      Button.jsx
      Input.jsx
      Modal.jsx
      Table.jsx
      Pagination.jsx
      ImageUpload.jsx
      RichEditor.jsx
      ConfirmDialog.jsx
      LoadingSpinner.jsx
      ProtectedRoute.jsx
    blood/
      DonorCard.jsx
      RequestCard.jsx
      EligibilityBadge.jsx
  contexts/
    AuthContext.jsx
    SettingsContext.jsx
  hooks/
    useApi.js
    useAuth.js
    useSettings.js
  pages/
    public/
      Home.jsx
      About.jsx
      Programs.jsx
      ProgramDetail.jsx
      Gallery.jsx
      Team.jsx
      Events.jsx
      EventDetail.jsx
      Testimonials.jsx
      BloodDonors.jsx
      BloodRequestForm.jsx
      VolunteerRegister.jsx
      Donate.jsx
      Contact.jsx
      PageBySlug.jsx
    admin/
      Dashboard.jsx
      Login.jsx
      Pages/
        PagesList.jsx
        PageForm.jsx
      Programs/
        ProgramsList.jsx
        ProgramForm.jsx
      Gallery/
        GalleryList.jsx
        GalleryForm.jsx
      GalleryCategories/
        CategoriesList.jsx
        CategoryForm.jsx
      Team/
        TeamList.jsx
        TeamForm.jsx
      Events/
        EventsList.jsx
        EventForm.jsx
      Testimonials/
        TestimonialsList.jsx
        TestimonialForm.jsx
      BloodDonors/
        DonorsList.jsx
        DonorForm.jsx
        DonorVerify.jsx
      BloodRequests/
        RequestsList.jsx
        RequestForm.jsx
      Volunteers/
        VolunteersList.jsx
        VolunteerForm.jsx
      ContactMessages/
        MessagesList.jsx
        MessageDetail.jsx
      Donations/
        DonationsList.jsx
        DonationForm.jsx
      Settings/
        GeneralSettings.jsx
        SeoSettings.jsx
        SocialSettings.jsx
      ActivityLogs/
        LogsList.jsx
      Users/
        UsersList.jsx
        UserForm.jsx
      Roles/
        RolesList.jsx
        RoleForm.jsx
      Media/
        MediaLibrary.jsx
  resources/
    styles/
      admin.css
      public.css
  utils/
    constants.js
    helpers.js
    validators.js
  App.jsx
  index.jsx
```

---

## 3. Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page with dynamic CMS content |
| `/about` | `About` | About page (loaded from CMS `pages` table slug=`about`) |
| `/programs` | `Programs` | Grid of active programs |
| `/programs/:slug` | `ProgramDetail` | Single program detail |
| `/gallery` | `Gallery` | Filterable photo gallery |
| `/team` | `Team` | Team members list |
| `/events` | `Events` | Upcoming events list |
| `/events/:slug` | `EventDetail` | Single event detail |
| `/testimonials` | `Testimonials` | Approved testimonials carousel |
| `/blood-donors` | `BloodDonors` | Public donor directory with filters |
| `/blood-request` | `BloodRequestForm` | Public emergency blood request form |
| `/volunteer-registration` | `VolunteerRegister` | Volunteer sign-up form |
| `/donate` | `Donate` | Online donation page |
| `/contact` | `Contact` | Contact form |
| `/pages/:slug` | `PageBySlug` | Catch-all for any CMS page |

**Layout:** `PublicLayout` (Header + Footer, main content outlet)

---

## 4. Admin Routes

| Path | Component | Required Permission | Layout |
|------|-----------|---------------------|--------|
| `/admin/login` | `Login` | None | `AdminLoginLayout` |
| `/admin/dashboard` | `Dashboard` | `view_dashboard` | `AdminLayout` |
| `/admin/pages` | `PagesList` | `view_page` | `AdminLayout` |
| `/admin/pages/create` | `PageForm` | `create_page` | `AdminLayout` |
| `/admin/pages/:id/edit` | `PageForm` | `edit_page` | `AdminLayout` |
| `/admin/programs` | `ProgramsList` | `view_program` | `AdminLayout` |
| `/admin/programs/create` | `ProgramForm` | `create_program` | `AdminLayout` |
| `/admin/programs/:id/edit` | `ProgramForm` | `edit_program` | `AdminLayout` |
| `/admin/gallery-categories` | `CategoriesList` | `view_gallery_category` | `AdminLayout` |
| `/admin/gallery-categories/create` | `CategoryForm` | `create_gallery_category` | `AdminLayout` |
| `/admin/gallery-categories/:id/edit` | `CategoryForm` | `edit_gallery_category` | `AdminLayout` |
| `/admin/gallery` | `GalleryList` | `view_gallery` | `AdminLayout` |
| `/admin/gallery/create` | `GalleryForm` | `create_gallery` | `AdminLayout` |
| `/admin/gallery/:id/edit` | `GalleryForm` | `edit_gallery` | `AdminLayout` |
| `/admin/team` | `TeamList` | `view_team` | `AdminLayout` |
| `/admin/team/create` | `TeamForm` | `create_team` | `AdminLayout` |
| `/admin/team/:id/edit` | `TeamForm` | `edit_team` | `AdminLayout` |
| `/admin/events` | `EventsList` | `view_event` | `AdminLayout` |
| `/admin/events/create` | `EventForm` | `create_event` | `AdminLayout` |
| `/admin/events/:id/edit` | `EventForm` | `edit_event` | `AdminLayout` |
| `/admin/testimonials` | `TestimonialsList` | `view_testimonial` | `AdminLayout` |
| `/admin/testimonials/create` | `TestimonialForm` | `create_testimonial` | `AdminLayout` |
| `/admin/testimonials/:id/edit` | `TestimonialForm` | `edit_testimonial` | `AdminLayout` |
| `/admin/blood-donors` | `DonorsList` | `view_donor` | `AdminLayout` |
| `/admin/blood-donors/create` | `DonorForm` | `create_donor` | `AdminLayout` |
| `/admin/blood-donors/:id/edit` | `DonorForm` | `edit_donor` | `AdminLayout` |
| `/admin/blood-donors/:id/verify` | `DonorVerify` | `verify_donor` | `AdminLayout` |
| `/admin/blood-requests` | `RequestsList` | `view_blood_request` | `AdminLayout` |
| `/admin/blood-requests/create` | `RequestForm` | `create_blood_request` | `AdminLayout` |
| `/admin/blood-requests/:id/edit` | `RequestForm` | `edit_blood_request` | `AdminLayout` |
| `/admin/volunteers` | `VolunteersList` | `view_volunteer` | `AdminLayout` |
| `/admin/volunteers/create` | `VolunteerForm` | `create_volunteer` | `AdminLayout` |
| `/admin/volunteers/:id/edit` | `VolunteerForm` | `edit_volunteer` | `AdminLayout` |
| `/admin/contact-messages` | `MessagesList` | `view_contact_message` | `AdminLayout` |
| `/admin/contact-messages/:id` | `MessageDetail` | `view_contact_message` | `AdminLayout` |
| `/admin/donations` | `DonationsList` | `view_donation` | `AdminLayout` |
| `/admin/donations/create` | `DonationForm` | `create_donation` | `AdminLayout` |
| `/admin/donations/:id/edit` | `DonationForm` | `edit_donation` | `AdminLayout` |
| `/admin/settings` | `GeneralSettings` | `view_setting` | `AdminLayout` |
| `/admin/settings/seo` | `SeoSettings` | `edit_setting` | `AdminLayout` |
| `/admin/settings/social` | `SocialSettings` | `edit_setting` | `AdminLayout` |
| `/admin/activity-logs` | `LogsList` | `view_activity_log` | `AdminLayout` |
| `/admin/users` | `UsersList` | `view_user` | `AdminLayout` |
| `/admin/users/create` | `UserForm` | `create_user` | `AdminLayout` |
| `/admin/users/:id/edit` | `UserForm` | `edit_user` | `AdminLayout` |
| `/admin/roles` | `RolesList` | `view_role` | `AdminLayout` |
| `/admin/roles/create` | `RoleForm` | `create_role` | `AdminLayout` |
| `/admin/roles/:id/edit` | `RoleForm` | `edit_role` | `AdminLayout` |
| `/admin/media` | `MediaLibrary` | `view_media` | `AdminLayout` |

**Layout:** `AdminLayout` (Sidebar + Header + main content outlet)

---

## 5. GitHub Pages Routing Implementation

### Option A: BrowserRouter with 404.html (Recommended)

**`public/404.html`** (placed in React public folder, deployed to gh-pages root):
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/onirban-foundation/" />
    <script>
      const path = location.pathname.replace(/^\/onirban-foundation/, '') || '/';
      location.replace('/onirban-foundation/#/admin' + path);
    </script>
  </head>
</html>
```

**`src/index.jsx`:**
```jsx
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter basename="/onirban-foundation">
  <App />
</BrowserRouter>
```

### Option B: HashRouter

**`src/index.jsx`:**
```jsx
import { HashRouter } from 'react-router-dom';
<HashRouter basename="/onirban-foundation">
  <App />
</HashRouter>
```

**Trade-off:** HashRouter is zero-config for GitHub Pages but URLs are less clean. BrowserRouter with 404.html requires deploying the fallback file but produces clean URLs.

---

## 6. Public UI Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Sticky top nav with mobile hamburger menu |
| `Footer` | Site footer with links, social icons, contact info |
| `HeroSlider` | Dynamic homepage hero with CMS content |
| `SectionTitle` | Consistent heading component with subtitle |
| `CardGrid` | Responsive grid wrapper for cards |
| `DonorCard` | Blood donor preview with privacy-aware display |
| `RequestCard` | Emergency blood request preview |
| `ProgramCard` | Program/project card with image and status badge |
| `EventCard` | Event card with date badge |
| `TeamCard` | Team member card with photo overlay |
| `GalleryLightbox` | Image lightbox for gallery |
| `ContactForm` | Public contact submission form |
| `BloodRequestForm` | Public emergency blood request form |
| `VolunteerForm` | Public volunteer registration form |
| `DonationForm` | Public donation form |
| `TestimonialCarousel` | Auto-rotating testimonials |
| `PageContent` | Renders rich HTML from CMS pages safely |

---

## 7. Admin UI Components

| Component | Purpose |
|-----------|---------|
| `AdminLayout` | Sidebar + header + content wrapper |
| `Sidebar` | Collapsible sidebar with permission-based menu items |
| `Header` | Admin top bar with user dropdown, notifications |
| `DataTable` | Reusable table with sort, filter, bulk actions |
| `FormModal` | Modal wrapper for create/edit forms |
| `ImageUploader` | Drag-and-drop image upload with preview |
| `RichTextEditor` | WYSIWYG editor (TipTap or similar) |
| `StatusBadge` | Color-coded status indicator |
| `ConfirmDialog` | Delete confirmation modal |
| `FilterBar` | Search, filter, date-range bar for lists |
| `StatsCard` | Dashboard stat card with icon and trend |
| `ActivityTimeline` | Recent activity feed on dashboard |
| `PermissionGuard` | Wraps admin routes/components by permission |
| `RoleSelect` | Multi-select for assigning roles/permissions |

---

## 8. State Management

- **Auth:** `AuthContext` with `login()`, `logout()`, `user` object, `hasPermission()` helper
- **Settings:** `SettingsContext` with `siteSettings` key-value store, loaded once on admin entry
- **API:** `axios` instance with interceptor for:
  - Attaching `Authorization: Bearer {token}`
  - Handling 401 (redirect to login)
  - Handling 403 (show unauthorized toast)
  - Handling 422 (display validation errors)

---

## 9. Environment Variables (Frontend)

```
VITE_API_BASE_URL=https://api.onirban-foundation.railway.app/api
VITE_APP_URL=https://sasoibal.github.io/onirban-foundation
VITE_SENTRY_DSN= (optional)
```

---

## 10. Build & Deploy

- Build command: `npm run build`
- Output folder: `dist/`
- GitHub Pages deployment via `gh-pages` branch or GitHub Actions
- `basename` must match repository name exactly: `/onirban-foundation`
- Ensure all internal links use React Router `<Link to="...">` not `<a href="...">`
