
import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#023047] text-white shadow-md sticky top-0 z-50">
      <div className=" mx-auto w-full flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src='https://i.ibb.co/QvjZgYRG/6499901.png' alt="ServiceSpot Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">ServiceSpot</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-[#FFB703]">Home</Link>
          <Link to="/services" className="hover:text-[#FFB703]">Services</Link>
          <Link to="/login" className="hover:text-[#FFB703]">Login</Link>
          <Link to="/register" className="hover:text-[#FFB703]">Register</Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#023047] px-4 sm:px-6 pb-4">
          <ul className="flex flex-col gap-2 font-medium">
            <Link to="/" className="hover:text-[#FFB703]" onClick={toggleMenu}>Home</Link>
            <Link to="/services" className="hover:text-[#FFB703]" onClick={toggleMenu}>Services</Link>
            <Link to="/login" className="hover:text-[#FFB703]" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="hover:text-[#FFB703]" onClick={toggleMenu}>Register</Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
