import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <input name="password_confirmation" type="password" placeholder="Confirm Password" value={form.password_confirmation} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" required />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Register</button>
      </form>
    </div>
  );
}
