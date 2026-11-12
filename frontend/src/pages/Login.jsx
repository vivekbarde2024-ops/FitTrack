import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      localStorage.setItem("fittrackToken", result.token);
      localStorage.setItem("fittrackUser", JSON.stringify(result.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo"><Dumbbell size={30} /></div>
        <h1>Welcome Back</h1>
        <p>Sign in to continue your fitness journey.</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;