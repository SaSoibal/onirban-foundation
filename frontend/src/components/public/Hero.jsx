import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Save Lives Through Blood Donation</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join Onirban Foundation in our mission to ensure no one dies due to lack of blood.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/blood-donors" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Find Donors
          </Link>
          <Link to="/blood-request" className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-400">
            Request Blood
          </Link>
        </div>
      </div>
    </section>
  );
}
