import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ActivityLogsManagement() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/admin/activity-logs').then((res) => setLogs(res.data.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 text-sm">{log.user?.name || 'System'}</td>
                <td className="px-6 py-4 text-sm">{log.action}</td>
                <td className="px-6 py-4 text-sm">{log.subject_type} #{log.subject_id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
