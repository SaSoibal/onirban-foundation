import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${slug}`).then((res) => setEvent(res.data.data)).catch(() => setEvent(null));
  }, [slug]);

  if (!event) return <div className="max-w-4xl mx-auto px-4 py-12">Event not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {event.image && <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <span className="text-red-600 font-semibold">{event.status}</span>
      <p className="text-gray-600 mt-2">{new Date(event.event_date).toLocaleString()}</p>
      <p className="text-gray-700 mt-1">{event.location}</p>
      <div className="mt-6 prose" dangerouslySetInnerHTML={{ __html: event.description }} />
      <Link to="/events" className="text-red-600 font-semibold hover:underline mt-6 inline-block">&larr; Back to Events</Link>
    </div>
  );
}
