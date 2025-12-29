import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.date} | {event.time}</p>
      <p>{event.location}</p>
      <p className="mt-4">{event.description}</p>
    </div>
  );
};

export default EventDetails;
