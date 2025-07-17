import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.role);
      window.location.href = "/dashboard";
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      if (message === "User not found") {
        navigate("/register");
      }
    }
  }
  async function handleRegister() {
    navigate("/register");
  }

  switch (res.data.role) {
    case "user":
      navigate("/user-dashboard");
      break;
    case "admin":
      navigate("/admin-dashboard");
      break;
    case "director":
      navigate("/director-dashboard");
      break;

    default:
      // navigate('/dashboard';)
      break;
  }

  return (
    <div style={{ maxWidth: "300px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <form onSubmit={handleRegister}>
        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          Register
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Login;
