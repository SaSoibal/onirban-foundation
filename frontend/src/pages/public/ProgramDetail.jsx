import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    api.get(`/programs/${slug}`).then((res) => setProgram(res.data.data));
  }, [slug]);

  if (!program) return <div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {program.image && <img src={program.image} alt={program.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
      <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
      <span className="text-red-600 font-semibold">{program.status}</span>
      <div className="mt-6 prose" dangerouslySetInnerHTML={{ __html: program.description }} />
    </div>
  );
}
