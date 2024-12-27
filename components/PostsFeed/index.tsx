"use client"; // Client-side only

import React, { useState, useEffect } from "react"; // React hooks
import TweetPost from "./Post/index"; // Tweet post component
import { useQuery, gql } from "@apollo/client"; // Apollo Client hooks

// TypeScript interfaces for post data
interface Node {
  id: string;
  images: string[];
  userid: string;
  content: string;
}

interface Props {
  postMade: Boolean;
  setPostMade: Function;
}

interface NodeArray {
  nodes: Node;
}

// GraphQL query to fetch all posts
const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsCollection(orderBy: { createdat: DescNullsFirst }) {
      edges {
        node {
          id
          userid
          content
          images
        }
      }
    }
  }
`;

const HomeFeed = ({ postMade, setPostMade }: Props) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS); // Query to fetch posts
  const [posts, setPosts] = useState<Node[]>([]); // State to store posts

  // Update posts when data changes
  useEffect(() => {
    setPosts(data?.postsCollection?.edges);
  }, [data]);

  // Refetch posts when a new post is made
  useEffect(() => {
    if (postMade) {
      refetch(); // Refetch data to get the new post
      setPostMade(false); // Reset postMade flag
      setPosts(data?.postsCollection?.edges); // Update posts
    }
  }, [postMade]);

  return (
    <div className="home-feed bg-black min-h-screen flex flex-col items-center py-8 px-4">
      <div className="posts w-full max-w-2xl space-y-6">
        {/* Render posts */}
        {
          posts?.map((item: any, index) => {
            return (
              <div key={item.node.id}>
                <TweetPost
                  id={item.node.id} // Post ID
                  userid={item.node.userid} // User ID
                  text={item.node.content} // Post content
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default HomeFeed;
