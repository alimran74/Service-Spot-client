import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#023047] text-[#E0E0E0] py-12">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
          {/* Section 1: Logo + Description + Socials */}
          <div className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0">
            <img
              src="https://i.ibb.co/QvjZgYRG/6499901.png"
              alt="ServiceSpot Logo"
              className="h-12 mx-auto md:mx-0 mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">ServiceSpot</h2>
            <p className="text-sm leading-relaxed mb-4">
              ServiceSpot connects homeowners with trusted home service
              providers.
            </p>
            <div className="flex justify-center md:justify-start gap-6 text-xl">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#FFB703] transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#FFB703] transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#FFB703] transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#FFB703] transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Section 2: Useful Links */}
          <div className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0">
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FFB703] transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allServices"
                  className="hover:text-[#FFB703] transition duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/myServices"
                  className="hover:text-[#FFB703] transition duration-200"
                >
                  My Services
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/myReview"
                  className="hover:text-[#FFB703] transition duration-200"
                >
                  My Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/addServices"
                  className="hover:text-[#FFB703] transition duration-200"
                >
                  Add Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0 text-sm">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: info@servicespot.com</p>
            <p>Phone: (123) 456-7890</p>
            <p className="mt-6 text-xs text-gray-400">
              © {new Date().getFullYear()} ServiceSpot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
