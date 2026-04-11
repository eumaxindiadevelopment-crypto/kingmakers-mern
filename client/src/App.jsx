import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';
import AboutUs from './components/pages/AboutUs';
import FAQ from './components/pages/FAQ';
import TNPSC from './components/pages/TNPSC';
import UPSC from './components/pages/UPSC';
import AboutUPSC from './components/pages/AboutUPSC';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import ThankYou from './components/pages/ThankYou';
import NotFound from './components/pages/NotFound';
import Achievers from './components/pages/Achievers';
import Blogs from './components/pages/Blogs';
import BlogDetail from './components/pages/BlogDetail';
import Events from './components/pages/Events';
import EventDetail from './components/pages/EventDetail';
import FacultyTeam from './components/pages/FacultyTeam';
import OurPhilanthropy from './components/pages/OurPhilanthropy';
import TrichyIasPage from './components/pages/TrichyIasPage';

// Admin Panel
import { AuthProvider } from './admin/context/AuthContext';
import AdminApp from './admin/AdminApp';
import Login from './admin/pages/Login';

import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ===== Public Website ===== */}
          <Route path="/" element={<Layout />}>
            {/* Location Pages (Using relative paths for safer matching) */}
            <Route path="best-ias-coaching-centre-in-trichy" element={<TrichyIasPage />} />
            <Route index element={<Home />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="tnpsc" element={<TNPSC />} />
            <Route path="upsc" element={<UPSC />} />
            <Route path="about-upsc" element={<AboutUPSC />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="achievers" element={<Achievers />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:slug" element={<BlogDetail />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:slug" element={<EventDetail />} />
            <Route path="faculty-team" element={<FacultyTeam />} />
            <Route path="our-philanthropy" element={<OurPhilanthropy />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ===== Standalone Pages (outside Layout) ===== */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ===== Admin Panel ===== */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminApp />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;