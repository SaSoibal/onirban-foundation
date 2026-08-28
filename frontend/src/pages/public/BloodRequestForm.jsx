import { useState } from 'react';
import api from '../../services/api';

export default function BloodRequestForm() {
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/blood-requests', form);
      setSuccess(true);
      setForm({ requester_name: '', requester_phone: '', blood_group: 'A+', units_needed: 1, hospital_name: '', hospital_address: '', deadline: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Emergency Blood Request</h1>
      {success && <p className="text-green-600 mb-4 text-center">Request submitted successfully!</p>}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="requester_name" placeholder="Requester Name" value={form.requester_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          <input name="requester_phone" placeholder="Phone Number" value={form.requester_phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="blood_group" value={form.blood_group} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <input type="number" name="units_needed" placeholder="Units Needed" value={form.units_needed} onChange={handleChange} min="1" className="w-full border rounded px-3 py-2" required />
        </div>
        <input name="hospital_name" placeholder="Hospital Name" value={form.hospital_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <textarea name="hospital_address" placeholder="Hospital Address" value={form.hospital_address} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
        <input type="datetime-local" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <textarea name="reason" placeholder="Reason for Request" value={form.reason} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Submit Request</button>
      </form>
    </div>
  );
}
