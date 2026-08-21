import { useEffect, useState } from 'react';
import Modal from '../../components/admin/Modal';
import api from '../../services/api';

const GROUPS = ['general', 'seo', 'social', 'contact', 'donation', 'header', 'footer'];

export default function SettingsManagement() {
  const [settings, setSettings] = useState([]);
  const [group, setGroup] = useState('general');
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    api.get(`/admin/settings?group=${group}`).then((res) => setSettings(res.data.data));
  }, [group]);

  const handleEdit = (setting) => {
    setEditing(setting);
    setValue(setting.value || '');
  };

  const handleSave = async () => {
    await api.put(`/admin/settings/${editing.key}`, { value });
    setEditing(null);
    setValue('');
    api.get(`/admin/settings?group=${group}`).then((res) => setSettings(res.data.data));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex space-x-2 mb-4">
        {GROUPS.map((g) => (
          <button key={g} onClick={() => setGroup(g)} className={`px-3 py-1 rounded ${group === g ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>
            {g}
          </button>
        ))}
      </div>
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
                <td className="px-6 py-4 text-sm text-gray-700">{String(s.value).slice(0, 50)}</td>
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
