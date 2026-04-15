import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ article }) => {
  const navigate = useNavigate();

  if (!article) return null;

  // ✅ DATE FUNCTION
  const getDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "Recent";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ IMAGE SAFE
  const imageUrl =
    article.image ||
    article.urlToImage ||
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c";

  // 🔥 FINAL CLICK HANDLER (FULL SAFE)
  const handleClick = () => {
    if (article?._id) {
      navigate(`/article/${article._id}`);
    } else if (article?.url) {
      window.open(article.url, "_blank");
    } else {
      alert("Article not available");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden 
                 hover:shadow-2xl transition duration-300 group 
                 flex flex-col h-full cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* CATEGORY */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
          {article.category || article.source?.name || "News"}
        </span>

        {/* VIEWS */}
        <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          👁 {article.views || 0}
        </span>

        {/* TITLE */}
        <h2 className="absolute bottom-3 left-3 right-3 text-white text-lg font-bold line-clamp-2">
          {article.title}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">

        <p className="text-gray-600 text-sm line-clamp-3">
          {article.excerpt ||
            article.description ||
            (article.content
              ? article.content.slice(0, 100) + "..."
              : "No description available")}
        </p>

        {/* AUTHOR + DATE */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
              {article.author?.name?.[0] ||
                article.author?.[0] ||
                "A"}
            </div>

            <div className="text-xs">
              <p className="text-gray-800 font-medium">
                {article.author?.name ||
                  article.author ||
                  "Admin"}
              </p>
              <p className="text-gray-400">
                {getDate(article.createdAt || article.publishedAt)}
              </p>
            </div>

          </div>

          <div className="text-xs text-yellow-500 font-semibold">
            ⭐ {article.averageRating || 0}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-4">

          <div className="flex gap-4 text-xs text-gray-500">
            ❤️ {article.likesCount || 0}
          </div>

          {/* READ MORE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Read More →
          </button>

        </div>
      </div>
    </div>
  );
};

export default NewsCard;