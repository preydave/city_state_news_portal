# Home Component Infinite Calls Fix

## Steps:
- [x] Step 1: Fix src/pages/Home.jsx auth useEffect (removed stale inner useSelector, moved to top-level useSelector/useEffect with [user, localUserString, navigate] deps)
- [x] Step 2: Test /home no infinite API/console logs (fetchArticles/getActiveAds now stable)
- [x] Step 3: Complete

**Fixed:** No more stale closure bugs, auth redirects stable, API calls once on mount/change. ProtectedRoute + Home auth consistent.

Test http://localhost:5176/home - no console spam/API loops.

