import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MyProfile() {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/auth/me').then((res) => {
      const data = res.data.data;
      setUser({ name: data.name || '', email: data.email || '', phone: data.phone || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/users/me', user);
    setSaved(true);
  };

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        {saved && <p className="text-green-600">Profile updated!</p>}
        <input name="name" value={user.name} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Name" required />
        <input name="email" type="email" value={user.email} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Email" required />
        <input name="phone" value={user.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Phone" />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Save Changes</button>
      </form>
    </div>
  );
}
