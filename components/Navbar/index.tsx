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
  // Close sidebar if clicked outside
  useEffect(() => {
    console.log(`user: `, user);
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

  const handleLogout = () => {
    
    console.log("Logging out...");
   
    router.push("/login");
  };

  const handleProfile = () => {
    // Redirect to profile page
    router.push("/profile");
  };

  return (
    <div>
      
      <div className="hidden sm:flex justify-between items-center bg-gray-900 p-4">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Logo</h1>
        </div>
        <div className="relative">
          {user&&<Image
            src={`${user?.picture}`}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => {
                console.log(user?.picture)
                setDropdownOpen((prev) => !prev)}}
          />}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40"
            >
              <ul>
                <li
                  className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                  onClick={handleProfile}
                >
                  View Profile
                </li>
                <li
                  className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                  
                >
                    <a href="/api/auth/logout">

                  Logout
                    </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      
      <div className={`sm:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div
          ref={sidebarRef}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="fixed top-0 left-0 bg-gray-900 text-white w-64 h-full p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Logo</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white p-2 rounded-full"
            >
              X
            </button>
          </div>
          <div className="mt-8">
            <ul>
              <li
                className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                onClick={handleProfile}
              >
                View Profile
              </li>
              <li
                className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                
              >
                <a href="api/auth/logout">

                Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-gray-900 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Logo</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-full"
          >
            &#9776; {/* Hamburger Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
