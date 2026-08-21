import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function UserDashboard() {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    api.get('/donations?per_page=5').then((res) => setDonations(res.data.data));
    api.get('/volunteers?per_page=5').then((res) => setVolunteers(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
          {donations.length === 0 ? <p>No donations yet.</p> : (
            <ul className="space-y-2">
              {donations.map((d) => (
                <li key={d.id} className="flex justify-between border-b pb-2">
                  <span>{d.donor_name}</span>
                  <span className="font-semibold">{d.amount} {d.currency}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">My Volunteer Applications</h2>
          {volunteers.length === 0 ? <p>No applications yet.</p> : (
            <ul className="space-y-2">
              {volunteers.map((v) => (
                <li key={v.id} className="flex justify-between border-b pb-2">
                  <span>{v.name}</span>
                  <span className="text-sm text-gray-600">{v.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
