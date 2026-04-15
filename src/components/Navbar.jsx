import React, { useState } from "react"; // ✅ FIX

import { useDispatch, useSelector } from "react-redux";
import { searchArticles } from "../store/slices/articleSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(searchArticles(query));
  };

  return (
    <nav className="bg-red-600 text-white relative">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-3">

        <Link to="/" className="font-semibold hover:underline">
          Home
        </Link>

        <Link to="/category/Politics">Politics</Link>
        <Link to="/category/Business">Business</Link>
        <Link to="/category/Sports">Sports</Link>
        <Link to="/category/Technology">Technology</Link>
        <Link to="/category/Science">Science</Link>
        <Link to="/category/Education">Education</Link>
        <Link to="/category/Entertainment">Entertainment</Link>
        <Link to="/category/Environment">Environment</Link>

        <form onSubmit={handleSearch} className="flex gap-2 ml-auto">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 text-black rounded"
          />
          <button type="submit" className="bg-black px-3 py-1 rounded">
            Search
          </button>
        </form>

        {loggedInUser && (
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-4 text-3xl"
          >
            ☰
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="fixed top-26 right-6 bg-white text-black w-60 p-4 rounded-lg shadow-lg z-50">

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-2 right-3 font-bold"
          >
            ✖
          </button>

          <div className="flex flex-col gap-4">

            {(loggedInUser?.role === "advertiser" || loggedInUser?.role === "journalist") && (
              <Link to="/profile/complete" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            )}

            <Link to="/auth/change-password" onClick={() => setMenuOpen(false)}>
              Change Password
            </Link>

            {loggedInUser?.role === "reader" && (
              <Link to="/reader" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            )}

            {loggedInUser?.role === "journalist" && (
              <>
                <Link to="/journalist/articles/create">Create Article</Link>
                <Link to="/journalist/my-articles">My Articles</Link>
                <Link to="/journalist">Dashboard</Link>
              </>
            )}

            {loggedInUser?.role === "advertiser" && (
              <>
                <Link to="/advertiser/campaign/create">Create Campaign</Link>
                <Link to="/advertiser/campaign/my">My Campaigns</Link>
                <Link to="/advertiser">Dashboard</Link>
              </>
            )}

            {loggedInUser?.role === "admin" && (
              <Link to="/admin">Dashboard</Link>
            )}

            <Link to="/about">About Us</Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;