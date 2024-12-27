"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const CHECK_FOR_USER = gql`
  query Users {
    usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`;

const ADD_USER = gql`
  mutation Users {
    insertIntousersCollection(objects: $newUser) {
      affectedCount
    }
  }
`;
const Home = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [checkUserInDB, { data }] = useLazyQuery(CHECK_FOR_USER, {
    variables: { email: user?.email },
  });
  const [mutateFn, { loading, error }] = useMutation(ADD_USER, {
    variables: {
      newUser: [
        {
          auth0id: user?.sid,
          username: user?.nickname,
          email: user?.email,
          profilepicture: user?.picture,
        },
      ],
    },
  });

  const handleAddingUser = async () => {
    try{
      await mutateFn()
      router.push("/authenticated?new=yes");

    }catch(e){
      router.push("/authenticated?new=no");

    }
    // await checkUserInDB();
    if (data?.usersCollection?.edges?.length < 1) {
      mutateFn();
    }
    router.push("/authenticated");
  };

  const redirectToApp = () => {
    if (user) {
      handleAddingUser();
    }
  };
  useEffect(() => {
    redirectToApp();
    // console.log(user);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
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

            <div className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-full py-3 px-6 gap-2 transition-all duration-300 w-full sm:w-auto">
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
