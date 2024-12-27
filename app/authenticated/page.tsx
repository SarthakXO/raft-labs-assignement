"use client";
import React from "react";
import { useQuery, gql,useMutation } from "@apollo/client";
import TweetInput from "./../../components/PostInput/index";
import { useEffect,useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import HomeFeed from "@/components/PostsFeed";
import FollowersSidebar from "@/components/FollowersSideBar";



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

const ADD_USER_TO_FOLLWS_TABLE=gql`
mutation Follows{
  insertIntofollowsCollection(objects:$newUser){
    affectedCount
  }
}
`

const page = () => {
  const {user}=useUser()
  const [postMade,setPostMade]=useState(false)
  const {loading,error,data}=useQuery(GET_USER_UUID,{
    variables:{email:user?.email}
  })
  const [addUserToFollows,{}]=useMutation(ADD_USER_TO_FOLLWS_TABLE,{
    variables:{newUser:[{userid:data?.usersCollection?.edges?.[0]?.node?.id}]}
  })
  const [datas,setDatas]=useState()

  useEffect(() => {
    // console.log('auth dataL :',data)
    if(data){
      localStorage.setItem('userId',data?.usersCollection?.edges?.[0]?.node?.id)
      try{
        // addUserToFollows()
      }catch(e){
        // console.log(e)
      }
    }
    
  }, [loading]);

  return (
    <div className="p-2 bg-black flex-row gap-10 flex">
      {/* <FollowersSidebar/> */}
      <div className="w-[100%]">
      <TweetInput setPostMade={setPostMade} />
      <HomeFeed postMade={postMade} setPostMade={setPostMade}/>
      </div>
    </div>
  );
};

export default page;
