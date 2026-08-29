import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    api.get('/banners').then((res) => {
      const data = res.data.data || [];
      setBanners(data);
    }).catch(() => setBanners([]));
  }, []);

  const activeBanners = banners.filter((b) => b.is_active && b.status === 'active');

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (!activeBanners.length) return null;

  const getImageSrc = (banner) => {
    if (imageErrors[banner.id]) {
      return banner.image_api_url;
    }
    return banner.image_url || banner.image_api_url;
  };

  const handleImageError = (bannerId) => {
    setImageErrors((prev) => ({ ...prev, [bannerId]: true }));
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {activeBanners.map((b, idx) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {b.image_url ? (
            <img
              src={getImageSrc(b)}
              alt={b.title || 'Banner'}
              className="w-full h-full object-cover"
              onError={() => handleImageError(b.id)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-600 to-red-800" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl">
              {b.title && <h2 className="text-4xl md:text-6xl font-bold mb-4">{b.title}</h2>}
              {b.subtitle && <p className="text-xl md:text-2xl mb-6">{b.subtitle}</p>}
              {b.link_url && (
                <a
                  href={b.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  {b.button_text || 'Learn More'}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {activeBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition ${idx === current ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
