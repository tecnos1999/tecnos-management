import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette, faImages, faThumbtack, faHeart,
  faChartLine, faFire, faMagic, faGem, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full ${
          isNavOpen ? 'w-64' : 'w-16'
        } bg-white transition-all duration-300 shadow-2xl rounded-xl`}
        style={{
          background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
          boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff'
        }}
      >
        {/* Burger icon for opening and closing */}
        <div className="flex items-center justify-between p-4 h-16 bg-white">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="text-gray-800 text-2xl focus:outline-none"
          >
            {isNavOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faPalette} className="mr-3" />
              {isNavOpen && <span>Your Work</span>}
            </li>
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faImages} className="mr-3" />
              {isNavOpen && <span>Assets</span>}
            </li>
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faThumbtack} className="mr-3" />
              {isNavOpen && <span>Pinned Items</span>}
            </li>

            <hr className="border-t border-gray-400" />

            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faHeart} className="mr-3" />
              {isNavOpen && <span>Following</span>}
            </li>
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faChartLine} className="mr-3" />
              {isNavOpen && <span>Trending</span>}
            </li>
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faFire} className="mr-3" />
              {isNavOpen && <span>Challenges</span>}
            </li>
            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faMagic} className="mr-3" />
              {isNavOpen && <span>Spark</span>}
            </li>

            <hr className="border-t border-gray-400" />

            <li className="flex items-center pl-4 hover:bg-gray-300 text-gray-800 py-3 cursor-pointer rounded-md">
              <FontAwesomeIcon icon={faGem} className="mr-3" />
              {isNavOpen && <span>Codepen Pro</span>}
            </li>
          </ul>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 w-full p-4 bg-white">
          <div className="flex items-center">
            <img
              src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            {isNavOpen && (
              <div className="ml-3 flex flex-col">
                <a
                  href="https://codepen.io/uahnbu/pens/public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-bold"
                >
                  Flore Denis
                </a>
                <span className="text-gray-400 text-sm">Admin</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-4 ${isNavOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Your main content goes here */}
        <h1 className="text-3xl font-bold">Main Content</h1>
      </div>
    </div>
  );
};

export default Sidebar;
