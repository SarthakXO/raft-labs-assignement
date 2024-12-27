import React, { useState } from 'react';
import TweetInput from '../PostInput';
import HomeFeed from '../PostsFeed';

import {gql, useQuery } from '@apollo/client';
const followers = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const following = [
  { id: 1, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 2, name: 'Chris Lee', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Sarah Green', avatar: 'https://i.pravatar.cc/150?img=6' },
];


// const GET_FOLLOWERS=gql`
// query Followers{
//   followsCollection{
//     edges{
//       node{

//       }
//     }
//   }
// }
// `

const FollowersSidebar = () => {
  const [activeTab, setActiveTab] = useState('followers');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderUserList = () => {
    const users = activeTab === 'followers' ? followers : following;
    return (
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex items-center space-x-3 mb-4">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex">
      <div
        className={`w-64 h-grow hidden md:block bg-gray-900 text-white p-5 transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold">User Profile</div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-white"
          >
            {isSidebarOpen ? 'Close' : 'Open'}
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('followers')}
            className={`px-4 py-2 rounded-md ${activeTab === 'followers' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            Followers
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-md ${activeTab === 'following' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            Following
          </button>
        </div>
        {renderUserList()}
      </div>
      {/* <div className="flex-1 p-10"> */}
        {/* <h1 className="text-3xl text-gray-800">Main Content Area</h1> */}
        {/* <TweetInput/> */}
        {/* <HomeFeed/> */}
      {/* </div> */}
    </div>
  );
};

export default FollowersSidebar;
