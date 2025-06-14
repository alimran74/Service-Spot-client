import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-200 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5C100 78.3 77.6 100.7 49.8 100.7C22 100.7 -0.399994 78.3 -0.399994 50.5C-0.399994 22.7 22 0.299988 49.8 0.299988C77.6 0.299988 100 22.7 100 50.5Z"
            fill="currentColor"
          />
          <path
            d="M93.9 39.04C96.5 38.34 97.8 35.5 96.6 33.1C91.6 23.6 83.2 16 73 12.6C72 12.2 70.9 12.7 70.4 13.7L65.9 23C65.4 24 65.9 25.2 66.9 25.6C72.8 27.8 77.6 32.5 80 38.3C80.7 39.9 82.5 40.6 83.9 40C87.1 38.8 90.4 38.1 93.9 39.04Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
