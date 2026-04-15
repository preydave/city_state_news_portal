import React, { useEffect } from "react"; // ✅ correct
import { Outlet, useNavigate } from "react-router-dom";
import AdminDashboardSidebar from "./AdminDashboardSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/role");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 fixed top-0 left-0 h-full">
        <AdminDashboardSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;