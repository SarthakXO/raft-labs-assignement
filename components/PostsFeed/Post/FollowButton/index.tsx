import React from 'react'
import { useMutation,gql,useQuery } from '@apollo/client';
interface Props{
    following:Boolean;
    creatorId:String
}

const FollowButton = ({following,creatorId}:Props) => {
  const viewerId=localStorage.getItem('userid')
  
  return (
    <div>
        <button
          className={`follow-button px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
            following ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          } text-white ml-auto`}
          onClick={()=>console.log(creatorId)}
        >
          {following ? 'Following' : 'Follow'}
        </button>
    </div>
  )
}

export default FollowButton