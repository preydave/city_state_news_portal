import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

const CreateArticle = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    city: "",
    state: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const cities = ["Ahmedabad", "Surat", "Rajkot", "Vadodara"];
  const states = ["Gujarat", "Maharashtra", "Rajasthan"];
  const categories = ["Politics", "Sports", "Technology", "Business", "Entertainment"];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 AI HEADLINE
  const generateHeadline = async () => {
    if (!form.content) {
      alert("Content likh pehle ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/ai/headline", {
        content: form.content,
      });

      setForm({ ...form, title: res.data.headline });

    } catch (err) {
      alert("AI Error ❌");
    }
  };

  // 🔥 AI SUMMARY
  const generateSummary = async () => {
    if (!form.content) {
      alert("Content likh pehle ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/ai/summary", {
        content: form.content,
      });

      setAiSummary(res.data.summary);

    } catch (err) {
      alert("AI Error ❌");
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.city || !form.state || !form.category) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/articles", {
        ...form,
        status: "published",
        isApproved: true,
      });

      console.log("SUCCESS:", res.data);

      alert("Article Published ✅");

      setForm({
        title: "",
        content: "",
        city: "",
        state: "",
        category: "",
      });

      setAiSummary("");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error publishing article ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="ml-[220px] p-6">
        <h2 className="text-2xl font-bold mb-4">✍️ Create Article</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* CONTENT */}
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={6}
          />

          {/* 🔥 AI BUTTONS */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={generateHeadline}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              🤖 AI Title
            </button>

            <button
              type="button"
              onClick={generateSummary}
              className="bg-purple-500 text-white px-3 py-1 rounded"
            >
              🤖 AI Summary
            </button>
          </div>

          {/* 🔥 SHOW SUMMARY */}
          {aiSummary && (
            <div className="bg-gray-100 p-3 rounded">
              <h3 className="font-bold">AI Summary:</h3>
              <p>{aiSummary}</p>
            </div>
          )}

          {/* CITY */}
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select City</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          {/* STATE */}
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select State</option>
            {states.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Publishing..." : "Publish Article 🚀"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;