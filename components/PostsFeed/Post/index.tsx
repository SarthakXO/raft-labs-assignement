import React, { useState } from "react"; // React hooks
import { useQuery, gql } from "@apollo/client"; // Apollo Client hooks
import FollowButton from "./FollowButton"; // Follow button component

// Props interface for TweetPost component
interface Props {
  id: string;
  userid: string;
  text: string;
}

// GraphQL query to fetch user data by user ID
const GET_USER_DATA = gql`
  query getUserData {
    usersCollection(filter: { id: { eq: $userid } }) {
      edges {
        node {
          username
          profilepicture
        }
      }
    }
  }
`;

const TweetPost = ({ id, userid, text }: Props) => {
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { userid: userid }, // Query to fetch user data using their userID
  });

  // Default profile image and text content
  const profileImage =
    "https://i.pinimg.com/originals/92/0d/23/920d23d3ad50a11f64a06667f2b2e3e4.jpg";
  const username = "john_doe";
  const content = text || "Just had the best coffee! ☕️ #coffee #goodvibes"; // Default text if no text is passed

  return (
    <div className="tweet-post bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xl w-full mx-auto">
      <div className="user-info flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {/* Profile image */}
          <img
            onClick={() => console.log(`userid: `, data?.usersCollection?.edges?.[0]?.node?.profilepicture)} // Log profile picture when clicked
            className="profile-image w-14 h-14 rounded-full border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300"
            src={data?.usersCollection?.edges?.[0]?.node?.profilepicture || profileImage} // Display user profile picture or fallback image
            alt="Profile"
          />
          <div className="username-follow flex flex-col">
            {/* Username with hover effect */}
            <p className="username text-gray-300 font-semibold text-lg hover:underline hover:cursor-pointer">
              {data?.usersCollection?.edges?.[0]?.node?.username || username} {/* Display username */}
            </p>
          </div>
        </div>
        {/* Follow button component */}
        <FollowButton creatorId={userid} creatorName={data?.usersCollection?.edges?.[0]?.node?.username} />
      </div>

      <div className="content">
        {/* Content text of the tweet */}
        <p className="text-white text-base sm:text-lg leading-relaxed">
          {content}
        </p>
      </div>

      <div className="divider mt-4 border-t border-gray-600"></div> {/* Divider between posts */}
    </div>
  );
};

export default TweetPost;
