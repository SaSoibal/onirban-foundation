import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';

export default function DonationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ donor_name: '', email: '', phone: '', amount: '', currency: 'USD', payment_method: 'bank', status: 'pending' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/donations/${id}`).then((res) => {
        setForm({ donor_name: res.data.data.donor_name, email: res.data.data.email, phone: res.data.data.phone || '', amount: res.data.data.amount, currency: res.data.data.currency || 'USD', payment_method: res.data.data.payment_method || 'bank', status: res.data.data.status || 'pending' });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/donations/${id}`, form);
    else await api.post('/donations', form);
    navigate('/admin/donations');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Donation</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} placeholder="Donor Name" className="w-full border rounded px-3 py-2" required />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded px-3 py-2" required />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-3 py-2" />
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" className="w-full border rounded px-3 py-2" required />
          <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="USD">USD</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        <select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="w-full border rounded px-3 py-2">
          <option value="bank">Bank</option>
          <option value="mobile">Mobile</option>
          <option value="card">Card</option>
        </select>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate('/admin/donations')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
