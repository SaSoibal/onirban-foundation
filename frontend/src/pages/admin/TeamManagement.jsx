import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';
import api from '../../services/api';

export default function TeamManagement() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', designation: '', bio: '', photo: '', email: '', phone: '', sort_order: 0, status: 'active' });

  const load = () => api.get('/admin/team').then((res) => setMembers(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', designation: '', bio: '', photo: '', email: '', phone: '', sort_order: 0, status: 'active' }); setShowModal(true); };
  const openEdit = (m) => { setEditing(m); setForm({ name: m.name, designation: m.designation, bio: m.bio || '', photo: m.photo || '', email: m.email || '', phone: m.phone || '', sort_order: m.sort_order, status: m.status }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/admin/team/${editing.id}`, form);
    else await api.post('/admin/team', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (m) => {
    if (confirm('Delete this member?')) { await api.delete(`/admin/team/${m.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Member</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 text-sm font-medium">{m.name}</td>
                <td className="px-6 py-4 text-sm">{m.designation}</td>
                <td className="px-6 py-4 text-sm">{m.status}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(m)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(m)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
          <input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="Designation" className="w-full border rounded px-3 py-2" required />
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" className="w-full border rounded px-3 py-2 h-24"></textarea>
          <ImageUploadPreview value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded px-3 py-2" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-3 py-2" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
