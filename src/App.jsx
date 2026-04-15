import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import RoleSelect from "./pages/auth/RoleSelect.jsx";

// USER
import Home from "./pages/Home.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

// ADMIN
import AdminLayout from "./components/AdminLayout.jsx";
import AdminDashboardHome from "./pages/AdminDashboardHome.jsx";
import AdminManageUsers from "./pages/AdminManageUsers.jsx";
import AdminManageArticles from "./pages/AdminManageArticles.jsx";
import AdminManageCampaigns from "./pages/AdminManageCampaigns.jsx";
import AdminManageComments from "./pages/AdminManageComments.jsx";
import AdminRevenue from "./pages/AdminRevenue.jsx";
import AdminTopCampaign from "./pages/AdminTopCampaign.jsx";

// JOURNALIST
import Dashboard from "./pages/journalist/Dashboard.jsx";
import MyArticles from "./pages/journalist/MyArticles.jsx";
import CreateArticle from "./pages/journalist/CreateArticle.jsx";
import Comments from "./pages/journalist/Comments.jsx";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔥 FIXED ROLE ROUTE */}
        <Route
          path="/role"
          element={
            <ProtectedRoute>
              <RoleSelect />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["reader"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/user" element={<Navigate to="/home" replace />} />
        <Route path="/reader" element={<Navigate to="/home" replace />} />

        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="manage-users" element={<AdminManageUsers />} />
          <Route path="manage-articles" element={<AdminManageArticles />} />
          <Route path="manage-campaigns" element={<AdminManageCampaigns />} />
          <Route path="manage-comments" element={<AdminManageComments />} />
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="top-campaigns" element={<AdminTopCampaign />} />
        </Route>

        {/* JOURNALIST */}
        <Route
          path="/journalist/dashboard"
          element={
            <ProtectedRoute allowedRoles={["journalist"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journalist/articles"
          element={
            <ProtectedRoute allowedRoles={["journalist"]}>
              <MyArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journalist/create"
          element={
            <ProtectedRoute allowedRoles={["journalist"]}>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journalist/comments"
          element={
            <ProtectedRoute allowedRoles={["journalist"]}>
              <Comments />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;