import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/gallery?per_page=24').then((res) => setImages(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="rounded-lg overflow-hidden shadow">
            <img src={img.image} alt={img.title || 'Gallery'} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
