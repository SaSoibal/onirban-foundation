import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get('/team').then((res) => setMembers(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-4 text-center">
            {member.photo && <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />}
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-red-600 text-sm">{member.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
