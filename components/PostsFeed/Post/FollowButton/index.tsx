import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
interface Props {
  creatorId: String;
}
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

const FollowButton = ({ creatorId }: Props) => {
  const [myFollwed, setMyFollowed] = useState([]);
  const [following, setFollowing] = useState(false);
  const viewerId = localStorage.getItem("userId");

  const { error, loading, data, refetch } = useQuery(GET_ALL_FOLLOWED, {
    variables: { viewer: viewerId },
  });

  const [addFollower, {}] = useMutation(ADD_TO_FOLLOWED, {
    variables: {
      creator: myFollwed ? [...myFollwed, creatorId] : creatorId,
      viewer: viewerId,
    },
  });

  const [removeFollwed, {}] = useMutation(REMOVE_FROM_FOLLWED, {
    variables: {
      creator: myFollwed
        ? myFollwed.filter((item) => item != creatorId)
        : creatorId,
      viewer: viewerId,
    },
  });

  const follolwCreator = async () => {
    await addFollower();
    await refetch();
  };

  const unFollowCreator = async () => {
    await removeFollwed();
    await refetch();
  };

  useEffect(() => {
    if (data) {
      setMyFollowed(data?.followsCollection?.edges?.[0]?.node?.followedid);
      if (
        data?.followsCollection?.edges?.[0]?.node?.followedid.includes(
          creatorId
        )
      ) {
        setFollowing(true);
      } else {
        setFollowing(false);
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
          following ? unFollowCreator() : follolwCreator()
        }
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default FollowButton;
