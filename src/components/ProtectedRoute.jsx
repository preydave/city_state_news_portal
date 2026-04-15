import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const reduxUser = useSelector((state) => state.auth.user);

  const localUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Prefer whichever source has a role set — handles post-login sync edge cases
  const user =
    (reduxUser?.role ? reduxUser : null) ||
    (localUser?.role ? localUser : null) ||
    reduxUser ||
    localUser;

  const normalizedRole = (user?.role || "").toString().trim().toLowerCase();


  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 allow role select page if role missing
  if (!normalizedRole) {
    if (location.pathname !== "/role") {
      return <Navigate to="/role" replace />;
    }
    return children;
  }

  // 🔥 if route has role restriction
  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some(
      (r) => r.toString().trim().toLowerCase() === normalizedRole
    );

    if (!isAllowed) {
      // ✅ redirect ONLY once based on role (no loop)
      if (normalizedRole === "admin") {
        return <Navigate to="/admin" replace />;
      }

      if (normalizedRole === "journalist") {
        return <Navigate to="/journalist/dashboard" replace />;
      }

      if (normalizedRole === "advertiser") {
        return <Navigate to="/home" replace />; // fallback (no route defined)
      }

      // default → reader
      return <Navigate to="/home" replace />;
    }
  }

  // ✅ allowed
  return children;
};

export default ProtectedRoute;