'use client';
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Logip</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <span>🏠</span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <span>📂</span>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <span>📝</span>
                <span>Tasks</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <span>👥</span>
                <span>Team</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Hello, Margaret</h1>
            <p className="text-gray-500">Track team progress here. You almost reached a goal!</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">16 May, 2023</p>
            <img className="w-12 h-12 rounded-full" src="/path/to/profile.jpg" alt="Profile" />
          </div>
        </header>

        {/* Status Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Finished</h2>
            <p className="text-3xl font-bold text-green-500">18</p>
            <p className="text-sm text-green-600">+8 tasks</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Tracked</h2>
            <p className="text-3xl font-bold text-blue-500">31h</p>
            <p className="text-sm text-red-600">-6 hours</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Efficiency</h2>
            <p className="text-3xl font-bold text-green-500">93%</p>
            <p className="text-sm text-green-600">+12%</p>
          </div>
        </motion.div>

        {/* Performance and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Performance Chart (placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Performance</h3>
            <img src="https://via.placeholder.com/600x300" alt="Performance Chart" />
          </div>

          {/* Task List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Current Tasks</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>Product Review for UI8 Market</span>
                <span className="text-gray-500">In progress - 4h</span>
              </li>
              <li className="flex justify-between items-center">
                <span>UX Research for Product</span>
                <span className="text-gray-500">On hold - 8h</span>
              </li>
              <li className="flex justify-between items-center">
                <span>App design and development</span>
                <span className="text-gray-500">Done - 32h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/100" alt="Floyd Miles" />
              <div>
                <p className="font-semibold">Floyd Miles</p>
                <p className="text-gray-500 text-sm">Commented on Stark Project</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/100" alt="Guy Hawkins" />
              <div>
                <p className="font-semibold">Guy Hawkins</p>
                <p className="text-gray-500 text-sm">Added a file to 7Heroes Project</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/100" alt="Kristin Watson" />
              <div>
                <p className="font-semibold">Kristin Watson</p>
                <p className="text-gray-500 text-sm">Commented on 7Heroes Project</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
