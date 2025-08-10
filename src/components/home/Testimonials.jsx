import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// 50 sample reviews
const testimonialsData = [
  { id: 1, name: "Sarah Johnson", image: "https://randomuser.me/api/portraits/women/44.jpg", review: "ServiceSpot made it so easy to find a trustworthy plumber. The whole process was smooth and quick!", rating: 5 },
  { id: 2, name: "Michael Brown", image: "https://randomuser.me/api/portraits/men/32.jpg", review: "I booked a cleaning service through ServiceSpot and was amazed by the professionalism. Highly recommend!", rating: 4 },
  { id: 3, name: "Emily Davis", image: "https://randomuser.me/api/portraits/women/68.jpg", review: "Booking an electrician took less than 5 minutes. Great service and support from the ServiceSpot team!", rating: 5 },
  { id: 4, name: "John Carter", image: "https://randomuser.me/api/portraits/men/47.jpg", review: "Absolutely fantastic experience! The provider arrived on time and did an excellent job.", rating: 5 },
  { id: 5, name: "Sophia Lee", image: "https://randomuser.me/api/portraits/women/12.jpg", review: "Great service, friendly team, and very affordable rates. Will use again!", rating: 4 },
  { id: 6, name: "Daniel Evans", image: "https://randomuser.me/api/portraits/men/78.jpg", review: "Quick booking, reliable providers, and easy payments. Couldn't ask for more.", rating: 5 },
  { id: 7, name: "Olivia White", image: "https://randomuser.me/api/portraits/women/50.jpg", review: "Loved how easy it was to browse providers and compare prices!", rating: 4 },
  { id: 8, name: "Liam Harris", image: "https://randomuser.me/api/portraits/men/55.jpg", review: "Professional and efficient. My AC was fixed within an hour!", rating: 5 },
  { id: 9, name: "Emma Wilson", image: "https://randomuser.me/api/portraits/women/20.jpg", review: "The best home service platform I’ve used. Everything was seamless.", rating: 5 },
  { id: 10, name: "Noah Martin", image: "https://randomuser.me/api/portraits/men/65.jpg", review: "Very reliable and trustworthy. Highly recommend ServiceSpot!", rating: 5 },
  { id: 11, name: "Ava Thompson", image: "https://randomuser.me/api/portraits/women/80.jpg", review: "Fantastic user interface and quick response times!", rating: 4 },
  { id: 12, name: "Ethan Scott", image: "https://randomuser.me/api/portraits/men/29.jpg", review: "I’ve already booked three services and all were amazing!", rating: 5 },
  { id: 13, name: "Mia Anderson", image: "https://randomuser.me/api/portraits/women/60.jpg", review: "Booking was a breeze and the provider was excellent.", rating: 5 },
  { id: 14, name: "James Miller", image: "https://randomuser.me/api/portraits/men/31.jpg", review: "Great communication from start to finish. Loved it!", rating: 4 },
  { id: 15, name: "Charlotte Moore", image: "https://randomuser.me/api/portraits/women/36.jpg", review: "This is now my go-to for all home service needs.", rating: 5 },
  { id: 16, name: "Benjamin Clark", image: "https://randomuser.me/api/portraits/men/24.jpg", review: "The provider was polite, fast, and did a quality job.", rating: 5 },
  { id: 17, name: "Amelia Lewis", image: "https://randomuser.me/api/portraits/women/27.jpg", review: "Such a smooth experience, highly recommend!", rating: 4 },
  { id: 18, name: "Lucas Young", image: "https://randomuser.me/api/portraits/men/19.jpg", review: "Punctual and efficient service. Very happy!", rating: 5 },
  { id: 19, name: "Harper Hall", image: "https://randomuser.me/api/portraits/women/16.jpg", review: "The cleaning team did a great job and left my home spotless.", rating: 5 },
  { id: 20, name: "Henry Allen", image: "https://randomuser.me/api/portraits/men/39.jpg", review: "The platform is super easy to use. Loved it!", rating: 4 },
  { id: 21, name: "Evelyn Wright", image: "https://randomuser.me/api/portraits/women/71.jpg", review: "Five stars! I’ll definitely use this again.", rating: 5 },
  { id: 22, name: "Jack King", image: "https://randomuser.me/api/portraits/men/53.jpg", review: "Quick service and a fair price.", rating: 4 },
  { id: 23, name: "Abigail Hill", image: "https://randomuser.me/api/portraits/women/65.jpg", review: "Such a relief to find reliable help so easily.", rating: 5 },
  { id: 24, name: "Owen Green", image: "https://randomuser.me/api/portraits/men/42.jpg", review: "Great experience overall, I’ll be back.", rating: 5 },
  { id: 25, name: "Ella Adams", image: "https://randomuser.me/api/portraits/women/42.jpg", review: "Friendly staff and efficient service.", rating: 5 },
  { id: 26, name: "William Nelson", image: "https://randomuser.me/api/portraits/men/10.jpg", review: "Easy booking and great communication.", rating: 4 },
  { id: 27, name: "Scarlett Carter", image: "https://randomuser.me/api/portraits/women/15.jpg", review: "Everything went smoothly, very happy.", rating: 5 },
  { id: 28, name: "Alexander Perez", image: "https://randomuser.me/api/portraits/men/22.jpg", review: "Top-notch service from start to finish.", rating: 5 },
  { id: 29, name: "Grace Roberts", image: "https://randomuser.me/api/portraits/women/21.jpg", review: "Such an easy way to book reliable help.", rating: 4 },
  { id: 30, name: "Logan Martinez", image: "https://randomuser.me/api/portraits/men/30.jpg", review: "ServiceSpot exceeded my expectations!", rating: 5 },
  { id: 31, name: "Zoe Turner", image: "https://randomuser.me/api/portraits/women/49.jpg", review: "The provider was polite and professional.", rating: 5 },
  { id: 32, name: "Mason Phillips", image: "https://randomuser.me/api/portraits/men/28.jpg", review: "Effortless booking and excellent results.", rating: 5 },
  { id: 33, name: "Lily Campbell", image: "https://randomuser.me/api/portraits/women/78.jpg", review: "The team was great to work with!", rating: 4 },
  { id: 34, name: "Elijah Mitchell", image: "https://randomuser.me/api/portraits/men/75.jpg", review: "On time, friendly, and did the job perfectly.", rating: 5 },
  { id: 35, name: "Chloe Parker", image: "https://randomuser.me/api/portraits/women/81.jpg", review: "Best home service platform I’ve used.", rating: 5 },
  { id: 36, name: "Jacob Evans", image: "https://randomuser.me/api/portraits/men/82.jpg", review: "They matched me with the perfect provider.", rating: 5 },
  { id: 37, name: "Ella Foster", image: "https://randomuser.me/api/portraits/women/76.jpg", review: "Everything was so quick and easy.", rating: 4 },
  { id: 38, name: "Matthew Diaz", image: "https://randomuser.me/api/portraits/men/21.jpg", review: "Super happy with the results!", rating: 5 },
  { id: 39, name: "Victoria Ramirez", image: "https://randomuser.me/api/portraits/women/26.jpg", review: "Very smooth process from start to finish.", rating: 4 },
  { id: 40, name: "Samuel Torres", image: "https://randomuser.me/api/portraits/men/73.jpg", review: "Fast booking and great service quality.", rating: 5 },
  { id: 41, name: "Hannah Brooks", image: "https://randomuser.me/api/portraits/women/8.jpg", review: "The service provider was excellent!", rating: 5 },
  { id: 42, name: "David Powell", image: "https://randomuser.me/api/portraits/men/3.jpg", review: "The easiest booking experience I’ve ever had.", rating: 4 },
  { id: 43, name: "Aria Reed", image: "https://randomuser.me/api/portraits/women/5.jpg", review: "Impressed with the quality of work.", rating: 5 },
  { id: 44, name: "Joseph Jenkins", image: "https://randomuser.me/api/portraits/men/16.jpg", review: "Friendly provider and quick turnaround.", rating: 4 },
  { id: 45, name: "Isabella Perry", image: "https://randomuser.me/api/portraits/women/4.jpg", review: "Love this platform! Makes life easier.", rating: 5 },
  { id: 46, name: "Carter Russell", image: "https://randomuser.me/api/portraits/men/4.jpg", review: "Great selection of services and providers.", rating: 5 },
  { id: 47, name: "Penelope Griffin", image: "https://randomuser.me/api/portraits/women/83.jpg", review: "Very happy with my booking!", rating: 5 },
  { id: 48, name: "Andrew Butler", image: "https://randomuser.me/api/portraits/men/83.jpg", review: "Smooth and simple booking process.", rating: 4 },
  { id: 49, name: "Madison Simmons", image: "https://randomuser.me/api/portraits/women/18.jpg", review: "Quick, affordable, and professional.", rating: 5 },
  { id: 50, name: "Lucas Rivera", image: "https://randomuser.me/api/portraits/men/6.jpg", review: "ServiceSpot is my go-to for home services now.", rating: 5 },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerSlide = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + cardsPerSlide) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleCards = [];
  for (let i = 0; i < cardsPerSlide; i++) {
    visibleCards.push(testimonialsData[(currentIndex + i) % testimonialsData.length]);
  }

  return (
    <section className="bg-[#8ECAE6] py-16 text-gray-900">
      <div className="px-6 text-center ">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCards.map(({ id, name, image, review, rating }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#8ECAE6] border-1 border-[#00F5FF] shadow-neumorphism text-gray-800 rounded-xl shadow-lg p-6"
            >
              <img src={image} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#00F5FF]" />
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="flex justify-center gap-1 my-3">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i < rating ? 1 : 0.8 }}
                    transition={{ delay: i * 0.05 }}
                    className={`${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    <FaStar />
                  </motion.span>
                ))}
              </div>
              <p className="text-sm italic">{review}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(testimonialsData.length / cardsPerSlide) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * cardsPerSlide)}
              className={`w-3 h-3 rounded-full transition ${idx === Math.floor(currentIndex / cardsPerSlide) ? "bg-[#00F5FF]" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
