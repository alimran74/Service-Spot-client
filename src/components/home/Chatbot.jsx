import React, { useState, useEffect, useRef } from "react";

const faqData = [
  {
    question: "How do I book a service?",
    answer:
      "You can browse services, select your provider, and book directly from our platform.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, debit cards, and online wallets.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, you can reschedule appointments from your dashboard up to 24 hours before.",
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Some service providers offer emergency services. Check the service details for availability.",
  },
  {
    question: "How long does a service booking take?",
    answer: "Most bookings are confirmed within minutes, depending on provider availability.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds are processed if services are cancelled within 24 hours and subject to provider terms.",
  },
  {
    question: "Can I change my service provider?",
    answer:
      "Yes, you can select another provider from your booking history or contact support for help.",
  },
];

// Placeholder avatar URLs (replace with actual user avatar from auth)
const botAvatar = "https://i.ibb.co/QvjZgYRG/6499901.png"; // futuristic bot icon
const userAvatar = "https://i.ibb.co.com/V0H54xQk/user-image.jpg"; // generic user icon

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! How can I help you? You can ask about booking, payments, rescheduling, and more.",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text: text.trim(), time: new Date() };
    addMessage(userMsg);

    const lowerInput = text.toLowerCase();

    const matchedFaq = faqData.find((faq) => {
      const q = faq.question.toLowerCase();
      return (
        q.includes(lowerInput) ||
        (lowerInput.includes("book") && q.includes("book")) ||
        (lowerInput.includes("payment") && q.includes("payment")) ||
        (lowerInput.includes("refund") && q.includes("refund")) ||
        (lowerInput.includes("change") && q.includes("change"))
      );
    });

    setTimeout(() => {
      if (matchedFaq) {
        addMessage({ from: "bot", text: matchedFaq.answer, time: new Date() });
      } else {
        addMessage({
          from: "bot",
          text:
            "Sorry, I didn't understand that. Please try asking differently or contact support.",
          time: new Date(),
        });
      }
    }, 700);
  };

  const handleFaqClick = (question) => {
    handleSend(question);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        className="fixed bottom-5 right-5 bg-gradient-to-br from-[#FFB703] to-[#ff9f00] p-4 rounded-full shadow-xl text-white z-50 hover:scale-110 transition-transform"
        style={{ boxShadow: "0 6px 15px rgba(255,183,3,0.7)" }}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-16 right-5 w-[90vw] max-w-sm sm:max-w-md md:w-96 bg-[#8ECAE6] rounded-3xl shadow-2xl flex flex-col z-50 h-[520px] md:h-[600px]"
          style={{ border: "2px solid #FFB703" }}
        >
          <header className="bg-[#022f40] text-white p-4 rounded-t-3xl flex justify-between items-center shadow-lg">
            <h2 className="font-semibold text-lg sm:text-xl">Customer Support</h2>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-2xl font-bold px-3 py-1 rounded-full transition"
              style={{ lineHeight: 0 }}
            >
              &times;
            </button>
          </header>

          {/* FAQ Questions */}
          <div className="px-4 py-2 border-b border-[#FFB703] overflow-x-auto whitespace-nowrap bg-[#01415b]">
            {faqData.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleFaqClick(faq.question)}
                className="inline-block bg-[#FFB703] text-[#023047] px-4 py-1 rounded-full text-xs font-semibold mr-2 mb-2 hover:bg-yellow-400 transition"
                aria-label={`Ask: ${faq.question}`}
                title={faq.question}
              >
                {faq.question.length > 30
                  ? faq.question.slice(0, 27) + "..."
                  : faq.question}
              </button>
            ))}
          </div>

          {/* Messages Panel */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 text-sm bg-[#8ECAE6]"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "bot" && (
                  <img
                    src={botAvatar}
                    alt="ServiceSpot Bot"
                    className="w-8 h-8 rounded-full shrink-0"
                  />
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-3 leading-relaxed select-text ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-[#FFB703] to-[#ff9f00] text-white rounded-br-none"
                      : "bg-[#034663] text-[#B2D4E6] rounded-bl-none shadow-md"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  <div>{msg.text}</div>
                  <div className="text-[10px] text-gray-300 mt-1 text-right select-none">
                    {formatTime(msg.time)}
                  </div>
                </div>
                {msg.from === "user" && (
                  <img
                    src={userAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full shrink-0"
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Panel */}
          <div className="border-t border-[#FFB703] flex gap-2 p-3 bg-[#022f40] rounded-b-3xl">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-[#01415b] text-white placeholder:text-gray-400 transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(input);
                  setInput("");
                }
              }}
              aria-label="Chat input"
            />
            <button
              onClick={() => {
                handleSend(input);
                setInput("");
              }}
              className="bg-[#FFB703] hover:bg-yellow-400 transition text-[#023047] font-bold rounded-full px-5 py-2 shadow-lg select-none"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
