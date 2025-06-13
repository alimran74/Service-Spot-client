import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return (
        <div>
        <footer className="bg-[#023047] text-[#E0E0E0] py-10">
  <div className="mx-auto w-full flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
    
    {/* Section 1 */}
    <div className="space-y-3">
      <img src="https://i.ibb.co/QvjZgYRG/6499901.png" alt="Logo" className="h-10 w-auto" />
      <h2 className="text-2xl font-bold">ServiceSpot</h2>
      <p className="text-sm">ServiceSpot connects homeowners with trusted home service providers.</p>
      <div className="flex gap-3 mt-2 text-lg">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaInstagram /></a>
      </div>
    </div>

    {/* Section 2 */}
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">Useful Links</h3>
      <ul className="space-y-1 text-sm">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/my-services">My Services</Link></li>
        <li><Link to="/my-reviews">My Reviews</Link></li>
        <li><Link to="/add-service">Add Service</Link></li>
      </ul>
    </div>

    {/* Section 3 */}
    <div className="space-y-3 text-sm">
      <h3 className="text-xl font-semibold">Contact Us</h3>
      <p>Email: info@servicespot.com</p>
      <p>Phone: (123) 456-7890</p>
      <p className="pt-4 text-xs text-gray-400">© {new Date().getFullYear()} ServiceSpot. All rights reserved.</p>
    </div>

  </div>
</footer>

    </div>
    );
};

export default Footer;