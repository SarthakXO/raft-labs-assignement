"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { user } = useUser();

  // Close the sidebar and dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle the logout action
 

  // Handle the profile navigation
  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden sm:flex justify-between items-center bg-gray-900 p-4 shadow-lg shadow-white">
        <h1 className="text-white text-2xl font-semibold">Logo</h1>
        <div className="relative">
          {user && (
            <Image
              src={user?.picture || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
          )}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white shadow-xl rounded-md w-48 z-50"
            >
              <ul>
                <li
                  className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                  onClick={handleProfile}
                >
                  View Profile
                </li>
                <li className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">
                  <a href="/api/auth/logout">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar - Hamburger */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-black p-4 shadow-md z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Logo</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-full hover:bg-gray-700"
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setSidebarOpen(false)} // Close sidebar when clicked on overlay
          />
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 bg-black text-white w-64 h-full p-6 shadow-lg z-50  transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`} // Sliding animation
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Logo</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white p-2 rounded-full hover:bg-gray-700"
              >
                X {/* Close icon */}
              </button>
            </div>
            <ul className="space-y-4">
              <li
                className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                onClick={handleProfile}
              >
                View Profile
              </li>
              <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
                <a href="/api/auth/logout">Logout</a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
