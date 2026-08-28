import { useEffect, useState } from 'react';
import Modal from '../../../components/admin/Modal';
import api from '../../../services/api';

export default function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ donor_name: '', email: '', phone: '', amount: '', currency: 'USD', payment_method: 'bank', status: 'pending' });

  const load = () => api.get('/donations').then((res) => setDonations(res.data.data)).catch(() => setDonations([]));
  useEffect(() => { load(); }, []);

  const openEdit = (d) => { setEditing(d); setForm({ donor_name: d.donor_name, email: d.email, phone: d.phone || '', amount: d.amount, currency: d.currency || 'USD', payment_method: d.payment_method || 'bank', status: d.status || 'pending' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/donations/${editing.id}`, form);
    else await api.post('/donations', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (d) => {
    if (confirm('Delete this donation?')) { await api.delete(`/donations/${d.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donations</h1>
        <button onClick={() => { setEditing(null); setForm({ donor_name: '', email: '', phone: '', amount: '', currency: 'USD', payment_method: 'bank', status: 'pending' }); setShowModal(true); }} className="bg-red-600 text-white px-4 py-2 rounded">Add Donation</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((d) => (
              <tr key={d.id}>
                <td className="px-6 py-4 text-sm font-medium">{d.donor_name}</td>
                <td className="px-6 py-4 text-sm">{d.amount} {d.currency}</td>
                <td className="px-6 py-4 text-sm">{d.payment_method}</td>
                <td className="px-6 py-4 text-sm">{d.status}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(d)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(d)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Donation' : 'Add Donation'}>
        <form onSubmit={handleSubmit} className="space-y-3">
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
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
