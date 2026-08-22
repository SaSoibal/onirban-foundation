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
import BloodDonors from './pages/public/BloodDonors';
import BloodRequestForm from './pages/public/BloodRequestForm';
import VolunteerRegister from './pages/public/VolunteerRegister';
import Donate from './pages/public/Donate';
import Contact from './pages/public/Contact';
import PageBySlug from './pages/public/PageBySlug';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PagesList from './pages/admin/Pages/PagesList';
import PageForm from './pages/admin/Pages/PageForm';
import ProgramsList from './pages/admin/Programs/ProgramsList';
import ProgramForm from './pages/admin/Programs/ProgramForm';
import GalleryList from './pages/admin/Gallery/GalleryList';
import GalleryForm from './pages/admin/Gallery/GalleryForm';
import CategoriesList from './pages/admin/GalleryCategories/CategoriesList';
import CategoryForm from './pages/admin/GalleryCategories/CategoryForm';
import TeamList from './pages/admin/Team/TeamList';
import TeamForm from './pages/admin/Team/TeamForm';
import EventsList from './pages/admin/Events/EventsList';
import EventForm from './pages/admin/Events/EventForm';
import TestimonialsList from './pages/admin/Testimonials/TestimonialsList';
import TestimonialForm from './pages/admin/Testimonials/TestimonialForm';
import DonorsList from './pages/admin/BloodDonors/DonorsList';
import DonorForm from './pages/admin/BloodDonors/DonorForm';
import RequestsList from './pages/admin/BloodRequests/RequestsList';
import RequestForm from './pages/admin/BloodRequests/RequestForm';
import VolunteersList from './pages/admin/Volunteers/VolunteersList';
import VolunteerForm from './pages/admin/Volunteers/VolunteerForm';
import MessagesList from './pages/admin/ContactMessages/MessagesList';
import MessageDetail from './pages/admin/ContactMessages/MessageDetail';
import DonationsList from './pages/admin/Donations/DonationsList';
import DonationForm from './pages/admin/Donations/DonationForm';
import GeneralSettings from './pages/admin/Settings/GeneralSettings';
import SeoSettings from './pages/admin/Settings/SeoSettings';
import SocialSettings from './pages/admin/Settings/SocialSettings';
import LogsList from './pages/admin/ActivityLogs/LogsList';
import UsersList from './pages/admin/Users/UsersList';
import UserForm from './pages/admin/Users/UserForm';
import RolesList from './pages/admin/Roles/RolesList';
import RoleForm from './pages/admin/Roles/RoleForm';
import MediaLibrary from './pages/admin/Media/MediaLibrary';

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
          <Route path="blood-donors" element={<BloodDonors />} />
          <Route path="blood-request" element={<BloodRequestForm />} />
          <Route path="volunteer-registration" element={<VolunteerRegister />} />
          <Route path="donate" element={<Donate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pages/:slug" element={<PageBySlug />} />
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/create" element={<PageForm />} />
          <Route path="pages/:id/edit" element={<PageForm />} />
          <Route path="programs" element={<ProgramsList />} />
          <Route path="programs/create" element={<ProgramForm />} />
          <Route path="programs/:id/edit" element={<ProgramForm />} />
          <Route path="gallery-categories" element={<CategoriesList />} />
          <Route path="gallery-categories/create" element={<CategoryForm />} />
          <Route path="gallery-categories/:id/edit" element={<CategoryForm />} />
          <Route path="gallery" element={<GalleryList />} />
          <Route path="gallery/create" element={<GalleryForm />} />
          <Route path="gallery/:id/edit" element={<GalleryForm />} />
          <Route path="team" element={<TeamList />} />
          <Route path="team/create" element={<TeamForm />} />
          <Route path="team/:id/edit" element={<TeamForm />} />
          <Route path="events" element={<EventsList />} />
          <Route path="events/create" element={<EventForm />} />
          <Route path="events/:id/edit" element={<EventForm />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="testimonials/create" element={<TestimonialForm />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm />} />
          <Route path="blood-donors" element={<DonorsList />} />
          <Route path="blood-donors/create" element={<DonorForm />} />
          <Route path="blood-donors/:id/edit" element={<DonorForm />} />
          <Route path="blood-donors/:id/verify" element={<DonorForm />} />
          <Route path="blood-requests" element={<RequestsList />} />
          <Route path="blood-requests/create" element={<RequestForm />} />
          <Route path="blood-requests/:id/edit" element={<RequestForm />} />
          <Route path="volunteers" element={<VolunteersList />} />
          <Route path="volunteers/create" element={<VolunteerForm />} />
          <Route path="volunteers/:id/edit" element={<VolunteerForm />} />
          <Route path="contact-messages" element={<MessagesList />} />
          <Route path="contact-messages/:id" element={<MessageDetail />} />
          <Route path="donations" element={<DonationsList />} />
          <Route path="donations/create" element={<DonationForm />} />
          <Route path="donations/:id/edit" element={<DonationForm />} />
          <Route path="settings" element={<GeneralSettings />} />
          <Route path="settings/seo" element={<SeoSettings />} />
          <Route path="settings/social" element={<SocialSettings />} />
          <Route path="activity-logs" element={<LogsList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/:id/edit" element={<UserForm />} />
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
