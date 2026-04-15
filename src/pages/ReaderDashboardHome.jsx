import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../store/slices/dashboardSlice"; // ✅ FIX
import { Link } from "react-router-dom";

const ReaderHome = () => {
  const [likedVisible, setLikedVisible] = useState(3);
  const [savedVisible, setSavedVisible] = useState(3);

  const dispatch = useDispatch();

  // ✅ FIX (state change only)
  const dashboard = useSelector((state) => state.dashboard);

  // ✅ SAFE DATA (UI SAME rahega)
  const recommended = dashboard?.data?.recommended || [];
  const likedArticles = dashboard?.data?.likedArticles || [];
  const savedArticles = dashboard?.data?.savedArticles || [];
  const comments = dashboard?.data?.comments || [];
  const activitySummary = dashboard?.data?.activitySummary || {};

  useEffect(() => {
    dispatch(fetchDashboard()); // ✅ FIX
  }, [dispatch]);

  return (
    <div className="space-y-10">

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm">Total Likes</h3>
          <p className="text-3xl font-bold">{activitySummary?.totalLikes}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm">Total Comments</h3>
          <p className="text-3xl font-bold">{activitySummary?.totalComments}</p>
        </div>

      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">📍 Recommended</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended?.map(a => (
            <div key={a._id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

              <img src={a.images?.[0]} alt="" className="w-full h-40 object-cover" />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{a.city}, {a.state}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>

                <Link to={`/article/${a._id}`} className="text-blue-600 font-semibold hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ❤️ LIKED, 🔖 SAVED, 💬 COMMENTS — SAME AS YOUR ORIGINAL */}
    </div>
  );
};

export default ReaderHome;