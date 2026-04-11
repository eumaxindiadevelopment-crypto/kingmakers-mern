import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import LeadsTable from './pages/LeadsTable';
import Blogs from './pages/Blogs';
import Media from './pages/Media';
import Events from './pages/Events';
import Achievers from './pages/Achievers';
import AdminCourses from './pages/AdminCourses';
import AdminSliders from './pages/AdminSliders';
import PopupNews from './pages/PopupNews';
import './css/admin.css';

const AdminLayout = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="admin-main">
      <TopBar />
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Leads sub-routes */}
          <Route path="leads/upsc" element={<LeadsTable type="upsc" title="UPSC Enquiry" />} />
          <Route path="leads/tnpsc" element={<LeadsTable type="tnpsc" title="TNPSC Enquiry" />} />
          <Route path="leads/contact" element={<LeadsTable type="contact" title="Contact Forms" />} />
          <Route path="leads" element={<Navigate to="leads/upsc" replace />} />
          {/* Other routes */}
          <Route path="blogs" element={<Blogs />} />
          <Route path="media" element={<Media />} />
          <Route path="events" element={<Events />} />
          <Route path="achievers" element={<Achievers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="upsc" element={<AdminCourses type="UPSC" />} />
          <Route path="tnpsc" element={<AdminCourses type="TNPSC" />} />
          {/* Sliders */}
          <Route path="sliders" element={<AdminSliders />} />
          <Route path="sliders/new" element={<AdminSliders openNew />} />
          
          {/* Popup News */}
          <Route path="popups/upsc" element={<PopupNews defaultCategory="UPSC" />} />
          <Route path="popups/tnpsc" element={<PopupNews defaultCategory="TNPSC" />} />
          
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  </div>
);

const AdminApp = () => (
  <ProtectedRoute>
    <AdminLayout />
  </ProtectedRoute>
);

export default AdminApp;
