import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setRole } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔑 [Login] Submitting:", formData);

    const res = await dispatch(loginUser(formData));
    console.log("📤 [Login] Response:", res);

    if (res.meta.requestStatus === "fulfilled") {
      console.log("✅ [Login] SUCCESS");

      const originalUser = res.payload?.user || res.payload;

      // Create a mutable copy
      let userData = { ...originalUser };

      // Hardcoded admin assignment on frontend
      if (userData.email === "admin@gmail.com") {
        userData.role = "admin";
        // ✅ Sync BOTH localStorage AND Redux state
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setRole("admin")); // <-- This was missing — caused ProtectedRoute to fail
        console.log("💾 [Login] Admin user saved & Redux synced:", userData);
        navigate("/admin", { replace: true });
      } else {
        // For non-admin: clear role, let RoleSelect assign it
        delete userData.role;
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("💾 [Login] Non-admin user saved:", userData);
        navigate("/role", { replace: true });
      }

      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-10 border border-white/50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            City&State News
          </h1>
          <p className="text-xl text-gray-700 font-semibold">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:ring-3 focus:ring-red-500 focus:border-transparent transition-all shadow-sm placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:ring-3 focus:ring-red-500 focus:border-transparent transition-all shadow-sm placeholder-gray-400"
              required
            />
          </div>

          {/* Messages */}
          {message && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-xl shadow-sm">
              <div className="font-medium">{message}</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-xl shadow-sm">
              <div className="font-medium">{error}</div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Register Link */}
        <div className="text-center mt-10 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-all font-medium"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Debug */}
        <div className="mt-6 p-3 bg-gray-100 rounded-xl text-xs text-gray-600">
          <strong>Debug:</strong> localStorage.user = {localStorage.getItem("user") ? "EXISTS" : "EMPTY"}
          <br/>
          Role = {JSON.parse(localStorage.getItem("user") || "{}")?.role || "NONE"}
        </div>

      </div>
    </div>
  );
};

export default Login;