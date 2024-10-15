'use cleint';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  icon: IconDefinition;
}

interface SidebarItemProps {
  item: MenuItem;
  activeItem: string;
  onClick: (item: string) => void;
  isNavOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  activeItem,
  onClick,
  isNavOpen,
}) => {
  return (
    <motion.li
      className={`flex items-center p-4 ${isNavOpen? "" : "justify-center"} cursor-pointer rounded-md transition-all duration-300 relative ${
        activeItem === item.name ? "bg-zinc-700" : "hover:bg-zinc-600"
      }`}
      onClick={() => onClick(item.name)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {activeItem === item.name && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r-full" />
      )}

      <div className="flex items-center justify-center">
        <FontAwesomeIcon
          icon={item.icon}
          className={`${isNavOpen ? "mr-3" : "mr-0"}  ${
            activeItem === item.name ? "text-red-600" : "text-gray-400"
          }`}
        />
      </div>

      {isNavOpen && <span className="text-white">{item.name}</span>}
    </motion.li>
  );
};

export default SidebarItem;
