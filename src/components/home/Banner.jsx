import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "slide1",
      src: "https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_1920/https://i.ibb.co/gbpsvJtj/full-shot-man-pouring-paint.png",
      title: "Trusted Home Services",
      subtitle: "Book top-rated cleaners, electricians, and more — fast and easy.",
    },
    {
      id: "slide2",
      src: "https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_1920/https://i.ibb.co/hxQJFHn4/middle-aged-woman-wearing-apron-rubber-gloves-holding-bucket-with-cleaning-tools.png",
      title: "Stress-Free Repairs",
      subtitle: "Get your plumbing or AC fixed on time with zero hassle.",
    },
    {
      id: "slide3",
      src: "https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_1920/https://i.ibb.co/HDFxR9tQ/home-automation-with-device.png",
      title: "Secure & Verified Providers",
      subtitle: "Our professionals are background-checked and highly rated.",
    },
    {
      id: "slide4",
      src: "https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_1920/https://i.ibb.co/232zVkVS/hardworking-man-doing-his-job-woodshop.png",
      title: "Affordable Pricing",
      subtitle: "Transparent quotes with no hidden fees. Book confidently.",
    },
  ];

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full m-0 p-0 overflow-hidden bg-[#8ECAE6]">
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 text-[#023047]">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-xl">
                {slide.subtitle}
              </p>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
              <button
                onClick={prevSlide}
                className="btn btn-circle bg-[#023047] text-white border-none"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-circle bg-[#023047] text-white border-none"
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
