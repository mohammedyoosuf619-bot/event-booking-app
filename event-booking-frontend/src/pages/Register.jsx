import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registered successfully!");
    } else {
      alert(JSON.stringify(data.errors || data.error));
    }
  };

  return (
    <div className="card p-4">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input className="form-control my-2" type="text" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="form-control my-2" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control my-2" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
