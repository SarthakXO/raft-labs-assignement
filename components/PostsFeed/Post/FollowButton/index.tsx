import React, { useState, useEffect } from "react"; // React hooks
import { useMutation, gql, useQuery } from "@apollo/client"; // Apollo Client hooks
import { useUser } from "@auth0/nextjs-auth0/client"; // Auth0 user hook

// Props interface for FollowButton component
interface Props {
  creatorId: String;
  creatorName: String;
}

// GraphQL query to get the list of followed users for the viewer
const GET_ALL_FOLLOWED = gql`
  query getFolloweds {
    followsCollection(filter: { userid: { eq: $viewer } }) {
      edges {
        node {
          followedid
        }
      }
    }
  }
`;

// GraphQL mutation to add a followed user
const ADD_TO_FOLLOWED = gql`
  mutation addFollowed {
    updatefollowsCollection(
      set: { followedid: $creator }
      filter: { userid: { eq: $viewer } }
    ) {
      affectedCount
    }
  }
`;

// GraphQL mutation to remove a followed user
const REMOVE_FROM_FOLLWED = gql`
  mutation removeFollwed {
    updatefollowsCollection(
      set: { followedid: $creator }
      filter: { userid: { eq: $viewer } }
    ) {
      affectedCount
    }
  }
`;

const FollowButton = ({ creatorId, creatorName }: Props) => {
  const [myFollwed, setMyFollowed] = useState([]); // State to store followed users
  const [following, setFollowing] = useState(false); // State to track if currently following
  const viewerId = localStorage.getItem("userId"); // Get viewer's user ID from localStorage
  const { user } = useUser(); // Get user info from Auth0
  const { error, loading, data, refetch } = useQuery(GET_ALL_FOLLOWED, {
    variables: { viewer: viewerId }, // Query to get followed users for the current viewer
  });

  // Mutation to add a followed user
  const [addFollower, {}] = useMutation(ADD_TO_FOLLOWED, {
    variables: {
      creator: myFollwed ? [...myFollwed, creatorId] : creatorId, // Add creator to followed list
      viewer: viewerId,
    },
  });

  // Mutation to remove a followed user
  const [removeFollwed, {}] = useMutation(REMOVE_FROM_FOLLWED, {
    variables: {
      creator: myFollwed
        ? myFollwed.filter((item) => item != creatorId) // Remove creator from followed list
        : creatorId,
      viewer: viewerId,
    },
  });

  // Follow the creator
  const follolwCreator = async () => {
    await addFollower();
    await refetch(); // Refetch to update follow status
  };

  // Unfollow the creator
  const unFollowCreator = async () => {
    await removeFollwed();
    await refetch(); // Refetch to update follow status
  };

  // Check if the creator is already followed by the viewer
  useEffect(() => {
    if (data) {
      setMyFollowed(data?.followsCollection?.edges?.[0]?.node?.followedid);
      if (
        data?.followsCollection?.edges?.[0]?.node?.followedid?.includes(
          creatorId
        )
      ) {
        setFollowing(true); // Mark as following if creator is in followed list
      } else {
        setFollowing(false); // Mark as not following if creator is not in followed list
      }
    }
  }, [data]);

  return (
    <div>
      <button
        className={`follow-button px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
          following ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
        } text-white ml-auto`}
        onClick={() =>
          following && viewerId != creatorId ? unFollowCreator() : follolwCreator() // Toggle follow/unfollow
        }
      >
        {user?.nickname == creatorName ? "You" : following ? "Following" : "Follow"} {/* Button text */}
      </button>
    </div>
  );
};

export default FollowButton;
