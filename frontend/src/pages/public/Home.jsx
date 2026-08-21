import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProgramCard from '../../components/public/ProgramCard';
import Hero from '../../components/public/Hero';

export default function Home() {
  const [programs, setPrograms] = useState([]);
  const [stats, setStats] = useState({ total_donors: 0, active_blood_requests: 0 });

  useEffect(() => {
    api.get('/programs?status=ongoing&per_page=6').then((res) => setPrograms(res.data.data));
    api.get('/settings?group=general').then((res) => {
      const settings = res.data.data.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
      setStats({
        total_donors: settings.total_donors || 0,
        active_blood_requests: settings.active_blood_requests || 0,
      });
    });
  }, []);

  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-3xl font-bold text-red-600">{stats.total_donors}</h3>
            <p className="text-gray-600">Registered Donors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-3xl font-bold text-red-600">{stats.active_blood_requests}</h3>
            <p className="text-gray-600">Active Requests</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>
    </div>
  );
}
