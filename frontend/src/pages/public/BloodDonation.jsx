import { useState, useEffect } from 'react';
import api from '../../services/api';
import DonorCard from '../../components/public/DonorCard';
import BloodGroupFilter from '../../components/public/BloodGroupFilter';
import EmergencyRequestModal from '../../components/public/EmergencyRequestModal';

export default function BloodDonation() {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [district, setDistrict] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, district]);

  const fetchDonors = async () => {
    const params = {};
    if (bloodGroup) params.blood_group = bloodGroup;
    if (district) params.district = district;
    const res = await api.get('/blood-donors', { params });
    setDonors(res.data.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blood Donation</h1>
        <button onClick={() => setModalOpen(true)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Emergency Request
        </button>
      </div>

      <div className="mb-8 space-y-4">
        <BloodGroupFilter selected={bloodGroup} onChange={setBloodGroup} />
        <input
          type="text"
          placeholder="Search by district..."
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full md:w-1/3 border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>

      <EmergencyRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
