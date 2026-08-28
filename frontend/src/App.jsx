import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Programs from './pages/public/Programs';
import ProgramDetail from './pages/public/ProgramDetail';
import Gallery from './pages/public/Gallery';
import Team from './pages/public/Team';
import Events from './pages/public/Events';
import EventDetail from './pages/public/EventDetail';
import Testimonials from './pages/public/Testimonials';
import BloodDonation from './pages/public/BloodDonation';
import BloodRequestForm from './pages/public/BloodRequestForm';
import VolunteerRegister from './pages/public/VolunteerRegister';
import Donate from './pages/public/Donate';
import Contact from './pages/public/Contact';
import PageBySlug from './pages/public/PageBySlug';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import MyProfile from './pages/user/MyProfile';
import MyDonations from './pages/user/MyDonations';

// Admin Auth
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import RolesList from './pages/admin/Roles/RolesList';
import RoleForm from './pages/admin/Roles/RoleForm';
import MediaLibrary from './pages/admin/Media/MediaLibrary';
import GeneralSettings from './pages/admin/Settings/GeneralSettings';
import SeoSettings from './pages/admin/Settings/SeoSettings';
import SocialSettings from './pages/admin/Settings/SocialSettings';
import LogsList from './pages/admin/ActivityLogs/LogsList';
import DonationsList from './pages/admin/Donations/DonationsList';
import DonationForm from './pages/admin/Donations/DonationForm';

// Management Pages
import PagesManagement from './pages/admin/PagesManagement';
import ProgramsManagement from './pages/admin/ProgramsManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import TeamManagement from './pages/admin/TeamManagement';
import EventsManagement from './pages/admin/EventsManagement';
import VolunteersManagement from './pages/admin/VolunteersManagement';
import BloodDonorsManagement from './pages/admin/BloodDonorsManagement';
import BloodRequestsManagement from './pages/admin/BloodRequestsManagement';
import ContactsManagement from './pages/admin/ContactsManagement';
import SettingsManagement from './pages/admin/SettingsManagement';
import UsersManagement from './pages/admin/UsersManagement';
import ActivityLogsManagement from './pages/admin/ActivityLogsManagement';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:slug" element={<ProgramDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="team" element={<Team />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blood-donors" element={<BloodDonation />} />
          <Route path="blood-request" element={<BloodRequestForm />} />
          <Route path="volunteer-registration" element={<VolunteerRegister />} />
          <Route path="donate" element={<Donate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pages/:slug" element={<PageBySlug />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="donations" element={<MyDonations />} />
        </Route>

        {/* Admin Auth */}
        <Route path="/admin/login" element={user ? <Navigate to="/admin/dashboard" /> : <Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pages" element={<PagesManagement />} />
          <Route path="programs" element={<ProgramsManagement />} />
          <Route path="gallery-categories" element={<CategoriesList />} />
          <Route path="gallery-categories/create" element={<CategoryForm />} />
          <Route path="gallery-categories/:id/edit" element={<CategoryForm />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="events" element={<EventsManagement />} />
          <Route path="testimonials" element={<TestimonialsManagement />} />
          <Route path="blood-donors" element={<BloodDonorsManagement />} />
          <Route path="blood-requests" element={<BloodRequestsManagement />} />
          <Route path="volunteers" element={<VolunteersManagement />} />
          <Route path="contact-messages" element={<ContactsManagement />} />
          <Route path="donations" element={<DonationsList />} />
          <Route path="donations/create" element={<DonationForm />} />
          <Route path="donations/:id/edit" element={<DonationForm />} />
          <Route path="settings" element={<SettingsManagement />} />
          <Route path="settings/seo" element={<SeoSettings />} />
          <Route path="settings/social" element={<SocialSettings />} />
          <Route path="activity-logs" element={<LogsList />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="roles" element={<RolesList />} />
          <Route path="roles/create" element={<RoleForm />} />
          <Route path="roles/:id/edit" element={<RoleForm />} />
          <Route path="media" element={<MediaLibrary />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
