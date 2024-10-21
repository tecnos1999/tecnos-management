import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  icon: IconDefinition;
  color: string;
}

interface SidebarItemProps {
  item: MenuItem;
  activeItem: string;
  hoveredItem: string; 
  onClick: (item: string) => void;
  onHover: (item: string) => void;
  isNavOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  activeItem,
  hoveredItem, 
  onClick,
  onHover,
  isNavOpen,
}) => {
  const { name, icon, color } = item;
  const isActive = activeItem === name;
  const isHovered = hoveredItem === name;

  return (
    <li
      className={`flex items-center p-4 ${isNavOpen ? "" : "justify-center"} cursor-pointer rounded-md transition-all duration-300 relative`}
      onClick={() => onClick(name)}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover("")}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 p-4 rounded-md transition-colors duration-300 ${
          isActive || isHovered ? color : "bg-gray-800"
        }`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`transition-colors duration-300 ease-in-out ${
            isActive || isHovered ? "text-white" : "text-gray-400"
          }`}
        />
      </div>

      {isNavOpen && (
        <motion.span
          className={`ml-3 font-semibold ${ isHovered ? "text-white" : "text-gray-400"}`}
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {name}
        </motion.span>
      )}
    </li>
  );
};

export default SidebarItem;
