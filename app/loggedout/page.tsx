"use client"

import React from 'react';

const LoggedOutPage= () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 text-center p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-4">You have been logged out</h1>
        <p className="mb-6 text-gray-400">Please log in again to continue.</p>
        <a
          href='/api/auth/login'
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none transition duration-300"
        >
          Login Again
        </a>
      </div>
    </div>
  );
};

export default LoggedOutPage;
