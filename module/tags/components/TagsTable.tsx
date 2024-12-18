"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TagDTO from "../dto/TagDTO";

interface TagsTableProps {
  currentItems: TagDTO[];
  handleEdit: (tag: TagDTO) => void;
  handleDelete: (tag: TagDTO) => void;
}

const TagsTable: React.FC<TagsTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Name</th>
            <th className="py-3 px-6">Color</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((tag) => (
              <motion.tr
                key={tag.name}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {tag.name}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  <div
                    className="w-20 h-6 rounded-lg shadow-sm border p-4 border-gray-300 flex items-center justify-center text-sm"
                    style={{
                      backgroundColor: tag.color, 
                      color: "#fff", 
                    }}
                  >
                    {tag.color}
                  </div>
                </td>
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(tag)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-500">
                No tags found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TagsTable;
