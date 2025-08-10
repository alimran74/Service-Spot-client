import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "ServiceSpot made it so easy to find a trustworthy plumber. The whole process was smooth and quick!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "I booked a cleaning service through ServiceSpot and was amazed by the professionalism. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Booking an electrician took less than 5 minutes. Great service and support from the ServiceSpot team!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { name, image, review, rating } = testimonialsData[currentIndex];

  return (
    <section className="bg-gradient-to-b from-[#023047] to-[#035d7e] py-16 text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

        {/* Testimonial Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto"
        >
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#00F5FF]"
          />
          <h3 className="text-xl font-semibold">{name}</h3>

          {/* Animated Stars */}
          <div className="flex justify-center gap-1 my-3">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i < rating ? 1 : 0.8 }}
                transition={{ delay: i * 0.1 }}
                className={`${i < rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                <FaStar />
              </motion.span>
            ))}
          </div>

          <p className="text-sm italic">{review}</p>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? "bg-[#00F5FF]" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
