"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation } from "@apollo/client";
const TweetInput = () => {
  const [tweetText, setTweetText] = useState("");
  const maxLength = 280;
  const { user, isLoading, error } = useUser();
  const handleChange = (event) => {
    setTweetText(event.target.value);
  };

  return (
    <div className="max-w-full w-full mx-auto p-6 sm:max-w-2xl dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        {user && (
          <Image
            src={`${user?.picture}`}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => {
              console.log(user?.picture);
            }}
          />
        )}
        <span className="text-md text-gray-600 dark:text-gray-300 hover:underline cursor-pointer">
          @username
        </span>
      </div>
      <hr className="my-2 bg-gray-600 border-0 h-px mx-auto w-[97%]" />
      <textarea
        className="w-full h-36 p-4 text-lg border rounded-2xl resize-none outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 transition-all"
        value={tweetText}
        onChange={handleChange}
        placeholder="What's happening?"
        maxLength={maxLength}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <span
          className={`text-sm ${
            tweetText.length > maxLength - 20
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {tweetText.length} / {maxLength}
        </span>
        <button
          className={`mt-2 sm:mt-0 px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 ${
            tweetText.length === 0 || tweetText.length > maxLength
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-md`}
          disabled={tweetText.length === 0 || tweetText.length > maxLength}
        >
          Post!
        </button>
      </div>
    </div>
  );
};

export default TweetInput;
