import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">Evenat Booking</Link>
        <div>
          <Link to="/" className="btn btn-outline-light mx-1">Events</Link>
          <Link to="/login" className="btn btn-outline-light mx-1">Login</Link>
          <Link to="/register" className="btn btn-outline-light mx-1">Register</Link>
          <Link to="/booking" className="btn btn-outline-light mx-1">Booking</Link>
          <Link to="/admin" className="btn btn-outline-warning mx-1">Admin</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
