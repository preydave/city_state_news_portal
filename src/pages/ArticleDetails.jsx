import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  toggleLikeArticle,
  viewArticle,
  fetchArticleDetails, // ✅ FIX ADD
  deleteArticle,
} from "../store/slices/articleSlice";

import CommentSection from "../components/CommentSection";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/RatingsSection";
import BookmarkButton from "../components/BookmarkButton";

const ArticleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useSelector(
    (state) => state.articles
  );

  const loggedInUser = useSelector((state) => state.auth.user);

  const [showComments, setShowComments] = useState(false);

  // 🔥 FIX: INVALID ID GUARD
  useEffect(() => {
    if (!id || id === "undefined") return;

    const viewed = sessionStorage.getItem(`viewed-${id}`);

    if (!viewed) {
      dispatch(viewArticle(id));
      sessionStorage.setItem(`viewed-${id}`, "true");
    }

    dispatch(fetchArticleDetails(id));
  }, [dispatch, id]);

  // ✅ DELETE
  const handleDelete = () => {
    if (!loggedInUser) {
      alert("Please login first");
      return;
    }

    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    dispatch(deleteArticle(article._id)).then(() => {
      navigate("/home"); // ✅ better redirect
    });
  };

  // ✅ LIKE
  const handleLike = () => {
    if (!loggedInUser) {
      alert("Please login to like article");
      return;
    }
    dispatch(toggleLikeArticle(article._id));
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="text-center mt-20">Loading...</div>
        <Footer />
      </>
    );
  }

  // 🔥 ERROR
  if (error) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="text-center mt-20 text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  // 🔥 INVALID CASE
  if (!id || id === "undefined") {
    return (
      <>
        <Header />
        <Navbar />
        <div className="text-center mt-20 text-gray-500">
          Invalid article
        </div>
        <Footer />
      </>
    );
  }

  if (!article) return null;

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
            {article?.category || "General"}
          </span>

          <h1 className="text-3xl font-bold mt-4">{article?.title}</h1>

          <div className="text-sm text-gray-500 mt-2">
            By {article?.author?.name || "Unknown"}
          </div>

          {article?.images?.length > 0 && (
            <img
              src={article.images[0]}
              alt=""
              className="mt-4 w-full h-[400px] object-cover rounded"
            />
          )}

          <div className="mt-4 text-gray-700 whitespace-pre-line">
            {article?.content}
          </div>

          {/* DELETE BUTTON */}
          {loggedInUser?._id === article?.author?._id && (
            <button
              onClick={handleDelete}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Article
            </button>
          )}

          {/* ⭐ Rating */}
          <div className="mt-6">
            <Rating
              articleId={article._id}
              userRating={article?.userRating || 0}
            />
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex gap-6">

          <button onClick={handleLike}>
            ❤️ {article?.likesCount || 0}
          </button>

          <button onClick={() => setShowComments(true)}>
            💬 Comments
          </button>

          <BookmarkButton
            articleId={article._id}
            user={loggedInUser}
          />
        </div>

        {showComments && (
          <CommentSection
            articleId={article._id}
            currentUser={loggedInUser}
            close={() => setShowComments(false)}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;