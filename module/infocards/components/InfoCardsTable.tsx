"use client";

import React from "react";
import { motion } from "framer-motion";
import { InfoCardDTO } from "../dto/InfoCardDTO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface InfoCardsTableProps {
  currentItems: InfoCardDTO[];
  handleEdit: (infoCardItem: InfoCardDTO) => void;
  handleDelete: (infoCardItem: InfoCardDTO) => void;
}

const InfoCardsTable: React.FC<InfoCardsTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6">Code</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Features</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((infoCard) => (
              <motion.tr
                key={infoCard.code}
                className="border-b border-gray-200 hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <td className="py-3 px-6">{infoCard.code}</td>
                <td className="py-3 px-6">{infoCard.title}</td>
                <td
                  className="py-3 px-6 truncate"
                  dangerouslySetInnerHTML={{ __html: infoCard.description }}
                ></td>
                <td className="py-3 px-6 truncate">
                  {infoCard.features.join(", ")}
                </td>

                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(infoCard)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(infoCard)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No InfoCards found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InfoCardsTable;
