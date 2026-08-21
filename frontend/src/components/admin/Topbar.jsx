import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">Onirban Admin</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">{user?.name}</span>
        <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
      </div>
    </header>
  );
}
