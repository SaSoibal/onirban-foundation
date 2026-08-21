export default function DonorCard({ donor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      {donor.photo && (
        <img src={donor.photo} alt={donor.name} className="w-16 h-16 rounded-full object-cover" />
      )}
      <div>
        <h3 className="font-bold text-lg">{donor.name}</h3>
        <p className="text-red-600 font-semibold">{donor.blood_group}</p>
        <p className="text-gray-600 text-sm">{donor.district}</p>
      </div>
    </div>
  );
}
