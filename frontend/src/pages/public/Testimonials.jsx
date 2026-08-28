import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get('/testimonials?per_page=12').then((res) => setTestimonials(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4 italic">&ldquo;{t.message || t.content || ''}&rdquo;</p>
            <div className="flex items-center gap-3">
              {t.photo && <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.designation || ''}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
