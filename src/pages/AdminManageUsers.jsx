import React, { useState } from "react";

const AdminManageUsers = () => {
  const [tab, setTab] = useState("all");

  const [users, setUsers] = useState([
    {
      _id: "1",
      name: "User 1",
      email: "user1@gmail.com",
      role: "reader",
      status: "active",
      verificationStatus: "approved",
    },
    {
      _id: "2",
      name: "User 2",
      email: "user2@gmail.com",
      role: "journalist",
      status: "blocked",
      verificationStatus: "pending",
    },
  ]);

  const pending = users.filter((u) => u.verificationStatus === "pending");

  const toggleBlock = (id) => {
    const updated = users.map((u) =>
      u._id === id
        ? {
            ...u,
            status: u.status === "blocked" ? "active" : "blocked",
          }
        : u
    );
    setUsers(updated);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 rounded-lg ${
            tab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Users
        </button>

        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-lg ${
            tab === "pending" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending Approvals
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {(tab === "all" ? users : pending).map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.status === "blocked"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="flex gap-2 py-2">

                  {tab === "pending" && (
                    <>
                      <button className="bg-green-500 text-white px-2 py-1 rounded">
                        Approve
                      </button>

                      <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                        Reject
                      </button>
                    </>
                  )}

                  {user.status === "active" ? (
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Unblock
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminManageUsers;