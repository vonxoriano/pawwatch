import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>🐾 PawWatch</div>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Placeholder screen for now</p>
        <p style={styles.message}>
          Welcome, <strong>{user?.email || "guest"}</strong>.<br />
          Your login and registration flow is working, and this page will be expanded later.
        </p>

        <div style={styles.boxes}>
          <div style={styles.box}>Pets</div>
          <div style={styles.box}>Adoption</div>
          <div style={styles.box}>Reports</div>
        </div>

        <button style={styles.button} onClick={handleLogout}>Logout</button>
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
  card: {
    backgroundColor: "#fff",
    padding: "36px",
    borderRadius: "20px",
    boxShadow: "0 18px 40px rgba(122, 62, 25, 0.12)",
    width: "100%",
    maxWidth: "560px",
    border: "1px solid #f6e2d0",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "rgba(245, 124, 0, 0.12)",
    color: "#f57c00",
    fontWeight: 700,
    marginBottom: "12px",
  },
  title: { fontSize: "30px", color: "#5a2d0c", margin: "0 0 6px" },
  subtitle: { fontSize: "15px", color: "#9a6d4f", margin: "0 0 16px" },
  message: { fontSize: "15px", color: "#8d5a3c", lineHeight: 1.6, marginBottom: "20px" },
  boxes: { display: "flex", gap: "12px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" },
  box: {
    padding: "12px 16px",
    backgroundColor: "#fff7ed",
    borderRadius: "10px",
    color: "#f57c00",
    fontWeight: 600,
    minWidth: "100px",
    border: "1px solid #f2d3b6",
  },
  button: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #f57c00 0%, #ff9800 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: 600,
  },
};