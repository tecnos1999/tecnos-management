"use client"; // Sidebar logic is for the client

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faBoxOpen, faList, faTags, faTag,
  faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem'; // Importăm componenta SidebarItem
import { motion } from 'framer-motion';

// Datele pentru elementele de meniu
const menuItems = [
  { name: "Dashboard", icon: faTachometerAlt },
  { name: "Products", icon: faBoxOpen },
  { name: "Category", icon: faList },
  { name: "SubCategory", icon: faTags },
  { name: "Tags", icon: faTag }
];

interface SidebarProps {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isNavOpen, setIsNavOpen }) => {
  const [activeItem, setActiveItem] = React.useState("Dashboard");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-zinc-800"
      animate={{ width: isNavOpen ? '16rem' : '5rem' }}
      initial={{ width: '5rem' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className={`flex items-center ${isNavOpen ? "justify-between" : "justify-center"} p-4 h-16 bg-zinc-900`}>
        {isNavOpen && (
          <motion.p
            className="text-white text-2xl font-bold uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            Tecnos
          </motion.p>
        )}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isNavOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>

      <nav className="mt-6 mx-3">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              activeItem={activeItem}
              onClick={handleItemClick}
              isNavOpen={isNavOpen}
            />
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 bg-zinc-900">
        <div className="flex items-center hover:bg-zinc-700 p-2 rounded">
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
                className="text-white font-bold"
              >
                Flore Denis
              </a>
              <span className="text-red-600 font-semibold text-sm">Admin</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
