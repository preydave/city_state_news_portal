import React, { useEffect, useState } from "react";

const AdminManageCampaigns = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [campaigns, setCampaigns] = useState([
    {
      _id: "1",
      title: "Campaign A",
      advertiser: { name: "Company A" },
      status: "pending",
    },
    {
      _id: "2",
      title: "Campaign B",
      advertiser: { name: "Company B" },
      status: "approved",
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const pending = campaigns.filter((c) => c.status === "pending");

  const handleApprove = (id) => {
    const updated = campaigns.map((c) =>
      c._id === id ? { ...c, status: "approved" } : c
    );
    setCampaigns(updated);
  };

  const handleReject = (id) => {
    const updated = campaigns.map((c) =>
      c._id === id ? { ...c, status: "rejected" } : c
    );
    setCampaigns(updated);
  };

  const displayedCampaigns =
    activeTab === "all" ? campaigns : pending;

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold">Manage Campaigns</h1>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All Campaigns
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded ${
            activeTab === "pending"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending Campaigns
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Title</th>
              <th className="text-center p-2">Advertiser</th>
              <th className="text-center p-2">Status</th>
              {activeTab === "pending" && (
                <th className="text-center p-2">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {displayedCampaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4 text-gray-400"
                >
                  No campaigns
                </td>
              </tr>
            ) : (
              displayedCampaigns.map((c) => (
                <tr key={c._id} className="border-b">

                  <td className="p-2">{c.title}</td>

                  <td className="text-center p-2">
                    {c.advertiser?.name}
                  </td>

                  <td className="text-center p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : c.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {activeTab === "pending" && (
                    <td className="text-center p-2 flex gap-2 justify-center">

                      <button
                        onClick={() => setSelectedCampaign(c)}
                        className="bg-gray-800 text-white px-2 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleApprove(c._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(c._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>

                    </td>
                  )}

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <h2 className="font-bold mb-2">{selectedCampaign.title}</h2>
            <p>Advertiser: {selectedCampaign.advertiser?.name}</p>

            <button
              onClick={() => setSelectedCampaign(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminManageCampaigns;