import React, { useState } from "react";

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
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! How can I help you? You can ask about booking, payments, rescheduling, and more.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Check FAQ for an answer (simple keyword matching)
    const lowerInput = input.toLowerCase();
    const matchedFaq = faqData.find((faq) =>
      faq.question.toLowerCase().includes(lowerInput) ||
      lowerInput.includes("book") && faq.question.toLowerCase().includes("book") ||
      lowerInput.includes("payment") && faq.question.toLowerCase().includes("payment")
    );

    setTimeout(() => {
      if (matchedFaq) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: matchedFaq.answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              "Sorry, I didn't understand that. Please try asking differently or contact support.",
          },
        ]);
      }
    }, 700);

    setInput("");
  };

  return (
    <>
      {/* Chatbot Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        className="fixed bottom-5 right-5 bg-[#FFB703] p-4 rounded-full shadow-lg text-white z-50 hover:bg-[#e6a700] transition"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col z-50 h-96 md:h-[500px]">
          <header className="bg-[#023047] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="font-semibold">Customer Support</h2>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </header>

          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 text-sm"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    msg.from === "user"
                      ? "bg-[#FFB703] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-300 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-[#FFB703]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#FFB703] px-4 rounded text-white font-semibold hover:bg-[#e6a700] transition"
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
