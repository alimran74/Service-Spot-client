import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router"; 
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error("Logout Error:", error));
  };

  const navLinkClass = ({ isActive }) =>
    scrolled
      ? `px-4 py-2 rounded text-sm font-medium ${
          isActive
            ? "bg-[#FFB703] text-white"
            : "bg-[#219EBC] text-white hover:bg-[#FFB703] hover:text-black"
        } transition-all`
      : isActive
      ? "text-[#FFB703] font-semibold transition"
      : "text-white hover:text-[#FFB703] transition";

  const animatedButton = ({ isActive }) =>
    `relative overflow-hidden group font-medium px-4 py-2 rounded ${
      isActive ? "bg-[#FB8500]" : "bg-[#219EBC] hover:bg-[#FFB703]"
    } text-white`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClass} end>
        Home
      </NavLink>
      <NavLink to="/allServices" className={navLinkClass}>
        Services
      </NavLink>
      {user && (
        <>
          <NavLink to="/auth/addServices" className={navLinkClass}>
            Add Service
          </NavLink>
          <NavLink to="/auth/myServices" className={navLinkClass}>
            My Services
          </NavLink>
          <NavLink to="/auth/myReview" className={navLinkClass}>
            My Reviews
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/30 backdrop-blur-md shadow-md text-black"
          : "bg-[#023047] text-white"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/QvjZgYRG/6499901.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold">ServiceSpot</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center justify-center flex-1">
          {navItems}
        </nav>

        {/* Right Side for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                />
                <div className="absolute hidden group-hover:flex flex-col items-start top-12 right-0 bg-white text-black shadow-lg p-3 rounded-lg z-50 min-w-[200px]">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-600 break-all">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={animatedButton}>
                <span className="relative z-10">Login</span>
              </NavLink>
              <NavLink to="/register" className={animatedButton}>
                <span className="relative z-10">Register</span>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Avatar - outside the menu toggle */}
        {user && (
          <div className="md:hidden mr-3">
            <img
              src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
        )}

        {/* Mobile Menu Toggle Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`transition-transform duration-300 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${
          menuOpen ? "max-h-[500px] scale-y-100 opacity-100" : "max-h-0 scale-y-0 opacity-0"
        } w-[85%] mx-auto rounded-b-lg bg-[#023047]/60 backdrop-blur-md`}
      >
        <ul className="flex flex-col gap-3 text-center p-4">
          {navItems}
          {!user && (
            <div className="flex flex-col gap-2 mt-3">
              <NavLink to="/login" className={animatedButton}>
                <span className="relative z-10">Login</span>
              </NavLink>
              <NavLink to="/register" className={animatedButton}>
                <span className="relative z-10">Register</span>
              </NavLink>
            </div>
          )}
          {user && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-1.5 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
