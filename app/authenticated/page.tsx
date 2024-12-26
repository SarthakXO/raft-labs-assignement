"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import TweetInput from "./../../components/PostInput/index";
import { useEffect,useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import HomeFeed from "@/components/PostsFeed";



const GET_USER_UUID=gql`
query getUserId{
  usersCollection(filter:{email:{eq:$email}}){
    edges{
      node{
        id
      }
    }
  }
}`

const page = () => {
  const {user}=useUser()
 
  const {loading,error,data}=useQuery(GET_USER_UUID,{
    variables:{email:user?.email}
  })
  const [datas,setDatas]=useState()

  useEffect(() => {
    
    if(data){
      localStorage.setItem('userId',data?.usersCollection?.edges?.[0]?.node?.id)
    }
    
  }, [loading]);

  return (
    <div className="p-2">
      <TweetInput />
      <HomeFeed/>
    </div>
  );
};

export default page;
