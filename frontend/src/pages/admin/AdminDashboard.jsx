import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard/stats').then((res) => setStats(res.data.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  const cards = [
    { label: 'Total Donors', value: stats.total_donors },
    { label: 'Verified Donors', value: stats.verified_donors },
    { label: 'Active Blood Requests', value: stats.active_blood_requests },
    { label: 'Pending Volunteers', value: stats.pending_volunteers },
    { label: 'Unread Messages', value: stats.unread_messages },
    { label: 'Total Donations', value: `$${stats.total_donations}` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">{card.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {stats.recent_activity?.length === 0 ? <p>No recent activity.</p> : (
          <ul className="space-y-2">
            {stats.recent_activity?.map((log) => (
              <li key={log.id} className="border-b pb-2">
                <span className="font-semibold">{log.action}</span> - {log.subject_type} #{log.subject_id}
                <span className="text-gray-500 text-sm ml-2">{new Date(log.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
