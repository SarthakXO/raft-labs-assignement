"use client";
import React, { useState, FormEvent } from "react";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginBox: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log("Logging in with", email, password);
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <span className="text-gray-400">Or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-2 bg-white text-black border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <div className="flex items-center justify-center space-x-2">
            <Image
              src="/assets/icons/google_auth.png"
              alt="Google"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-sm">Login with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginBox;
