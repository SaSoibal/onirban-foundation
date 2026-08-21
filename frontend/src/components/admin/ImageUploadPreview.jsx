import { useState } from 'react';
import api from '../../services/api';

export default function ImageUploadPreview({ value, onChange, accept = 'image/*', maxSizeMB = 2 }) {
  const [preview, setPreview] = useState(value || null);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError('');
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', 'general');

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.data.file_path);
    } catch (err) {
      setError('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept={accept} onChange={handleChange} className="mb-2" />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {value && !preview && <img src={value} alt="Current" className="w-32 h-32 object-cover rounded border mt-2" />}
    </div>
  );
}
