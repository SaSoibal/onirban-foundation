import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/pages', label: 'Pages', icon: '📄' },
  { to: '/admin/programs', label: 'Programs', icon: '🎯' },
  { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { to: '/admin/team', label: 'Team', icon: '👥' },
  { to: '/admin/events', label: 'Events', icon: '📅' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { to: '/admin/blood-donors', label: 'Blood Donors', icon: '🩸' },
  { to: '/admin/blood-requests', label: 'Blood Requests', icon: '🚨' },
  { to: '/admin/volunteers', label: 'Volunteers', icon: '🤝' },
  { to: '/admin/contact-messages', label: 'Messages', icon: '✉️' },
  { to: '/admin/donations', label: 'Donations', icon: '💰' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { to: '/admin/activity-logs', label: 'Activity Logs', icon: '📋' },
  { to: '/admin/users', label: 'Users', icon: '👤' },
  { to: '/admin/roles', label: 'Roles', icon: '🔐' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-gray-800 text-white transition-all ${collapsed ? 'w-16' : 'w-64'} h-screen flex flex-col overflow-hidden`}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 hover:bg-gray-700 ${isActive ? 'bg-gray-700 border-l-4 border-red-500' : ''}`
            }
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
