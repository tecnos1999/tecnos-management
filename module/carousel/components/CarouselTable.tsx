"use client";

import React from "react";
import { motion } from "framer-motion";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarouselDTO from "../dto/CarouselDTO";

interface CarouselTableProps {
  currentItems: CarouselDTO[];
  handleEdit: (item: CarouselDTO) => void;
  handleDelete: (item: CarouselDTO) => void;
}

const CarouselTable: React.FC<CarouselTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">File URL</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <motion.tr
                key={item.fileUrl+item.type}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
              
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {item.type}
                </td>
                <td className="py-3 px-6 text-gray-600 truncate max-w-xs">
                  {item.fileUrl}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {item.createdAt || "N/A"}
                </td>
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarouselTable;
