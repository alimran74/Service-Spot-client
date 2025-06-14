import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error("Logout Error:", error));
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#FFB703] font-semibold transition duration-200"
      : "text-white hover:text-[#FFB703] transition duration-200";

  const animatedButton = ({ isActive }) =>
    `relative inline-block px-4 py-2 font-medium text-white rounded group
    ${isActive ? "bg-[#FB8500]" : "bg-[#219EBC] hover:bg-[#FFB703]"}
    transition duration-300 ease-in-out overflow-hidden`;

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
    <header className="bg-[#023047] text-white shadow-md sticky top-0 z-50">
      <div className=" mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/QvjZgYRG/6499901.png"
            alt="ServiceSpot Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold">ServiceSpot</span>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex gap-6 items-center justify-center flex-1">
          {navItems}
        </nav>

        {/* Right-side buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
                alt="User Avatar"
                className="h-8 w-8 rounded-full border-2 border-white"
                title={user.displayName}
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={animatedButton}>
                Login
              </NavLink>
              <NavLink to="/register" className={animatedButton}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#023047] px-4 pb-4">
          <ul className="flex flex-col gap-3 text-center">
            {navItems}
            {user ? (
              <div className="flex flex-col items-center gap-2 mt-3">
                <img
                  src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-3">
                <NavLink to="/login" className={animatedButton}>
                  Login
                </NavLink>
                <NavLink to="/register" className={animatedButton}>
                  Register
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

