import { useState } from 'react';
import api from '../../services/api';

export default function GetInvolved() {
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', phone: '', motivation: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setVolunteerForm({ ...volunteerForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/volunteers/register', volunteerForm);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Get Involved</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Become a Volunteer</h2>
          {submitted ? (
            <p className="text-green-600">Thank you for applying!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" placeholder="Full Name" value={volunteerForm.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="email" type="email" placeholder="Email" value={volunteerForm.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="phone" placeholder="Phone" value={volunteerForm.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <textarea name="motivation" placeholder="Why do you want to volunteer?" value={volunteerForm.motivation} onChange={handleChange} className="w-full border rounded px-3 py-2" required></textarea>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Apply Now</button>
            </form>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Donate Money</h2>
          <p className="text-gray-700 mb-4">Your financial support helps us organize blood camps and assist patients in need.</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Bank: Example Bank</li>
            <li>Account: 1234567890</li>
            <li>Branch: Dhaka</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
