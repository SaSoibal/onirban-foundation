import { useEffect, useState } from 'react';
import Modal from '../../../components/admin/Modal';
import api from '../../../services/api';

export default function RolesList() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', permissions: [] });
  const [allPermissions, setAllPermissions] = useState([]);

  const loadRoles = () => api.get('/admin/roles').then((res) => setRoles(res.data.data));
  const loadPermissions = () => api.get('/admin/permissions').then((res) => setAllPermissions(res.data.data)).catch(() => setAllPermissions([]));
  useEffect(() => { loadRoles(); loadPermissions(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', permissions: [] }); setShowModal(true); };
  const openEdit = (r) => { setEditing(r); setForm({ name: r.name, permissions: r.permissions?.map(p => p.id) || [] }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.post(`/admin/roles/${editing.id}`, form);
    else await api.post('/admin/roles', form);
    setShowModal(false);
    loadRoles();
  };

  const handleDelete = async (r) => {
    if (confirm('Delete this role?')) { await api.delete(`/admin/roles/${r.id}`); loadRoles(); }
  };

  const togglePermission = (id) => {
    setForm({
      ...form,
      permissions: form.permissions.includes(id) ? form.permissions.filter(p => p !== id) : [...form.permissions, id],
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <button onClick={openCreate} className="bg-red-600 text-white px-4 py-2 rounded">Add Role</button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4 text-sm font-medium">{r.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{r.permissions?.length || 0} permissions</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => openEdit(r)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button onClick={() => handleDelete(r)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Role' : 'Add Role'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Role Name" className="w-full border rounded px-3 py-2" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="max-h-48 overflow-y-auto border rounded p-2">
              {allPermissions.map((p) => (
                <label key={p.id} className="flex items-center space-x-2 py-1">
                  <input type="checkbox" checked={form.permissions.includes(p.id)} onChange={() => togglePermission(p.id)} />
                  <span className="text-sm">{p.name}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </Modal>
    </div>
  );
}
