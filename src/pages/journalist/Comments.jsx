import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

const Comments = () => {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1>💬 Comments</h1>
        <p>No comments yet</p>
      </div>
    </>
  );
};

export default Comments;