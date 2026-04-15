import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Clock,
  TrendingUp,
  BarChart3,
  Menu,
  LogOut, // ✅ NEW ICON
} from "lucide-react";

const AdminDashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth
    navigate("/login"); // redirect
  };

  return (
    <div
      className={`h-screen bg-white shadow-lg fixed transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} flex flex-col`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-600">
            Admin Panel
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">

        <Section title="Main" collapsed={collapsed}>
          <SidebarLink to="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" collapsed={collapsed} />
        </Section>

        <Section title="Users" collapsed={collapsed}>
          <SidebarLink to="/admin/manage-users" icon={<Users size={18} />} label="All Users" collapsed={collapsed} />
        </Section>

        <Section title="Articles" collapsed={collapsed}>
          <SidebarLink to="/admin/manage-articles" icon={<FileText size={18} />} label="All Articles" collapsed={collapsed} />
        </Section>

        <Section title="Moderation" collapsed={collapsed}>
          <SidebarLink to="/admin/manage-comments" icon={<MessageSquare size={18} />} label="Comments" collapsed={collapsed} />
        </Section>

        <Section title="Campaigns" collapsed={collapsed}>
          <SidebarLink to="/admin/manage-campaigns" icon={<Clock size={18} />} label="Campaigns" collapsed={collapsed} />
        </Section>

        <Section title="Analytics" collapsed={collapsed}>
          <SidebarLink to="/admin/manage-revenue" icon={<TrendingUp size={18} />} label="Revenue" collapsed={collapsed} />
          <SidebarLink to="/admin/top-campaigns" icon={<BarChart3 size={18} />} label="Top Campaigns" collapsed={collapsed} />
        </Section>

      </div>

      {/* 🔥 LOGOUT SECTION (BOTTOM) */}
      <div className="p-2 border-t">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-100 transition-all relative"
        >
          <LogOut size={18} />

          {!collapsed && <span>Logout</span>}

          {/* TOOLTIP */}
          {collapsed && (
            <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Logout
            </span>
          )}
        </button>
      </div>

    </div>
  );
};

export default AdminDashboardSidebar;

// ================= COMPONENTS =================

const Section = ({ title, children, collapsed }) => (
  <div>
    {!collapsed && (
      <h2 className="text-xs font-semibold text-gray-400 uppercase px-3 mb-1">
        {title}
      </h2>
    )}
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);

const SidebarLink = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon}

      {!collapsed && <span>{label}</span>}

      {collapsed && (
        <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {label}
        </span>
      )}
    </NavLink>
  );
};