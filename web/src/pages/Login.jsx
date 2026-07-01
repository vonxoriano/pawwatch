import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2200);
    } catch (err) {
      setError("Cannot connect to server. Make sure the backend is running.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <div style={styles.badge}>🐾 PawWatch</div>
        <h1 style={styles.heroTitle}>Welcome back</h1>
        <p style={styles.heroText}>
          Access your pet care dashboard and stay connected with your adopted companions.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Sign in</h2>
        <p style={styles.subtitle}>Enter your credentials to continue</p>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.link}>
          New here? <Link to="/register" style={styles.linkAccent}>Create account</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff7ed 0%, #fff3e0 100%)",
    padding: "24px",
    fontFamily: "Inter, Segoe UI, sans-serif",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "420px",
    marginRight: "40px",
    color: "#5a2d0c",
  },
  badge: {
    display: "inline-block",
    width: "fit-content",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "rgba(245, 124, 0, 0.12)",
    color: "#f57c00",
    fontWeight: 700,
    marginBottom: "16px",
  },
  heroTitle: {
    fontSize: "38px",
    margin: "0 0 10px",
    fontWeight: 700,
  },
  heroText: {
    fontSize: "16px",
    lineHeight: 1.6,
    margin: 0,
    color: "#8d5a3c",
  },
  card: {
    backgroundColor: "#fff",
    padding: "36px",
    borderRadius: "20px",
    boxShadow: "0 18px 40px rgba(122, 62, 25, 0.12)",
    width: "100%",
    maxWidth: "420px",
    border: "1px solid #f6e2d0",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "28px",
    color: "#5a2d0c",
    textAlign: "center",
  },
  subtitle: {
    margin: "0 0 20px",
    textAlign: "center",
    color: "#9a6d4f",
  },
  field: { marginBottom: "16px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#8a4b1f" },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #f2d3b6",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #f57c00 0%, #ff9800 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
    fontWeight: 600,
    boxShadow: "0 10px 20px rgba(245, 124, 0, 0.18)",
  },
  link: { textAlign: "center", marginTop: "18px", fontSize: "14px", color: "#8d5a3c" },
  linkAccent: { color: "#f57c00", fontWeight: 600, textDecoration: "none" },
  success: {
    backgroundColor: "#fff9eb",
    color: "#b35a00",
    padding: "10px 12px",
    borderRadius: "10px",
    marginBottom: "16px",
    fontSize: "14px",
    border: "1px solid #ffd6a2",
  },
  error: {
    backgroundColor: "#fff3f3",
    color: "#c62828",
    padding: "10px 12px",
    borderRadius: "10px",
    marginBottom: "16px",
    fontSize: "14px",
    border: "1px solid #f4c7c7",
  },
};
