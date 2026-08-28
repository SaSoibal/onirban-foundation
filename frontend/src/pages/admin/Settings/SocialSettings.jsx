import { useEffect, useState } from 'react';
import Modal from '../../../components/admin/Modal';
import api from '../../../services/api';

export default function SocialSettings() {
  const [settings, setSettings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState('');

  const load = () => api.get('/admin/settings?group=social').then((res) => setSettings(res.data.data));
  useEffect(() => { load(); }, []);

  const handleEdit = (s) => {
    setEditing(s);
    setValue(s.value || '');
  };

  const handleSave = async () => {
    await api.put(`/admin/settings/${editing.key}`, { value });
    setEditing(null);
    setValue('');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Social Settings</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.map((s) => (
              <tr key={s.key}>
                <td className="px-6 py-4 text-sm font-medium">{s.key}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{String(s.value).slice(0, 100)}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={`Edit ${editing?.key}`}>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} className="w-full border rounded p-2 h-32" />
        <button onClick={handleSave} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Save</button>
      </Modal>
    </div>
  );
}
