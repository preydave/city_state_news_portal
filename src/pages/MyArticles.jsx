import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticle,
  submitArticle,
  clearArticleState,
} from "../store/slices/articleSlice";
import { getDashboard } from "../store/slices/dashboardSlice";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { showToast } from "../store/slices/uiMessageSlice";

const MyArticles = () => {
  const dispatch = useDispatch();

  // ✅ SAFE SELECTORS
  const articles = useSelector((state) => state.dashboard?.articles || []);
  const { message, error } = useSelector((state) => state.articles);

  // ✅ FETCH DATA
  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  // ✅ HANDLE MESSAGES
  useEffect(() => {
    if (message) {
      dispatch(showToast({ message, type: "success" }));
      dispatch(getDashboard());
      dispatch(clearArticleState());
    }

    if (error) {
      dispatch(showToast({ message: error, type: "error" }));
      dispatch(clearArticleState());
    }
  }, [message, error, dispatch]);

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">My Articles</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">

        <table className="min-w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Views</th>
              <th className="p-3">Likes</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No articles found 📰
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article._id} className="border-t">

                  <td className="p-3">{article.title}</td>
                  <td className="p-3">{article.category}</td>

                  <td className="p-3">
                    <StatusBadge status={article.status} />
                  </td>

                  <td className="p-3">{article.views || 0}</td>
                  <td className="p-3">{article.likes?.length || 0}</td>

                  <td className="p-3">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3 flex gap-2 flex-wrap">

                    {/* EDIT */}
                    {(article.status === "draft" ||
                      article.status === "pending") && (
                      <Link
                        to={`/journalist/articles/edit/${article._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </Link>
                    )}

                    {/* VIEW */}
                    {article.status === "published" && (
                      <Link
                        to={`/article/${article._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </Link>
                    )}

                    {/* SUBMIT */}
                    {article.status === "draft" && (
                      <button
                        onClick={() => dispatch(submitArticle(article._id))}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Submit
                      </button>
                    )}

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this article?")) {
                          dispatch(deleteArticle(article._id));
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default MyArticles;