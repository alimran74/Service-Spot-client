import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide Residential, Premium, and Commercial cleaning services tailored to your needs."
  },
  {
    question: "How can I book a service?",
    answer:
      "Simply select a service and click 'See Details' to book. You need to be logged in."
  },
  {
    question: "Do you offer monthly subscriptions?",
    answer:
      "Yes, all our plans are billed monthly with easy cancellation options."
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund if the service is unsatisfactory and reported within 48 hours."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <div className="bg-[#8ECAE6] py-16">
    <section
      className="max-w-7xl mx-auto p-6 md:p-12 bg-[#8ECAE6] rounded-2xl shadow-neumorphism "
      aria-label="Frequently Asked Questions"
    >
      <h2 className="text-4xl font-extrabold text-center text-[#023047] mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-[#f0f5f9] rounded-xl shadow-neu-inset cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#FFB703]`}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-controls={`faq-desc-${idx}`}
              onClick={() => toggleFAQ(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{ transition: "all 0.3s ease" }}
            >
              <h3
                className={`text-xl font-semibold px-6 py-5 flex justify-between items-center text-[#219EBC] select-none ${
                  isOpen ? "rounded-t-xl" : "rounded-xl"
                }`}
              >
                {faq.question}
                <span className="text-[#FFB703] text-2xl flex-shrink-0">
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
              </h3>
              <div
                id={`faq-desc-${idx}`}
                className={`overflow-hidden px-6 text-gray-800 text-lg transition-[max-height,opacity,padding] duration-500 ease-in-out ${
                  isOpen ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                }`}
                style={{ willChange: "max-height, opacity, padding" }}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        /* Neumorphism shadows */
        .shadow-neumorphism {
          box-shadow:
            9px 9px 16px #babecc,
            -9px -9px 16px #ffffff;
        }
        .shadow-neu-inset {
          box-shadow:
            inset 4px 4px 6px #babecc,
            inset -4px -4px 6px #ffffff;
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          section {
            padding: 2rem 1rem;
          }
          h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
    </div>
  );
};

export default FAQ;
