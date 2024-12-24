import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
interface MobileSidebarProps {
    hideSideBar: boolean;
  }



const MobileSidebar = ({hideSideBar}:MobileSidebarProps ) => {

    const {user}=useUser()
  const [open, setOpen] = useState(hideSideBar);

  return (
    <div className=" md:hidden flex flex-col items-center justify-center  font-body">
      
      <button
        id="open-btn"
        className="fixed bg-transparent border-0 cursor-pointer top-4 left-4"
        onClick={() => setOpen(!open)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      

      
     
      <div
        id="blue-nav"
        className={`fixed top-0 left-0 h-screen max-w-md transition-transform duration-300 ease-in-out transform bg-blue-800 w-80 ${
          open ? 'translate-x-0' : 'delay-500 -translate-x-full'
        }`}
      >
        <div
          id="gray-nav"
          className={`fixed top-0 left-0 w-11/12 h-screen transition-transform duration-300 ease-in-out delay-200 transform bg-gray-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div
            id="white-nav"
            className={`relative top-0 left-0 w-11/12 h-screen p-10 transition-transform duration-300 ease-in-out transform bg-white ${
              open ? 'delay-500 translate-x-0' : '-translate-x-full'
            }`}
          >
            <button
              id="close-btn"
              className="absolute opacity-50 top-10 right-8 bg-black"
              onClick={() => setOpen(!open)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <img
              className="w-20"
              src="https://staging.outincanberra.com.au/wp-content/uploads/2020/02/sample-logo.jpg"
              alt="Logo"
              width="96"
              height="96"
            />

            <ul id="menu-list" className="p-0">
              <li className="mx-0 my-5 text-sm">
                <a href="#" className="text-sm antialiased font-semibold text-blue-800 uppercase">
                  Products
                </a>
              </li>
              <li className="mx-0 my-5">
                <a className="text-sm antialiased font-semibold text-blue-800 uppercase" href="#">
                  Services
                </a>
              </li>
              <li className="mx-0 mt-5 text-sm">
                <a href="#" className="text-sm antialiased font-semibold text-blue-800 uppercase">
                  About Us
                </a>
              </li>
              <li className="mx-0 text-sm">
                <ul className="flex flex-col p-5 text-blue-800">
                  <li className="inline-flex items-center mx-0 my-1 space-x-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <a href="#" className="text-sm antialiased text-blue-800 uppercase">
                      Culture
                    </a>
                  </li>
                  <li className="inline-flex items-center mx-0 my-1 space-x-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <a href="#" className="text-sm antialiased text-blue-800 uppercase">
                      Dreams
                    </a>
                  </li>
                  <li className="inline-flex items-center mx-0 my-1 space-x-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <a href="#" className="text-sm antialiased text-blue-800 uppercase">
                      Blog
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default MobileSidebar;
