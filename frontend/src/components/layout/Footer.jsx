import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Onirban Foundation</h3>
          <p className="text-gray-400 text-sm">
            Empowering communities through blood donation and social programs.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link to="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link to="/blood-donors" className="hover:text-white">Blood Donors</Link></li>
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
          <p className="text-sm text-gray-400">hello@onirban.org</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Onirban Foundation. All rights reserved.
      </div>
    </footer>
  );
}
