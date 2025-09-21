import React, { useState } from "react";

function Booking() {
  const [eventId, setEventId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ eventId, quantity }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Booking successful!");
    } else {
      alert(JSON.stringify(data.errors || data.error));
    }
  };

  return (
    <div className="card p-4">
      <h2>Book an Event</h2>
      <form onSubmit={handleBooking}>
        <input className="form-control my-2" type="text" placeholder="Event ID"
          value={eventId} onChange={(e) => setEventId(e.target.value)} required />
        <input className="form-control my-2" type="number" min="1"
          value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <button className="btn btn-warning w-100" type="submit">Book</button>
      </form>
    </div>
  );
}

export default Booking;
