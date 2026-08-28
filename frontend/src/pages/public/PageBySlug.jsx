import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function PageBySlug() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    api.get(`/pages/${slug}`).then((res) => setPage(res.data.data)).catch(() => setPage(null));
  }, [slug]);

  if (!page) return <div className="max-w-4xl mx-auto px-4 py-12">Page not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
