import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDashboard,
  fetchMonthlyRevenue,
  fetchTopCampaigns,
  fetchLocationAnalytics,
} from "../store/slices/adminDashboardSlice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const AdminDashboardHome = () => {
  const dispatch = useDispatch();

  const {
    dashboard,
    revenue = [],
    campaigns = [],
    loading,
    error,
  } = useSelector((state) => state.adminDashboard || {});

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchTopCampaigns());
    dispatch(fetchLocationAnalytics());
  }, [dispatch]);

  // ✅ Loading state
  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  // ✅ Error state
  if (error) {
    return <div className="p-10 text-red-500 text-center">{error}</div>;
  }

  // ✅ Safe fallback
  if (!dashboard) {
    return <div className="p-10 text-center">No Data Found</div>;
  }

  // ✅ Safe destructuring
  const users = dashboard.users || {};
  const articles = dashboard.articles || {};
  const camp = dashboard.campaigns || {};
  const rev = dashboard.revenue || {};

  const userPieData = [
    { name: "Readers", value: users.readers || 0 },
    { name: "Journalists", value: users.journalists || 0 },
    { name: "Advertisers", value: users.advertisers || 0 },
  ];

  const articlePieData = [
    { name: "Published", value: articles.publishedArticles || 0 },
    { name: "Pending", value: articles.pendingArticles || 0 },
  ];

  const campaignPieData = [
    { name: "Active", value: camp.activeCampaigns || 0 },
    { name: "Completed", value: camp.completedCampaigns || 0 },
    { name: "Paused", value: camp.pausedCampaigns || 0 },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Users" value={users.totalUsers || 0} color="bg-blue-500" />
        <Card title="Total Articles" value={articles.totalArticles || 0} color="bg-green-500" />
        <Card title="Total Campaigns" value={camp.totalCampaigns || 0} color="bg-purple-500" />
        <Card title="Revenue" value={`₹${rev.totalRevenue || 0}`} color="bg-orange-500" />
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Top Campaigns</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaigns}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 PIE CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PieCard title="User Distribution" data={userPieData} />
        <PieCard title="Article Distribution" data={articlePieData} />
        <PieCard title="Campaign Distribution" data={campaignPieData} />
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Users" value={users.activeUsers || 0} />
        <StatCard title="Blocked Users" value={users.blockedUsers || 0} />
        <StatCard title="Pending Articles" value={articles.pendingArticles || 0} />
        <StatCard title="Published Articles" value={articles.publishedArticles || 0} />
        <StatCard title="Active Campaigns" value={camp.activeCampaigns || 0} />
        <StatCard title="Clicks" value={rev.totalClicks || 0} />
      </div>

    </div>
  );
};

export default AdminDashboardHome;

// ================= COMPONENTS =================

const PieCard = ({ title, data }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="font-semibold mb-4">{title}</h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const Card = ({ title, value, color }) => (
  <div className={`p-5 rounded-2xl text-white shadow ${color}`}>
    <h3 className="text-sm">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);