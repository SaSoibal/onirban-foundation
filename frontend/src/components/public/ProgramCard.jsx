import { Link } from 'react-router-dom';

export default function ProgramCard({ program }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {program.image && (
        <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <span className="text-xs font-semibold text-red-600 uppercase">{program.status}</span>
        <h3 className="text-xl font-bold mt-1 mb-2">{program.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.short_description || program.description}</p>
        <Link to={`/programs/${program.slug}`} className="text-red-600 font-semibold hover:underline">
          Learn More &rarr;
        </Link>
      </div>
    </div>
  );
}
