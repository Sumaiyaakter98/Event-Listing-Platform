import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  const bannerImage =
    event.image ||
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="min-h-screen container mx-auto">
     

      
      <div className="w-full relative bg-base-300">
        <img
          src={bannerImage}
          className="w-full max-h-[800px] object-cover object-top mx-auto bg-black"
          alt="Event Banner"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <div className="badge badge-secondary mb-4 px-4 py-3 font-bold uppercase">
              {event.category || "Upcoming Event"}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-primary pl-4">
              Details & Description
            </h3>
            <p className="text-gray-600 leading-8 text-lg">
              {event.description}
            </p>
          </div>

          
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl border border-base-200 sticky top-10">
              <div className="card-body gap-6">
                <div>
                  <h4 className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-2">
                    When
                  </h4>
                  <p className="text-lg font-semibold">
                    📅 {event.date} at {event.time || "18:00"}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-2">
                    Where
                  </h4>
                  <p className="text-lg font-semibold">📍 {event.location}</p>
                </div>

                <div className="pt-4 border-t">
                  <button className="btn btn-primary w-full text-white font-bold">
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
