import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events?per_page=12').then((res) => setEvents(res.data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
            {event.image && <img src={event.image} alt={event.title} className="w-full md:w-48 h-48 object-cover rounded" />}
            <div>
              <span className="text-sm text-red-600 font-semibold">{event.status}</span>
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <p className="text-gray-600">{new Date(event.event_date).toLocaleString()}</p>
              <p className="text-gray-700 mt-2">{event.location}</p>
              <Link to={`/events/${event.slug}`} className="text-red-600 font-semibold hover:underline mt-2 inline-block">
                View Details &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
