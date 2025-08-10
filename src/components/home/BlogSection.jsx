import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Choose the Right Electrician",
    description:
      "Learn how to check qualifications, compare quotes, and ensure your home’s electrical safety.",
    link: "/blog/choose-right-electrician",
    date: "Aug 5, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 2,
    title: "How to Maintain Your AC in Summer",
    description:
      "Simple maintenance habits that improve cooling efficiency and extend your AC’s lifespan.",
    link: "/blog/ac-maintenance-summer",
    date: "Jul 28, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Home Plumbing Safety",
    description:
      "Prevent leaks, clogs, and water damage with these easy plumbing safety measures.",
    link: "/blog/home-plumbing-safety",
    date: "Jul 14, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 4,
    title: "10 House Cleaning Hacks for Busy People",
    description:
      "Quick cleaning tricks to keep your home fresh and tidy without spending hours.",
    link: "/blog/cleaning-hacks",
    date: "Jul 2, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 5,
    title: "When to Call a Professional Painter",
    description:
      "Know the signs that your DIY paint job might need a professional touch.",
    link: "/blog/when-to-call-painter",
    date: "Jun 21, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 6,
    title: "Seasonal Home Maintenance Checklist",
    description:
      "A step-by-step checklist to prepare your home for each season of the year.",
    link: "/blog/home-maintenance-checklist",
    date: "Jun 10, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 7,
    title: "Pest Control Tips for a Healthy Home",
    description:
      "Effective, eco-friendly ways to keep pests away all year long.",
    link: "/blog/pest-control-tips",
    date: "May 30, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 8,
    title: "How to Save Energy and Cut Utility Bills",
    description:
      "Simple upgrades and habits that can lower your monthly energy costs.",
    link: "/blog/save-energy-tips",
    date: "May 15, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 9,
    title: "Signs Your Roof Needs Repair",
    description:
      "Learn the early warning signs of roof damage before it becomes costly.",
    link: "/blog/roof-repair-signs",
    date: "May 1, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 10,
    title: "Choosing the Right Lawn Care Service",
    description:
      "Key factors to consider when hiring a professional for your garden and lawn.",
    link: "/blog/choose-lawn-care-service",
    date: "Apr 20, 2025",
    author: "ServiceSpot Team",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-[#F5F9FC] py-16">
      <div className="px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#023047]">
            Blog & Tips
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Stay informed with our latest tips, tricks, and guides to keep your
            home in top shape all year round.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <span className="text-sm text-gray-500">
                {post.date} • {post.author}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-[#023047]">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{post.description}</p>
              <Link
                to={post.link}
                className="inline-block mt-4 text-[#FFB703] font-semibold hover:underline"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
