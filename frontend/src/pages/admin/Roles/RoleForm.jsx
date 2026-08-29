import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';

export default function RoleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', permissions: [] });
  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/admin/permissions').then((res) => setAllPermissions(res.data.data)).catch(() => setAllPermissions([]));
    if (id) {
      setLoading(true);
      api.get(`/admin/roles/${id}`).then((res) => {
        setForm({ name: res.data.data.name, permissions: res.data.data.permissions?.map(p => p.id) || [] });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await api.post(`/admin/roles/${id}`, form);
    else await api.post('/admin/roles', form);
    navigate('/admin/roles');
  };

  const togglePermission = (pid) => {
    setForm({
      ...form,
      permissions: form.permissions.includes(pid) ? form.permissions.filter(p => p !== pid) : [...form.permissions, pid],
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Role</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Role Name" className="w-full border rounded px-3 py-2" required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="max-h-64 overflow-y-auto border rounded p-2">
            {allPermissions.map((p) => (
              <label key={p.id} className="flex items-center space-x-2 py-1">
                <input type="checkbox" checked={form.permissions.includes(p.id)} onChange={() => togglePermission(p.id)} />
                <span className="text-sm">{p.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate('/admin/roles')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
