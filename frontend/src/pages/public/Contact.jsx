import { useState } from 'react';
import api from '../../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/contact', form);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      {success && <p className="text-green-600 mb-4 text-center">Message sent successfully!</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2" required></textarea>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Send Message</button>
      </form>
    </div>
  );
}
