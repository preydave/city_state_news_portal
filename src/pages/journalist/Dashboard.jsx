import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboard } from "../../store/slices/dashboardSlice";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((s) => s.dashboard?.data);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // ✅ FIXED: Removed localStorage check (ProtectedRoute handles auth)
  // Keep only dashboard data fetch
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // Dummy chart data
  const chartData = [
    { name: "Mon", views: 100 },
    { name: "Tue", views: 200 },
    { name: "Wed", views: 300 },
    { name: "Thu", views: 250 },
    { name: "Fri", views: 400 },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="ml-[220px] p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">📊 Dashboard</h2>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
            <h4>Total Articles</h4>
            <h2 className="text-2xl font-bold">
              {data?.totalArticles || 0}
            </h2>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow">
            <h4>Total Views</h4>
            <h2 className="text-2xl font-bold">
              {data?.totalViews || 0}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">
            <h4>Total Likes</h4>
            <h2 className="text-2xl font-bold">
              {data?.totalLikes || 0}
            </h2>
          </div>
        </div>

        {/* 📊 CHART */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="mb-4 font-semibold">📈 Weekly Views</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 📰 RECENT ARTICLES */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Recent Articles</h3>

          {data?.recentArticles?.length > 0 ? (
            data.recentArticles.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{item.title}</span>
                <span>{item.views} views</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No articles yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

