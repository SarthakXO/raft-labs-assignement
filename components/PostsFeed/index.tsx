import React, { useState, useEffect } from "react";
import TweetPost from "./Post/index";
import { useQuery, gql } from "@apollo/client";

interface Node {
  id: string;
  images: string[];
  userid: string;
  content: string;
}

interface NodeArray {
  nodes: Node;
}
const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsCollection {
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
const HomeFeed = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const [posts, setPosts] = useState<Node[]>([]);

  useEffect(() => {
    setPosts(data?.postsCollection?.edges);
  }, [data]);

  return (
    <div className="home-feed bg-black min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-white text-3xl font-semibold mb-6">Home Feed</h1>
      
      <div className="posts w-full max-w-2xl space-y-6">
        {
          posts?.map((item: any, index) => {
            return (
              <div key={item.node.id}>
                <TweetPost
                  id={item.node.id}
                  userid={item.node.userid}
                  text={item.node.content}
                />
              </div>
            );
          })}
        {/* <TweetPost />
        <TweetPost />
        <TweetPost />
        <TweetPost /> */}
      </div>
    </div>
  );
};

export default HomeFeed;