import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return (
        <div>
         <footer className="bg-[#023047] text-[#E0E0E0] py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
            <img 
  src='https://i.ibb.co/QvjZgYRG/6499901.png' 
  alt="ServiceSpot Logo"
  className="h-12 w-auto mb-4"
/>
          <h2 className="text-2xl font-bold mb-4">ServiceSpot</h2>
          <p>
            ServiceSpot connects homeowners with trusted home service providers. Browse, book, and review services with confidence.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-[#FFB703]">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#FFB703]">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#FFB703]">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-[#FFB703]">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#FFB703]">Home</Link></li>
            <li><Link to="/services" className="hover:text-[#FFB703]">Services</Link></li>
            <li><Link to="/my-services" className="hover:text-[#FFB703]">My Services</Link></li>
            <li><Link to="/my-reviews" className="hover:text-[#FFB703]">My Reviews</Link></li>
            <li><Link to="/add-service" className="hover:text-[#FFB703]">Add Service</Link></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: info@servicespot.com</p>
          <p>Phone: (123) 456-7890</p>
          <p className="mt-4">© {new Date().getFullYear()} ServiceSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
    );
};

export default Footer;