import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/admin/gallery-categories/${id}`).then((res) => {
        setForm({ name: res.data.data.name, description: res.data.data.description || '' });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/admin/gallery-categories/${id}`, form);
    else await api.post('/admin/gallery-categories', form);
    navigate('/admin/gallery-categories');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Category</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full border rounded px-3 py-2 h-24"></textarea>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate('/admin/gallery-categories')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
