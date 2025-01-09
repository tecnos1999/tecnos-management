"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { CaptionDTO } from "../dto/CaptionDTO";

interface CaptionTableProps {
  currentItems: CaptionDTO[];
  handleEdit: (captionItem: CaptionDTO) => void;
  handleDelete: (captionItem: CaptionDTO) => void;
}

const CaptionTable: React.FC<CaptionTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Code</th>
            <th className="py-3 px-6">Text</th>
            <th className="py-3 px-6">Position</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((captionItem) => (
              <motion.tr
                key={captionItem.code}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {captionItem.code}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  <div
                    dangerouslySetInnerHTML={{ __html: captionItem.text }}
                    className="prose max-w-none"
                  />
                </td>

                <td className="py-3 px-6 text-gray-600">
                  {captionItem.position}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {captionItem.photoUrl ? (
                    <img
                      src={captionItem.photoUrl}
                      alt="Caption"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  <button
                    className={`px-4 py-2 rounded-full text-white ${
                      captionItem.active ? "bg-green-500" : "bg-red-500"
                    }`}
                    disabled
                  >
                    {captionItem.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(captionItem)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(captionItem)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No captions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaptionTable;
