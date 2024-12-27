"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { PartnerDTO } from "../dto/PartnerDTO";

interface PartnersTableProps {
  currentItems: PartnerDTO[];
  handleEdit: (partner: PartnerDTO) => void;
  handleDelete: (partner: PartnerDTO) => void;
}

const PartnersTable: React.FC<PartnersTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Image</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Catalog</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((partner) => (
              <motion.tr
                key={partner.name}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6">
                  {partner.imageUrl ? (
                    <div className="w-16 h-16 flex items-center justify-center  overflow-hidden bg-gray-100">
                      <img
                        src={partner.imageUrl}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center ">
                      <span className="text-[10px] text-center text-gray-500">
                        No Image
                      </span>
                    </div>
                  )}
                </td>

                <td className="py-3 px-6 text-gray-800 font-medium">
                  {partner.name}
                </td>

                <td className="py-3 px-6 text-gray-600">
                  {partner.description}
                </td>

                <td className="py-3 px-6 ">
                  {partner.catalogFile ? (
                    <a
                      href={partner.catalogFile}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Catalog
                    </a>
                  ) : (
                    <span className="text-gray-500">No Catalog</span>
                  )}
                </td>

                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(partner)}
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
                No partners found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PartnersTable;
