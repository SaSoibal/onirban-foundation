import { useState } from 'react';
import api from '../../services/api';

export default function EmergencyRequestModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    requester_name: '',
    requester_phone: '',
    blood_group: 'A+',
    units_needed: 1,
    hospital_name: '',
    hospital_address: '',
    deadline: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/blood-requests', form);
      alert('Blood request submitted successfully');
      onClose();
      setForm({ requester_name: '', requester_phone: '', blood_group: 'A+', units_needed: 1, hospital_name: '', hospital_address: '', deadline: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Emergency Blood Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input name="requester_name" placeholder="Requester Name" value={form.requester_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          <input name="requester_phone" placeholder="Phone Number" value={form.requester_phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          <select name="blood_group" value={form.blood_group} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <input type="number" name="units_needed" placeholder="Units Needed" value={form.units_needed} onChange={handleChange} min="1" className="w-full border rounded px-3 py-2" required />
          <input name="hospital_name" placeholder="Hospital Name" value={form.hospital_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          <textarea name="hospital_address" placeholder="Hospital Address" value={form.hospital_address} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
          <input type="datetime-local" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <textarea name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
