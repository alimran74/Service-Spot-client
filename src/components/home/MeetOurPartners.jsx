import React from 'react';
import { motion } from 'framer-motion';

const MeetOurPartners = () => {
  const partners = [
    {
      name: 'HomeFix Co.',
      logo: 'https://cdn-icons-png.flaticon.com/512/846/846449.png',
      description: 'Specializing in home repair and maintenance solutions for our platform users.'
    },
    {
      name: 'CleanPlus Services',
      logo: 'https://cdn-icons-png.flaticon.com/512/2620/2620990.png',
      description: 'Trusted cleaning services partner providing deep cleaning and move-in packages.'
    },
    {
      name: 'TechSpark Solutions',
      logo: 'https://cdn-icons-png.flaticon.com/512/2920/2920334.png',
      description: 'Providing IT and digital infrastructure support to enhance our system.'
    },
    {
      name: 'EcoPlumb Experts',
      logo: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
      description: 'Experts in plumbing and eco-friendly water management systems.'
    },
    {
      name: 'BrightElectro',
      logo: 'https://cdn-icons-png.flaticon.com/512/1046/1046899.png',
      description: 'Providing smart and efficient electrical solutions for modern homes.'
    },
    {
      name: 'SafeGuard Security',
      logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      description: 'Security partner ensuring safe home installations and alarm systems.'
    }
  ];

  return (
    <section className="bg-[#219EBC] py-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Partners</h2>
        <p className="text-lg max-w-2xl mx-auto">We proudly collaborate with these industry leaders who help us deliver the best services.</p>
      </div>
      <motion.div
        className="flex gap-6 animate-marquee"
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      >
        {[...partners, ...partners].map((partner, idx) => (
          <motion.div
            key={idx}
            className="bg-white text-[#023047] min-w-[250px] max-w-sm p-6 rounded-lg shadow-md flex flex-col items-center text-center mx-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src={partner.logo} alt={partner.name} className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <p className="text-sm">{partner.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MeetOurPartners;