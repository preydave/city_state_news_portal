import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div
        className={`bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900 
        text-white p-4 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"}`}
      >

        {/* TOGGLE */}
        <button
          className="mb-6 text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* LOGO */}
        {isOpen && (
          <h1 className="text-2xl font-bold mb-6 text-purple-300">
            📰 Admin Panel
          </h1>
        )}

        {/* MENU */}
        <ul className="space-y-4 font-medium">

          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              📊 {isOpen && "Dashboard"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/add-news"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              ➕ {isOpen && "Add News"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-news"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              📰 {isOpen && "Manage News"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/categories"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              📂 {isOpen && "Categories"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              👤 {isOpen && "Users"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 hover:text-purple-300 transition"
            >
              ⚙️ {isOpen && "Settings"}
            </Link>
          </li>

          <li>
            <button className="flex items-center gap-3 bg-red-500 px-3 py-2 rounded hover:bg-red-600 w-full">
              🚪 {isOpen && "Logout"}
            </button>
          </li>

        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100">

        {/* HEADER */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
          <span className="text-gray-600">Welcome, Admin 👋</span>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
};