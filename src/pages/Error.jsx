import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="text-center max-w-xl">
          <img
            className="mx-auto max-w-xs mb-8"
            src="https://i.ibb.co.com/DfcSLL5G/2456051.png"
            alt="404 Illustration"
          />
          <h1 className="text-4xl text-red-500 font-bold mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            We couldn't find the page you're looking for. But don't worry, you can go back to the homepage and continue exploring.
          </p>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-2xl transition duration-300">
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
        </div>
    );
};

export default Error;