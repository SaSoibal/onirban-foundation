import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function BloodRequestsManagement() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: 'active', notes: '' });

  const load = () => api.get('/admin/blood-requests').then((res) => setRequests(res.data.data));
  useEffect(() => { load(); }, []);

  const openEdit = (r) => { setEditing(r); setForm({ status: r.status, notes: r.notes || '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/admin/blood-requests/${editing.id}`, form);
    setShowModal(false);
    load();
  };

  const handleDelete = async (r) => {
    if (confirm('Delete this request?')) { await api.delete(`/admin/blood-requests/${r.id}`); load(); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blood Requests</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4 text-sm font-medium">{r.requester_name}</td>
                <td className="px-6 py-4 text-sm">{r.blood_group}</td>
                <td className="px-6 py-4 text-sm">{r.hospital_name}</td>
                <td className="px-6 py-4 text-sm">{r.status}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(r)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(r)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Edit Blood Request">
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" className="w-full border rounded px-3 py-2 h-32"></textarea>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
