import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        alert("Access denied or error");
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard 🚀</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{stats.users.totalUsers}</p>
        </div>

        <div style={cardStyle}>
          <h3>Journalists</h3>
          <p>{stats.users.journalists}</p>
        </div>

        <div style={cardStyle}>
          <h3>Articles</h3>
          <p>{stats.articles.totalArticles}</p>
        </div>

        <div style={cardStyle}>
          <h3>Campaigns</h3>
          <p>{stats.campaigns.totalCampaigns}</p>
        </div>

        <div style={cardStyle}>
          <h3>Revenue 💰</h3>
          <p>₹{stats.revenue.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#1e293b",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
};

export default AdminDashboard;