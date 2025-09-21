import React, { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <h2>Available Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Price:</strong> ${event.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
