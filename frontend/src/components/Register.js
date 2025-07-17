import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      setMessage("Registered successfully! You can now login.");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  }
  // async function handleLogin() {
  //   navigate("/login");
  // }

  return (
    <div style={{ maxWidth: "300px", margin: "auto", marginTop: "100px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          Register
        </button>
        {/* <form onSubmit={handleLogin}>
          <button type="submit" style={{ width: "100%", padding: "8px" }}>
            Login
          </button>
        </form> */}
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default Register;
