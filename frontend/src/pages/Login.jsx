import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        "https://job-tracker-backend-lovatbackend.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      setMsg(res.data.message || "Login successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setMsg(
        err.response?.data?.message || "Login failed ❌ Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
     {/* Email Field */}
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

  {/* Password Field */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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


          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>

        {msg && <p className="login-message">{msg}</p>}
        <div className="login-footer">Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
