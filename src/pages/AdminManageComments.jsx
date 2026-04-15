import React, { useState } from "react";

const AdminManageComments = () => {
  const [comments, setComments] = useState([
    {
      _id: "1",
      text: "Great article!",
      user: { name: "User 1" },
      article: { title: "News 1" },
      status: "visible",
    },
    {
      _id: "2",
      text: "Fake news!",
      user: { name: "User 2" },
      article: { title: "News 2" },
      status: "hidden",
    },
  ]);

  const toggleComment = (id) => {
    const updated = comments.map((c) =>
      c._id === id
        ? {
            ...c,
            status: c.status === "hidden" ? "visible" : "hidden",
          }
        : c
    );
    setComments(updated);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Comments</h2>
        <span className="text-sm text-gray-500">
          Total: {comments.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3">User</th>
              <th className="p-3">Article</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No comments found
                </td>
              </tr>
            ) : (
              comments.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">

                  <td className="p-3 max-w-[300px]">
                    <p className="truncate">
                      {c.text}
                    </p>
                  </td>

                  <td className="p-3 text-center">
                    {c.user?.name}
                  </td>

                  <td className="p-3 text-center max-w-[200px] truncate">
                    {c.article?.title}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        c.status === "visible"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleComment(c._id)}
                      className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      {c.status === "hidden" ? "Unhide" : "Hide"}
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

export default AdminManageComments;