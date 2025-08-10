import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const GlassFooter = styled(Box)(({ theme }) => ({
  backdropFilter: "blur(15px)",
  background: "rgba(2, 48, 71, 1)",
  borderTop: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0px -4px 30px rgba(0, 200, 255, 0.3)",
  padding: "3rem 1rem",
  color: "#E0E0E0",
}));

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const socialHover = {
    scale: 1.2,
    rotate: 5,
    color: "#00F5FF",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <GlassFooter component="footer">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">

          {/* Section 1 */}
          <motion.div
            className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co/QvjZgYRG/6499901.png"
              alt="ServiceSpot Logo"
              className="h-12 mx-auto md:mx-0 mb-4 drop-shadow-[0_0_8px_#00F5FF]"
            />
            <h2 className="text-2xl font-bold mb-2">ServiceSpot</h2>
            <p className="text-sm leading-relaxed mb-4">
              ServiceSpot connects homeowners with trusted home service providers.
            </p>
            <div className="flex justify-center md:justify-start gap-6 text-xl">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    aria-label="Social Link"
                    whileHover={socialHover}
                    className="transition"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", link: "/" },
                { name: "Services", link: "/allServices" },
                { name: "My Services", link: "/auth/myServices" },
                { name: "My Reviews", link: "/auth/myReview" },
                { name: "Add Service", link: "/auth/addServices" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="hover:text-[#00F5FF] transition duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            className="md:flex-1 text-center md:text-left max-w-xs mx-auto md:mx-0 text-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: info@servicespot.com</p>
            <p>Phone: (123) 456-7890</p>
            <p className="mt-6 text-xs text-gray-400">
              © {new Date().getFullYear()} ServiceSpot. All rights reserved.
            </p>
          </motion.div>

        </div>
      </div>
    </GlassFooter>
  );
};

export default Footer;
