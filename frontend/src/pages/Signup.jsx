import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo"><Dumbbell size={30} /></div>
        <h1>Create Account</h1>
        <p>Start your fitness journey with FitTrack AI.</p>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

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
          placeholder="Minimum 8 characters"
          minLength={8}
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;