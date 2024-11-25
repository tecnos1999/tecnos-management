import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBoxOpen,
  faChevronRight,
  faThList,
  faFolderTree,
  faLayerGroup,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import { determinePath } from "@/system/utils";

const menuItems = [
  { name: "Dashboard", path: "", icon: faTachometerAlt, color: "bg-blue-500" },
  {
    name: "Products",
    path: "products",
    icon: faBoxOpen,
    color: "bg-yellow-500",
  },
  { name: "Category", path: "category", icon: faThList, color: "bg-red-500" },
  {
    name: "SubCategory",
    path: "subcategory",
    icon: faLayerGroup,
    color: "bg-green-500",
  },
  {
    name: "Items Category",
    path: "items-category",
    icon: faFolderTree,
    color: "bg-purple-500",
  },
];

interface SidebarProps {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isNavOpen, setIsNavOpen }) => {
  const [hoveredItem, setHoveredItem] = useState<string>("");

  const pathname = usePathname();
  const activeItem = menuItems.find((item) =>
    pathname === determinePath(item.path) ||
    pathname.startsWith(determinePath(item.path) + "/")
  )?.name || "Dashboard";
  

  const { user, logOut } = useContext(LoginContext) as LoginContextType;

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-black"
      animate={{ width: isNavOpen ? "16rem" : "5rem" }}
      initial={{ width: "5rem" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div
        className={`flex items-center ${
          isNavOpen ? "justify-between" : "justify-center"
        } p-4 h-16 bg-zinc-900`}
      >
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

        <motion.div
          className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full cursor-pointer"
          onClick={() => setIsNavOpen(!isNavOpen)}
          animate={{ rotate: isNavOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-white text-xl"
          />
        </motion.div>
      </div>

      <nav className="mt-6 mx-3">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <Link href={determinePath(item.path)} key={item.name}>
              <SidebarItem
                item={item}
                activeItem={activeItem === item.name ? item.name : ""}
                hoveredItem={hoveredItem}
                onClick={() => {}}
                onHover={setHoveredItem}
                isNavOpen={isNavOpen}
              />
            </Link>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 bg-zinc-900">
        <motion.div
          className="flex items-center hover:bg-zinc-700 p-2 rounded cursor-pointer transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"
            alt="avatar"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          {isNavOpen && (
            <motion.div
              className="ml-3 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
            >
              <span className="text-white font-bold">
                {user?.firstName.charAt(0).toUpperCase() +
                  user?.firstName.slice(1) || "User"}{" "}
                {user?.lastName.charAt(0).toUpperCase() +
                  user?.lastName.slice(1) || "User"}
              </span>
              <span className="text-red-600 font-semibold text-sm">
                {user?.userRole || "Role"}
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex items-center justify-center mt-4 hover:bg-zinc-700 p-2 rounded cursor-pointer transition-all duration-300"
          onClick={logOut}
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-white text-lg" />
          {isNavOpen && (
            <span className="ml-3 text-white font-semibold">Logout</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
