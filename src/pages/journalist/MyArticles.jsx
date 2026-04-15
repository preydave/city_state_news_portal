import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  deleteArticle, // ✅ ADD
} from "../../store/slices/articleSlice";

const MyArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((s) => s.articles?.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // ✅ DELETE FUNCTION
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this article?");
    if (!confirmDelete) return;

    dispatch(deleteArticle(id));
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="ml-[220px] p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">📰 My Articles</h2>

        <div className="bg-white p-5 rounded-xl shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Title</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {articles?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td>{item.title}</td>
                  <td>{item.views || 0}</td>

                  <td className="space-x-2">
                    {/* EDIT */}
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>

                    {/* 🔥 DELETE FIX */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!articles?.length && (
            <p className="text-gray-500 mt-3">No articles found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyArticles;