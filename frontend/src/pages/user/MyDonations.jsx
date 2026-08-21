import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MyDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get('/donations?per_page=20').then((res) => setDonations(res.data.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Donations</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((d) => (
              <tr key={d.id}>
                <td className="px-6 py-4">{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold">{d.amount} {d.currency}</td>
                <td className="px-6 py-4">{d.payment_method || '-'}</td>
                <td className="px-6 py-4">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
