import React, { useState } from 'react';
import { useQuery,gql } from '@apollo/client';
import FollowButton from './FollowButton';



interface Props {
  id: string;
  userid: string;
  text: string;
}

const GET_USER_DATA=gql`
query getUserData{
    usersCollection(filter:{id:{eq:$userid}}){
        edges{
            node{
                username
                profilepicture
            }
        }
    }
}
`

const TweetPost = ({ id, userid, text }: Props) => {
  const [following, setFollowing] = useState(false);
    const {loading,error,data}=useQuery(GET_USER_DATA,{
        variables:{"userid":userid}
    })
  const profileImage =
    'https://i.pinimg.com/originals/92/0d/23/920d23d3ad50a11f64a06667f2b2e3e4.jpg';
  const username = 'john_doe';
  const content = text || 'Just had the best coffee! ☕️ #coffee #goodvibes';

  const toggleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className="tweet-post bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xl w-full mx-auto">
      {/* User Info Section */}
      <div className="user-info flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <img
          onClick={()=>console.log(`userid: `,data)}
            className="profile-image w-14 h-14 rounded-full border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300"
            src={profileImage}
            alt="Profile"
          />
          <div className="username-follow flex flex-col">
            <p className="username text-white font-semibold text-lg hover:underline hover:cursor-pointer">{data?.usersCollection?.edges?.[0]?.node?.username}</p>
          </div>
        </div>
        <FollowButton following={following}/>

      </div>

      
      <div className="content">
        <p className="text-white text-base sm:text-lg leading-relaxed">{content}</p>
      </div>

      
      <div className="divider mt-4 border-t border-gray-600"></div>
    </div>
  );
};

export default TweetPost;
