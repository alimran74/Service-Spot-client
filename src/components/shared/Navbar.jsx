import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; // fixed: react-router-dom instead of "react-router"
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
    `max-w-29 mx-auto relative overflow-hidden group font-medium px-4 py-2 rounded ${
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
    <header className="bg-[#023047] text-white shadow-md sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/QvjZgYRG/6499901.png"
            alt="ServiceSpot Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold">ServiceSpot</span>
        </div>

        
        <nav className="hidden md:flex gap-6 items-center justify-center flex-1">
          {navItems}
        </nav>

       
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                />
                <div className="absolute hidden group-hover:flex flex-col items-start top-12 right-0 bg-white text-black shadow-lg p-3 rounded-lg z-50 min-w-[200px] transition-all duration-300">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-600 break-all">{user.email}</p>
                </div>
              </div>

              
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded font-medium transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={animatedButton}>
                <span className="relative z-10">Login</span>
                <div className=" absolute inset-0 bg-[#FFB703] text-black flex items-center justify-center scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0">
                  Login
                </div>
              </NavLink>
              <NavLink to="/register" className={animatedButton}>
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-[#FFB703] text-black flex items-center justify-center scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0">
                  Register
                </div>
              </NavLink>
            </>
          )}
        </div>

        
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-[#023047] px-4 pb-4">
          <ul className="flex flex-col gap-3 text-center">
            {navItems}
            {user ? (
              <div className="flex flex-col items-center gap-3 mt-4">
                
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://i.ibb.co/yVwX1tZ/user.png"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white mx-auto"
                  />
                  <div className="absolute hidden group-hover:flex flex-col items-center top-14 left-1/2 -translate-x-1/2 bg-white text-black shadow-lg p-3 rounded-lg z-50 min-w-[200px]">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 break-all text-center">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-1.5 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-3">
                <NavLink to="/login" className={animatedButton}>
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-[#FFB703] text-black flex items-center justify-center scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0">
                    Login
                  </div>
                </NavLink>
                <NavLink to="/register" className={animatedButton}>
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-[#FFB703] text-black flex items-center justify-center scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0">
                    Register
                  </div>
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