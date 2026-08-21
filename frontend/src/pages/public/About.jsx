import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function About() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    api.get('/pages/about').then((res) => setPage(res.data.data));
  }, []);

  if (!page) return <div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
