import { useState } from 'react';
import api from '../../services/api';

export default function Donate() {
  const [form, setForm] = useState({ donor_name: '', email: '', phone: '', amount: '', currency: 'USD', payment_method: 'bank', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/donations', form);
      setSuccess(true);
      setForm({ donor_name: '', email: '', phone: '', amount: '', currency: 'USD', payment_method: 'bank', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit donation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Donate</h1>
      {success && <p className="text-green-600 mb-4 text-center">Thank you for your donation!</p>}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <input name="donor_name" placeholder="Your Name" value={form.donor_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          <select name="currency" value={form.currency} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="USD">USD</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        <select name="payment_method" value={form.payment_method} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="bank">Bank Transfer</option>
          <option value="mobile">Mobile Banking</option>
          <option value="card">Card</option>
        </select>
        <textarea name="message" placeholder="Message (optional)" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Donate Now</button>
      </form>
    </div>
  );
}
