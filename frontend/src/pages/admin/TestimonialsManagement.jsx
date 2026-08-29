import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', designation: '', message: '', photo: '', status: 'active' });

  const load = () => api.get('/admin/testimonials').then((res) => setTestimonials(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', designation: '', message: '', photo: '', status: 'active' }); setShowModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ name: t.name, designation: t.designation || '', message: t.message || t.content || '', photo: t.photo || '', status: t.status || 'active' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.post(`/admin/testimonials/${editing.id}`, form);
    else await api.post('/admin/testimonials', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (t) => {
    if (confirm('Delete this testimonial?')) { await api.delete(`/admin/testimonials/${t.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Testimonial</button>
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
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 text-sm font-medium">{t.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{t.designation}</td>
                <td className="px-6 py-4 text-sm">{t.status}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(t)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button onClick={() => handleDelete(t)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
          <input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="Designation" className="w-full border rounded px-3 py-2" />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="w-full border rounded px-3 py-2 h-32" required></textarea>
          <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="Photo URL" className="w-full border rounded px-3 py-2" />
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
