import React, { useState } from "react";
import { NavLink } from "react-router"; // Essential: Ensure this import is from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-[#FFB703] font-bold" 
      : "hover:text-[#FFB703]"; 

  
  const buttonNavLinkClasses = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg w-20 text-center
     ${isActive
        ? "bg-gradient-to-br from-cyan-700 to-blue-700 text-white" 
        : "bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white" 
     }
     focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800
     transition-all duration-300 ease-in-out`; 

  return (
    <header className="bg-[#023047] text-white shadow-md sticky top-0 z-50">
      <div className="mx-auto w-full flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/QvjZgYRG/6499901.png"
            alt="ServiceSpot Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold">ServiceSpot</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 font-medium items-center">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClasses}>
            Services
          </NavLink>
          {/* Apply button styles directly to NavLink */}
          <NavLink to="/login" className={buttonNavLinkClasses}>
            Login
          </NavLink>
          <NavLink to="/register" className={buttonNavLinkClasses}>
            Register
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#023047] px-4 sm:px-6 pb-4">
          <ul className="flex flex-col gap-2 font-medium">
            <NavLink to="/" className={linkClasses} onClick={toggleMenu} end>
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={linkClasses}
              onClick={toggleMenu}
            >
              Services
            </NavLink>
            {/* Mobile buttons - consider if they should look like buttons here too */}
            <NavLink
              to="/login"
              className={buttonNavLinkClasses} // Still using button styles for consistency
              onClick={toggleMenu}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={buttonNavLinkClasses} // Still using button styles for consistency
              onClick={toggleMenu}
            >
              Register
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;