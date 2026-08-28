import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function BannersManagement() {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', image_url: '', link_url: '', button_text: 'Learn More', sort_order: 0, is_active: true, status: 'active' });

  const load = () => api.get('/admin/banners').then((res) => setBanners(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: '', subtitle: '', image_url: '', link_url: '', button_text: 'Learn More', sort_order: 0, is_active: true, status: 'active' }); setShowModal(true); };
  const openEdit = (b) => { setEditing(b); setForm({ title: b.title, subtitle: b.subtitle || '', image_url: b.image_url, link_url: b.link_url || '', button_text: b.button_text || 'Learn More', sort_order: b.sort_order || 0, is_active: b.is_active, status: b.status }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/admin/banners/${editing.id}`, form);
    else await api.post('/admin/banners', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (b) => {
    if (confirm('Delete this banner?')) { await api.delete(`/admin/banners/${b.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Banner</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {banners.map((b) => (
              <tr key={b.id}>
                <td className="px-6 py-4 text-sm font-medium">{b.title || '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <img src={b.image_url} alt={b.title || 'Banner'} className="h-10 w-32 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">{b.link_url ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-sm">{b.sort_order}</td>
                <td className="px-6 py-4 text-sm">{b.is_active ? 'Active' : 'Inactive'}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(b)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button onClick={() => handleDelete(b)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Banner' : 'Add Banner'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full border rounded px-3 py-2" />
          <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Subtitle" className="w-full border rounded px-3 py-2" />
          <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" className="w-full border rounded px-3 py-2" required />
          <input value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="Link URL (optional)" className="w-full border rounded px-3 py-2" />
          <input value={form.button_text} onChange={(e) => setForm({ ...form, button_text: e.target.value })} placeholder="Button Text" className="w-full border rounded px-3 py-2" />
          <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value || '0') })} placeholder="Sort Order" className="w-full border rounded px-3 py-2" />
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
