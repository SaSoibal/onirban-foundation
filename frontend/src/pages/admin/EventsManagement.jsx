import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';
import api from '../../services/api';

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', description: '', event_date: '', location: '', status: 'upcoming', image: '' });

  const load = () => api.get('/admin/events').then((res) => setEvents(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: '', slug: '', description: '', event_date: '', location: '', status: 'upcoming', image: '' }); setShowModal(true); };
  const openEdit = (ev) => { setEditing(ev); setForm({ title: ev.title, slug: ev.slug, description: ev.description || '', event_date: ev.event_date?.slice(0, 16) || '', location: ev.location || '', status: ev.status, image: ev.image || '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/admin/events/${editing.id}`, form);
    else await api.post('/admin/events', form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (ev) => {
    if (confirm('Delete this event?')) { await api.delete(`/admin/events/${ev.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Event</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="px-6 py-4 text-sm font-medium">{ev.title}</td>
                <td className="px-6 py-4 text-sm">{new Date(ev.event_date).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">{ev.location}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(ev)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(ev)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Event' : 'Add Event'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full border rounded px-3 py-2" required />
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full border rounded px-3 py-2" required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full border rounded px-3 py-2 h-24"></textarea>
          <input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="w-full border rounded px-3 py-2" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ImageUploadPreview value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
