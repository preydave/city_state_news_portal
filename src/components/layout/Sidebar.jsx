import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    // token remove
    localStorage.removeItem("token");

    // redirect to login
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h2>📰 Journalist</h2>

      <Link to="/journalist/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/journalist/articles" style={styles.link}>My Articles</Link>
      <Link to="/journalist/create" style={styles.link}>Create Article</Link>
      <Link to="/journalist/comments" style={styles.link}>Comments</Link>

      {/* 🔥 LOGOUT BUTTON */}
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
  },
  link: {
    display: "block",
    margin: "15px 0",
    color: "#fff",
    textDecoration: "none",
  },
  logoutBtn: {
    marginTop: "auto", // 🔥 bottom pe push karega
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Sidebar;