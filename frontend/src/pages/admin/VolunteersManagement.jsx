import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function VolunteersManagement() {
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', status: 'pending' });

  const load = () => api.get('/admin/volunteers').then((res) => setVolunteers(res.data.data));
  useEffect(() => { load(); }, []);

  const openEdit = (v) => { setEditing(v); setForm({ name: v.name, email: v.email, phone: v.phone, status: v.status }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/admin/volunteers/${editing.id}`, form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (v) => {
    if (confirm('Delete this volunteer?')) { await api.delete(`/admin/volunteers/${v.id}`); load(); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Volunteers</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {volunteers.map((v) => (
              <tr key={v.id}>
                <td className="px-6 py-4 text-sm font-medium">{v.name}</td>
                <td className="px-6 py-4 text-sm">{v.email}</td>
                <td className="px-6 py-4 text-sm">{v.phone}</td>
                <td className="px-6 py-4 text-sm">{v.status}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(v)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(v)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Edit Volunteer">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded px-3 py-2" required />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-3 py-2" required />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
