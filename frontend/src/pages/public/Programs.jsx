import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProgramCard from '../../components/public/ProgramCard';

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    api.get('/programs?per_page=12').then((res) => setPrograms(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
