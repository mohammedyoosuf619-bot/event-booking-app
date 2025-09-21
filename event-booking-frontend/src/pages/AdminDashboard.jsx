import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", date: "", location: "", price: "" });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      alert("Access denied: Admins only");
      return;
    }
    fetchEvents();
    fetchBookings();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();
    setEvents(data);
  };

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:3000/bookings", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setBookings(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Event added");
      setForm({ name: "", description: "", date: "", location: "", price: "" });
      fetchEvents();
    } else {
      alert("Failed to add event");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      alert("Event deleted");
      fetchEvents();
    } else {
      alert("Failed to delete event");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="card p-3 mb-4">
        <h4>Add Event</h4>
        <form onSubmit={handleSubmit}>
          <input className="form-control my-1" placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="form-control my-1" placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="form-control my-1" type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input className="form-control my-1" placeholder="Location" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <input className="form-control my-1" type="number" placeholder="Price" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <button className="btn btn-success mt-2" type="submit">Add Event</button>
        </form>
      </div>

      <h4>Events</h4>
      <ul className="list-group mb-4">
        {events.map((e) => (
          <li key={e._id} className="list-group-item d-flex justify-content-between align-items-center">
            {e.name} - {e.date?.slice(0, 10)} - ${e.price}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h4>All Bookings</h4>
      <ul className="list-group">
        {bookings.map((b) => (
          <li key={b._id} className="list-group-item">
            {b.user?.username} booked {b.quantity} for {b.event?.name} - Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
