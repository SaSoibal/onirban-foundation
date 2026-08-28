import { useState } from 'react';
import api from '../../services/api';

export default function VolunteerRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', motivation: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/volunteers/register', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', motivation: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Volunteer Registration</h1>
      {success && <p className="text-green-600 mb-4 text-center">Application submitted successfully!</p>}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <textarea name="motivation" placeholder="Why do you want to volunteer?" value={form.motivation} onChange={handleChange} className="w-full border rounded px-3 py-2" required></textarea>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Apply Now</button>
      </form>
    </div>
  );
}
