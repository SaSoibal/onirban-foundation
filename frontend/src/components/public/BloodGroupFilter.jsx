const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function BloodGroupFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1 rounded-full text-sm border ${!selected ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}
      >
        All
      </button>
      {BLOOD_GROUPS.map((group) => (
        <button
          key={group}
          onClick={() => onChange(group)}
          className={`px-3 py-1 rounded-full text-sm border ${selected === group ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
