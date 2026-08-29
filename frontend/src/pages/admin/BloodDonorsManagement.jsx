import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

export default function BloodDonorsManagement() {
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', blood_group: 'O+', district: '', status: 'active' });

  const load = () => api.get('/admin/blood-donors').then((res) => setDonors(res.data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', phone: '', blood_group: 'O+', district: '', status: 'active' }); setShowModal(true); };
  const openEdit = (d) => { setEditing(d); setForm({ name: d.name, phone: d.phone, blood_group: d.blood_group, district: d.district, status: d.status }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.post(`/admin/blood-donors/${editing.id}`, form);
    else await api.post('/admin/blood-donors', form);
    setShowModal(false);
    load();
  };

  const handleVerify = async (donor) => {
    await api.post(`/admin/blood-donors/${donor.id}/verify`, { is_verified: !donor.is_verified });
    load();
  };

  const handleDelete = async (donor) => {
    if (confirm('Delete this donor?')) { await api.delete(`/admin/blood-donors/${donor.id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blood Donors</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Donor</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td className="px-6 py-4 text-sm font-medium">{donor.name}</td>
                <td className="px-6 py-4 text-sm">{donor.blood_group}</td>
                <td className="px-6 py-4 text-sm">{donor.district}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${donor.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {donor.is_verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(donor)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleVerify(donor)} className="text-green-600 hover:text-green-800 mr-2">
                    {donor.is_verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button onClick={() => handleDelete(donor)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Donor' : 'Add Donor'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-3 py-2" required />
          <select value={form.blood_group} onChange={(e) => setForm({ ...form, blood_group: e.target.value })} className="w-full border rounded px-3 py-2">
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <input value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="District" className="w-full border rounded px-3 py-2" required />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-3 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
