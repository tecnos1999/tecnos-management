"use client"; 

import React, { useState } from 'react';
import Sidebar from "./Sidebar"; 

interface SidebarContainerProps {
  children: React.ReactNode;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true); 

  return (
    <div className="flex h-screen w-full">
      <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      
      <div className={`flex-1 px-8  transition-all  duration-200 ${isNavOpen ? 'ml-64' : 'ml-16'}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
