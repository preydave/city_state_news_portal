import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchArticles } from "../store/slices/articleSlice";
import { getActiveAds } from "../store/slices/adslice";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TrendingNews from "../components/TrendingNews";
import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import AdCard from "../components/AdCard";
import HeadlineTicker from "../components/Headline";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Handled by ProtectedRoute, but we can access user info here if needed
  const user = useSelector((state) => state.auth.user); 
  
  const [filters, setFilters] = useState({
    category: "",
    state: "",
    city: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const [externalNews, setExternalNews] = useState([]);

  const articles = useSelector((state) => state.articles?.articles || []);
  const loading = useSelector((state) => state.articles?.loading);
  const error = useSelector((state) => state.articles?.error);
  const ads = useSelector((state) => state.ads?.ads || []);

  // ✅ DATA FETCH - UNCHANGED
  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(getActiveAds());

    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setExternalNews(data?.articles || []))
      .catch(() => setExternalNews([]));
  }, [dispatch]);

  const combinedNews = [
    ...articles,
    ...externalNews.map((item, index) => ({
      _id: "ext-" + index,
      title: item?.title || "No title",
      content: item?.description || "",
      image: item?.urlToImage || "",
      category: "Global",
      views: 0,
      author: { name: item?.source?.name || "Global" },
      createdAt: item?.publishedAt,
    })),
  ];

  const currentArticles = combinedNews.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <>
      <Header />
      <Navbar />
      <HeadlineTicker />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          {ads.length > 0 && <AdCard ad={ads[0]} />}

          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <CategoryFilter setFilters={setFilters} />

          {loading && <p className="text-center py-8">Loading news...</p>}
          {error && (
            <p className="text-red-500 text-center py-8">{error}</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.length === 0 ? (
              <p className="col-span-full text-center py-12 text-gray-500">
                No articles available 📰
              </p>
            ) : (
              currentArticles.map((article) => (
                <NewsCard key={article._id} article={article} />
              ))
            )}
          </div>

          {/* Pagination */}
          {combinedNews.length > articlesPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                ← Prev
              </button>

              <span className="px-4 py-2 font-semibold">{currentPage}</span>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={
                  currentPage * articlesPerPage >= combinedNews.length
                }
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-3">
          <TrendingNews articles={combinedNews.slice(0, 5)} />
        </div>
      </div>

      <Footer />
      <AIChat />
    </>
  );
};

// 🤖 AI CHAT COMPONENT MOVED OUT
const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);

    let reply = "";
    const msg = message.toLowerCase();

    if (msg.includes("sports")) reply = "Showing sports news 🏏";
    else if (msg.includes("technology")) reply = "Showing tech news 💻";
    else if (msg.includes("ahmedabad")) reply = "Showing Ahmedabad news 📍";
    else if (msg.includes("latest")) reply = "Here are latest news 📰";
    else reply = "I can help with news 🤖";

    setChat([...newChat, { sender: "ai", text: reply }]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          🤖
        </button>
      )}

      {open && (
        <div className="w-64 bg-white shadow-xl rounded-xl p-3 border">
          <div className="flex justify-between mb-2 items-center">
            <h2 className="font-bold text-sm">AI Assistant</h2>
            <button 
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ❌
            </button>
          </div>

          <div className="h-32 overflow-y-auto border p-2 mb-2 rounded text-sm bg-gray-50">
            {chat.map((c, i) => (
              <p 
                key={i}
                className={`mb-1 ${c.sender === "user" ? "text-blue-600 text-right" : "text-green-600"}`}
              >
                {c.text}
              </p>
            ))}
          </div>

          <div className="flex gap-1">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-1 flex-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask about news..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage} 
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

