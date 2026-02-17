import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // simulate API call
  setTimeout(() => {
    setLoading(false);
  }, 2000);
};
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("https://job-tracker-backend-lovatbackend.vercel.app/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setMsg(res.data.message || "Login successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
<div className="login-container">
  <div className="login-card">

    <h2 className="login-title">Welcome Back 👋</h2>
    <p className="login-subtitle">Login to continue</p>

    <form className="login-form" onSubmit={handleSubmit}>

      {/* Email Field */}
      <div className="input-group">
        <input type="email" required />
        <label>Email</label>
      </div>

      {/* Password Field */}
      <div className="input-group password-group">
        <input
          type={showPassword ? "text" : "password"}
          required
        />
        <label>Password</label>

        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁"}
        </span>
      </div>

      <button className="login-btn" disabled={loading}>
        {loading ? <span className="spinner"></span> : "Login"}
      </button>

    </form>

    <div className="login-footer">
      Don't have an account? <a href="/register">Register</a>
    </div>

  </div>
</div>
