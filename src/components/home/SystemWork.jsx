import React from 'react';
import { motion } from 'framer-motion';
const SystemWork = () => {
    const steps = [
    {
      title: "Browse Services",
      description: "Explore categories like cleaning, electrical, and plumbing.",
      image: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
    },
    {
      title: "Book Instantly",
      description: "Choose a provider and schedule with ease.",
      image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
    },
    {
      title: "Rate & Review",
      description: "Share your experience and help others decide.",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
    },
  ];

  return (
   <section className="bg-[#8ECAE6] py-16 px-4 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-bold text-center text-[#023047] mb-12">This Is How Our System Works</h3>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md flex flex-col items-center text-center"
          >
            <img
              src={step.image}
              alt={step.title}
              className="h-20 w-20 mb-4"
            />
            <h4 className="text-xl font-semibold text-[#023047] mb-2">{step.title}</h4>
            <p className="text-sm text-[#023047]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


export default SystemWork;