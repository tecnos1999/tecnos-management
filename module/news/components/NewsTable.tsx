"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import NewsDTO from "../dto/NewsDTO";
import { freeIcons } from "@/system/utils";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface NewsTableProps {
  currentItems: NewsDTO[];
  handleEdit: (newsItem: NewsDTO) => void;
  handleDelete: (newsItem: NewsDTO) => void;
}

const NewsTable: React.FC<NewsTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Title</th>
            <th className="py-3 px-6">Tags</th>
            <th className="py-3 px-6">Icon</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((newsItem) => {
              // Găsim iconița în lista `freeIcons` pe baza numelui
              const iconEntry = freeIcons.find(
                (icon) => icon.name === newsItem.icon.toLowerCase()
              );

              return (
                <motion.tr
                  key={newsItem.uniqueCode}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="py-3 px-6 text-gray-800 font-medium">
                    {newsItem.title}
                  </td>
                  <td className="py-3 px-6 text-gray-600 flex flex-wrap">
                    {newsItem.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="inline-block text-white px-2 py-1 rounded-lg text-xs mr-2 mb-2"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {iconEntry ? (
                      <FontAwesomeIcon
                        icon={iconEntry.icon}
                        className="text-xl"
                      />
                    ) : (
                      <span className="text-red-500">Invalid Icon</span>
                    )}
                  </td>
                  <td className="py-3 px-6 flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(newsItem)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(newsItem)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                    >
                      <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                  </td>
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No news found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
