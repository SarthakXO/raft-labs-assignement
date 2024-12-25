"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const getApolloDataTest = gql`
  query Posts {
    usersCollection {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`;

const Home = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [triggerQuery, { loading, error, data }] =
    useLazyQuery(getApolloDataTest);

  const handleQueryFetch = () => {
    console.log("1: ", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log("2: ", process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY);
    try {
      triggerQuery();
      console.log("loading...: ", loading);

      console.log("data from apollo: ", data);
    } catch (e) {
      console.log(e);
    }
  };

  
  // const fetchTestGraphql = async () => {
  //   const response = await axios.post(
  //     "https://mwuhrawmjsuvlybbirbt.supabase.co/graphql/v1",
  //     {
  //       query:
  //         "query FetchFirst2Users { usersCollection(first : 2) { edges { node { id username email } } } }",
  //     },
  //     {
  //       headers: {
  //         apiKey:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dWhyYXdtanN1dmx5YmJpcmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNTg1NDAsImV4cCI6MjA1MDczNDU0MH0.qVB3SuS77Dq46T98yS3THeoBLUnEmQfH87DcPePbFr4",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dWhyYXdtanN1dmx5YmJpcmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTE1ODU0MCwiZXhwIjoyMDUwNzM0NTQwfQ.0FU39EtGW3cnxR7fDu_Wxfcd4W4deovOpYcVuDnrhKM",
  //       },
  //     }
  //   );

  //   console.log(response.data);
  // };

  const redirectToApp = () => {
    if (user) {
      router.push("/authenticated");
    }
  };
  useEffect(() => {
    redirectToApp();
    // console.log(user);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl font-semibold">Loading.....</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-center items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-start w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:items-start text-center sm:text-left w-full">
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            Sarthak's Social Media
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-4 max-w-xl">
            This is a social media app built to help people connect, share
            content, and engage with each other. It offers a modern and sleek
            design for an enjoyable social experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start mt-8">
            <a
              className="flex items-center justify-center bg-gray-800 hover:bg-gray-600 duration-300 text-white font-semibold text-base rounded-full py-3 px-6 gap-2 transition-all w-full sm:w-auto"
              href="https://github.com/SarthakXO/raft-labs-assignement"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/github.png"
                alt="GitHub Logo"
                width={16}
                height={16}
                className="dark:invert"
              />
              View Source Code
            </a>

            <a
              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-full py-3 px-6 gap-2 transition-all duration-300 w-full sm:w-auto"
              href="api/auth/login"
            >
              <span>Explore</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m0 0l-4-4m4 4l-4 4"
                />
              </svg>
            </a>

            <div
              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-full py-3 px-6 gap-2 transition-all duration-300 w-full sm:w-auto"
              onClick={handleQueryFetch}
            >
              <span>Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m0 0l-4-4m4 4l-4 4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:block w-full max-w-xs mx-auto">
          <Image
            src="/assets/raftlabs-logo.svg"
            alt="RaftLabs logo"
            width={180}
            height={180}
            priority
          />
        </div> */}
      </main>
    </div>
  );
};

export default Home;
