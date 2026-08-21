import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function ContactsManagement() {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: 'new' });

  const load = () => api.get('/admin/contact-messages').then((res) => setMessages(res.data.data));
  useEffect(() => { load(); }, []);

  const openEdit = (m) => { setEditing(m); setForm({ status: m.status }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/admin/contact-messages/${editing.id}`, form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (m) => {
    if (confirm('Delete this message?')) { await api.delete(`/admin/contact-messages/${m.id}`); load(); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 text-sm font-medium">{m.name}</td>
                <td className="px-6 py-4 text-sm">{m.email}</td>
                <td className="px-6 py-4 text-sm">{m.subject}</td>
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Update Status">
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={form.status} onChange={(e) => setForm({ status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
