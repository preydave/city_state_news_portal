import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR WITH NEWSPAPER BACKGROUND */}
      <nav
        className="relative bg-cover bg-center shadow-md sticky top-0 z-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c')"
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative">

          {/* TOP SECTION */}
          <div className="flex justify-between items-center px-8 py-4 text-white">

            {/* LOGO */}
            <Link
              to="/user"
              className="text-3xl font-extrabold tracking-wide"
            >
              📰 <span className="text-yellow-400">CityState</span> News
            </Link>

            {/* SEARCH */}
            <div className="hidden md:flex w-1/3">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
              />
              <button className="bg-yellow-400 text-black px-4 rounded-r-md hover:bg-yellow-500">
                Search
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="font-medium hover:underline text-red-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/"
                  className="hover:underline"
                >
                  Login
                </Link>
              )}

              <button className="bg-yellow-400 text-black px-4 py-1 rounded-md font-semibold hover:bg-yellow-500">
                Subscribe
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>

          {/* CATEGORY MENU DESKTOP */}
          <div className="hidden md:flex justify-center gap-10 border-t border-white/30 py-3 text-white font-semibold uppercase text-sm tracking-wide">
            <Link to="" className="hover:text-yellow-400 transition">Home</Link>
            <Link to="city" className="hover:text-yellow-400 transition">City</Link>
            <Link to="state" className="hover:text-yellow-400 transition">State</Link>
            <Link to="national" className="hover:text-yellow-400 transition">National</Link>
            <Link to="world" className="hover:text-yellow-400 transition">World</Link>
            <Link to="technology" className="hover:text-yellow-400 transition">Tech</Link>
            <Link to="sports" className="hover:text-yellow-400 transition">Sports</Link>
            <Link to="getapi" className="hover:text-yellow-400 transition">API</Link>
            <Link to="useeffectdemo" className="hover:text-yellow-400 transition">UseEffect</Link>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="md:hidden px-6 pb-4 bg-black/90 text-white">

              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full px-4 py-2 rounded-l-md text-black"
                />
                <button className="bg-yellow-400 text-black px-4 rounded-r-md">
                  Search
                </button>
              </div>

              <div className="flex flex-col gap-3 font-medium">
                <Link to="" onClick={handleLinkClick}>Home</Link>
                <Link to="city" onClick={handleLinkClick}>City</Link>
                <Link to="state" onClick={handleLinkClick}>State</Link>
                <Link to="national" onClick={handleLinkClick}>National</Link>
                <Link to="world" onClick={handleLinkClick}>World</Link>
                <Link to="technology" onClick={handleLinkClick}>Tech</Link>
                <Link to="sports" onClick={handleLinkClick}>Sports</Link>
                <Link to="getapi" onClick={handleLinkClick}>API</Link>
                <Link to="useeffectdemo" onClick={handleLinkClick}>UseEffect</Link>
              </div>

              <div className="flex gap-3 mt-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-400 font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/" className="font-medium">
                    Login
                  </Link>
                )}

                <button className="bg-yellow-400 text-black px-4 py-1 rounded-md font-semibold">
                  Subscribe
                </button>
              </div>

            </div>
          )}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default UserNavbar;