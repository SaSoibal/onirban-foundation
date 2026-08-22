import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/programs', label: 'Programs' },
    { to: '/blood-donors', label: 'Blood Donation' },
    { to: '/events', label: 'Events' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Onirban
          </Link>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-gray-700 hover:text-red-600">
                {link.label}
              </Link>
            ))}
            <Link to="/blood-request" className="text-red-600 font-semibold hover:text-red-700">
              Emergency Request
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              {link.label}
            </Link>
          ))}
          <Link to="/blood-request" className="block px-4 py-2 text-red-600 font-semibold">
            Emergency Request
          </Link>
        </div>
      )}
    </nav>
  );
}
