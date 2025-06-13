import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: "slide1",
      src: "https://i.ibb.co/gbpsvJtj/full-shot-man-pouring-paint.png",
      title: "Trusted Home Services",
      subtitle: "Book top-rated cleaners, electricians, and more — fast and easy."
    },
    {
      id: "slide2",
      src: "https://i.ibb.co/hxQJFHn4/middle-aged-woman-wearing-apron-rubber-gloves-holding-bucket-with-cleaning-tools.png",
      title: "Stress-Free Repairs",
      subtitle: "Get your plumbing or AC fixed on time with zero hassle."
    },
    {
      id: "slide3",
      src: "https://i.ibb.co/HDFxR9tQ/home-automation-with-device.png",
      title: "Secure & Verified Providers",
      subtitle: "Our professionals are background-checked and highly rated."
    },
    {
      id: "slide4",
      src: "https://i.ibb.co/232zVkVS/hardworking-man-doing-his-job-woodshop.png",
      title: "Affordable Pricing",
      subtitle: "Transparent quotes with no hidden fees. Book confidently."
    }
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
    <div className="carousel w-full h-[250px] md:h-[400px] py-8 px-0.5   mx-auto relative overflow-hidden bg-[#8ECAE6]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={slide.id}
          className={`carousel-item relative w-full ${index !== currentSlide ? 'hidden' : ''}`}
        >
          <img
            src={slide.src}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0  flex flex-col justify-center items-start px-6 md:px-16 text-[#023047]">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-xl md:text-lg max-w-xl">{slide.subtitle}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle bg-[#023047] text-white border-none">❮</button>
            <button onClick={nextSlide} className="btn btn-circle bg-[#023047] text-white border-none">❯</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
