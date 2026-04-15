# Journalist Role Redirect Fix

## Steps:
- [x] Step 1: Fix src/pages/journalist/Dashboard.jsx useEffect to not redirect or use Redux role (removed redundant localStorage auth check - ProtectedRoute handles it)
- [x] Step 2: Test RoleSelect → journalist click → stays on /journalist/dashboard
- [x] Step 3: Complete

Dev server updated. ProtectedRoute normalized role matching (trim/lower). Test /role → Journalist → /journalist/dashboard stable.

Task complete - journalist click now redirects correctly to dashboard, no home.
