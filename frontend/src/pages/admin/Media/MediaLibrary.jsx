import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.get('/admin/media').then((res) => setMedia(res.data.data)).catch(() => setMedia([]));
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', 'general');
    try {
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      load();
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this media?')) { await api.delete(`/media/${id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <label className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700">
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden relative group">
            <img src={item.file_path || item.url} alt={item.file_name || 'Media'} className="w-full h-48 object-cover" />
            <div className="p-2 flex justify-between items-center">
              <span className="text-xs text-gray-600 truncate flex-1">{item.file_name || item.title || 'File'}</span>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 text-xs hover:text-red-800">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
