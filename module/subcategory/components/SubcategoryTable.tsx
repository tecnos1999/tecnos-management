'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Subcategory } from "../models/Subcategory";
import ModalUpdateSubCategory from "./ModalUpdateSubCategory";

interface SubcategoryTableProps {
  currentItems: Subcategory[];
  handleEdit: (name: string, updatedName: string) => void;
  handleDelete: (name: string) => void;
}

const SubcategoryTable: React.FC<SubcategoryTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const openUpdateModal = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = (updatedName: string) => {
    handleEdit(selectedSubcategory, updatedName);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 rounded-l-lg">Subcategory</th>
            <th className="py-3 px-6">Category</th>
            <th className="py-3 px-6">Created On</th>
            <th className="py-3 px-6">Updated On</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((subcategory) => (
              <motion.tr
                key={subcategory.name}
                className="border-b border-gray-200 hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <td className="py-3 px-6">{subcategory.name}</td>
                <td className="py-3 px-6">{subcategory.categoryName}</td>
                <td className="py-3 px-6">
                  {new Date(subcategory.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  {new Date(subcategory.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 flex items-center space-x-2">
                  <button
                    onClick={() => openUpdateModal(subcategory.name)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(subcategory.name)}
                    className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No subcategories found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalUpdateSubCategory
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        currentName={selectedSubcategory}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default SubcategoryTable;
