"use client"; // Client-side only

import { useQuery, gql,  } from "@apollo/client"; // Apollo Client hooks
import TweetInput from "./../../components/PostInput/index"; // Tweet input component
import { useEffect, useState } from "react"; // React hooks
import { useUser } from "@auth0/nextjs-auth0/client"; // Auth0 user hook
import HomeFeed from "@/components/PostsFeed"; // Home feed component

// GraphQL query to get user UUID by email
const GET_USER_UUID = gql`
  query getUserId {
    usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;



const Page = () => {
  const { user } = useUser(); // Get user info from Auth0
  const [postMade, setPostMade] = useState(false); // State for tracking post status
  const { loading, data } = useQuery(GET_USER_UUID, {
    variables: { email: user?.email }, // Query user UUID by email
  });

  // Mutation to add user to follows table
  

  

  useEffect(() => {
    // When data is loaded, store user ID in local storage
    if (data) {
      localStorage.setItem('userId', data?.usersCollection?.edges?.[0]?.node?.id);
      
    }
  }, [loading]); // Re-run when loading state changes

  return (
    <div className="p-2 bg-black flex-row gap-10 flex">
      {/* <FollowersSidebar/> */}
      <div className="w-[100%]">
        {/* Tweet input component */}
        <TweetInput setPostMade={setPostMade} />
        {/* Home feed component */}
        <HomeFeed postMade={postMade} setPostMade={setPostMade} />
      </div>
    </div>
  );
};

export default Page;
