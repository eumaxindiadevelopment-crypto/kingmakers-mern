import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({ posts: true }); // Open by default if preferred

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navItems = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    {
      id: 'leads',
      icon: '📋',
      label: 'Leads',
      subItems: [
        { to: '/admin/leads/upsc', label: 'UPSC Enquiry' },
        { to: '/admin/leads/tnpsc', label: 'TNPSC Enquiry' },
        { to: '/admin/leads/contact', label: 'Contact Forms' },
      ]
    },
    {
      id: 'popups',
      icon: '🔔',
      label: 'Popups',
      subItems: [
        { to: '/admin/popups/upsc', label: 'UPSC Popup' },
        { to: '/admin/popups/tnpsc', label: 'TNPSC Popup' },
      ]
    },
    {
      id: 'sliders',
      icon: '🖼',
      label: 'Sliders',
      subItems: [
        { to: '/admin/sliders', label: 'All Sliders' },
        { to: '/admin/sliders/new', label: 'Add Slider' },
      ]
    },
    { 
      id: 'posts',
      icon: '📝', 
      label: 'Posts',
      subItems: [
        { to: '/admin/blogs', label: 'All Posts' },
        { to: '/admin/blogs?action=new', label: 'Add Post' },
        { to: '/admin/blogs?action=categories', label: 'Categories' }
      ]
    },
    {
      id: 'media',
      icon: '🖼️',
      label: 'Media',
      subItems: [
        { to: '/admin/media', label: 'Library' },
        { to: '/admin/media?action=upload', label: 'Add New' }
      ]
    },
    {
      id: 'upsc',
      icon: '🎓',
      label: 'UPSC',
      subItems: [
        { to: '/admin/upsc', label: 'All UPSC' },
        { to: '/admin/upsc?action=new', label: 'New UPSC' }
      ]
    },
    {
      id: 'tnpsc',
      icon: '🏛️',
      label: 'TNPSC',
      subItems: [
        { to: '/admin/tnpsc', label: 'All TNPSC' },
        { to: '/admin/tnpsc?action=new', label: 'New TNPSC' }
      ]
    },
    {
      id: 'courses',
      icon: '📋',
      label: 'Courses (Home)',
      subItems: [
        { to: '/admin/courses', label: 'All Courses' },
        { to: '/admin/courses?action=new', label: 'Add Course' }
      ]
    },
    { to: '/admin/events', icon: '📅', label: 'Events' },
    // { to: '/admin/achievers', icon: '🏆', label: 'Achievers' },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!collapsed && <span>KM Admin</span>}
        </div>
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      </div>


      <nav className="sidebar-nav">
        {navItems.map((item) => {
          if (item.subItems) {
            const isActive = item.subItems.some(sub => location.pathname.startsWith(sub.to.split('?')[0]));
            const isOpen = openMenus[item.id] !== undefined ? openMenus[item.id] : isActive;

            return (
              <div key={item.id} className="sidebar-item-group">
                <button 
                  className={`sidebar-link w-full ${isActive ? 'active-parent' : ''}`}
                  onClick={() => {
                    if (collapsed) setCollapsed(false);
                    toggleMenu(item.id);
                  }}
                  title={collapsed ? item.label : ''}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="sidebar-label" style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                      <span className={`sidebar-arrow ${isOpen ? 'open' : ''}`}>▼</span>
                    </>
                  )}
                </button>
                {isOpen && !collapsed && (
                  <div className="sidebar-submenu">
                    {item.subItems.map(subItem => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <button className="sidebar-logout" onClick={logout} title={collapsed ? 'Logout' : ''}>
        <span className="sidebar-icon">🚪</span>
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
