"use client"; // Client-side only

import React, { useEffect } from "react"; // React import
import Image from "next/image"; // Next.js optimized image
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client"; // Apollo Client hooks
import { useUser } from "@auth0/nextjs-auth0/client"; // Auth0 user hook
import { useRouter } from "next/navigation"; // Next.js router
import LoadingSpinner from "@/components/LoadingSpinner";

// GraphQL query to check if user exists by email
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

// GraphQL mutation to add new user
const ADD_USER = gql`
  mutation Users {
    insertIntousersCollection(objects: $newUser) {
      records {
        id
      }
    }
  }
`;

// GraphQL mutation to add user to follows table
const ADD_USER_TO_FOLLWS_TABLE = gql`
  mutation Follows {
    insertIntofollowsCollection(objects: $newUser) {
      affectedCount
    }
  }
`;

const Home = () => {
  const { user, isLoading } = useUser(); // Auth0 user data
  const router = useRouter(); // Router for page navigation

  // Lazy-loaded query to check if user exists
  const [checkUserInDB, { data }] = useLazyQuery(CHECK_FOR_USER, {
    variables: { email: user?.email },
  });

  // Mutation to insert user into DB
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

  // Mutation to add user to follows table
  const [addUserToFollows, {}] = useMutation(ADD_USER_TO_FOLLWS_TABLE, {
    variables: {
      newUser: [{ userid: data?.insertIntousersCollection?.records?.[0]?.id }],
    },
  });

  // Handle adding user if not in DB
  const handleAddingUser = async () => {
    console.log('here')
    try {
      await mutateFn(); // Add user
      await addUserToFollows(); // Add to follows table
      router.push("/authenticated?new=yes"); // Redirect with new user flag
    } catch (e) {
      router.push("/authenticated?new=no"); // Redirect with error flag
    }

    // If no user found, insert them
    if (data?.usersCollection?.edges?.length < 1) {
      mutateFn();
    }
    router.push("/authenticated"); // Redirect to authenticated page
  };

  // Redirect user if logged in
  const redirectToApp = () => {
    if (user) {
      handleAddingUser(); // Add user and redirect
    }
  };
  useEffect(() => {
    redirectToApp();
  }, [user]); 
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">

        <LoadingSpinner/>
      </div>
    );
  }

  // Main page UI
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
            {/* GitHub source code link */}
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

            {/* Explore app link */}
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

            {/* Logout button (placeholder) */}
            {/* <div className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-full py-3 px-6 gap-2 transition-all duration-300 w-full sm:w-auto">
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
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
