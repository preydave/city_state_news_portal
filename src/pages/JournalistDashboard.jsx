import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../store/slices/dashboardSlice";

const JournalistDashboard = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.dashboard?.data);
  const loading = useSelector((state) => state.dashboard?.loading);
  const error = useSelector((state) => state.dashboard?.error);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: "20px" }}>Error: {error}</h2>;

  return (
    <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Journalist Dashboard</h1>

      {/* 🔥 CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h3>Total Articles</h3>
          <p style={numberStyle}>{data?.totalArticles}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Views</h3>
          <p style={numberStyle}>{data?.totalViews}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Likes</h3>
          <p style={numberStyle}>{data?.totalLikes}</p>
        </div>
      </div>

      {/* 🔥 RECENT ARTICLES */}
      <div style={sectionStyle}>
        <h2>📰 Recent Articles</h2>

        {data?.recentArticles?.length > 0 ? (
          data.recentArticles.map((item, index) => (
            <div key={index} style={articleStyle}>
              <span>{item.title}</span>
              <span>{item.views} views</span>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

// 🔥 STYLES
const cardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
};

const sectionStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const articleStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

export default JournalistDashboard;