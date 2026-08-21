import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';
import api from '../../services/api';

export default function GalleryManagement() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', image: '', caption: '', category_id: '' });

  const load = () => api.get('/admin/gallery').then((res) => setItems(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: '', image: '', caption: '', category_id: '' }); setShowModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, image: item.image, caption: item.caption || '', category_id: item.category_id }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/admin/gallery/${editing.id}`, form);
    else await api.post('/admin/gallery', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (item) => {
    if (confirm('Delete this image?')) { await api.delete(`/admin/gallery/${item.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Image</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm font-medium truncate">{item.title || 'Untitled'}</span>
              <div>
                <button onClick={() => openEdit(item)} className="text-blue-600 text-sm mr-2">Edit</button>
                <button onClick={() => handleDelete(item)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Image' : 'Add Image'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full border rounded px-3 py-2" />
          <ImageUploadPreview value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Caption" className="w-full border rounded px-3 py-2" />
          <input type="number" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} placeholder="Category ID" className="w-full border rounded px-3 py-2" required />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
