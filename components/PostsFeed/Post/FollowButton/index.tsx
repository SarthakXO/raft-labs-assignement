import React from 'react'

interface Props{
    following:Boolean;
}

const FollowButton = ({following}:Props) => {
  return (
    <div>
        <button
          className={`follow-button px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
            following ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          } text-white ml-auto`}
        //   onClick={toggleFollow}
        >
          {following ? 'Following' : 'Follow'}
        </button>
    </div>
  )
}

export default FollowButton