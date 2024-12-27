"use client"

import React from 'react';

const LoggedOutPage= () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-800 text-center p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-4">You have been logged out</h1>
        <p className="mb-6 text-gray-400">Please log in again to continue.</p>
        
          Login Again
        
      </div>
    </div>
  );
};

export default LoggedOutPage;
