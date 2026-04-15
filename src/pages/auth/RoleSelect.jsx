import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleRole = (role) => {
    console.log("🎯 [RoleSelect] CLICKED:", role);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      if (!userData || Object.keys(userData).length === 0) {
        navigate("/login");
        return;
      }

      const updatedUser = { ...userData, role };

      // ✅ SAVE ROLE
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("💾 [RoleSelect] Saved:", updatedUser);

      // 🔥 NO REDUX DISPATCH (REMOVED → caused loop)

      // 🔥 DIRECT NAVIGATION (works perfectly now)
      if (role === "reader") {
        navigate("/home", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "journalist") {
        navigate("/journalist/dashboard", { replace: true });
      } else if (role === "advertiser") {
        navigate("/home", { replace: true }); // fallback (route not defined)
      }

    } catch (error) {
      console.error("❌ Role error:", error);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center mb-12 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Select Role
        </h1>
        <p className="text-xl text-gray-700 max-w-md mx-auto leading-relaxed">
          Choose your account type to access the right dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">

        {/* Reader */}
        <button
          onClick={() => handleRole("reader")}
          className="group relative p-8 bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-3xl shadow-2xl transform hover:-translate-y-3 transition-all duration-500 h-52 flex flex-col items-center justify-center"
          disabled={loading}
        >
          <div className="text-5xl mb-6">👁️</div>
          <h3 className="text-2xl font-black mb-3">Reader</h3>
          <p className="text-base opacity-95">News & Articles</p>
        </button>

        {/* Journalist */}
        <button
          onClick={() => handleRole("journalist")}
          className="group relative p-8 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl shadow-2xl transform hover:-translate-y-3 transition-all duration-500 h-52 flex flex-col items-center justify-center"
          disabled={loading}
        >
          <div className="text-5xl mb-6">✍️</div>
          <h3 className="text-2xl font-black mb-3">Journalist</h3>
          <p className="text-base opacity-95">Write Dashboard</p>
        </button>

        {/* Admin */}
        <button
          onClick={() => handleRole("admin")}
          className="group relative p-8 bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-3xl shadow-2xl transform hover:-translate-y-3 transition-all duration-500 h-52 flex flex-col items-center justify-center"
          disabled={loading}
        >
          <div className="text-5xl mb-6">⚙️</div>
          <h3 className="text-2xl font-black mb-3">Admin</h3>
          <p className="text-base opacity-95">Control Panel</p>
        </button>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate("/home")} 
          className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
        >
          Skip to Home
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;