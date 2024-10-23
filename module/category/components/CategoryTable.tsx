"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Category } from "../models/Category";
import ModalUpdate from "./ModalUpdate"; 

interface CategoryTableProps {
  currentItems: Category[];
  handleEdit: (name: string, updatedName: string) => void;
  handleDelete: (name: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const openUpdateModal = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = (updatedName: string) => {
    handleEdit(selectedCategory, updatedName); 
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm !important ">
          <th className="py-3 px-6 rounded-l-lg">Category</th>
          <th className="py-3 px-6">Subcategories</th>
          <th className="py-3 px-6">Created On</th>
          <th className="py-3 px-6">Updated On</th>
          <th className="py-3 px-6 rounded-r-lg">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((category) => (
            <motion.tr
              key={category.name}
              className="border-b border-gray-200 hover:bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td className="py-3 px-6">{category.name}</td>
              <td className="py-3 px-6">
                {category.subCategories.map((sub) => (
                  <span
                    key={sub.name}
                    className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-lg mr-2"
                  >
                    {sub.name}
                  </span>
                ))}
              </td>
              <td className="py-3 px-6">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                {new Date(category.updatedAt).toLocaleDateString()}
              </td>

              <td className="py-3 px-6 flex items-center space-x-2">
                <button
                  onClick={() => openUpdateModal(category.name)} 
                  className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                >
                  <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.name)}
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
              No categories found
            </td>
          </tr>
        )}
      </tbody>
    </table>

    <ModalUpdate
      isOpen={isUpdateModalOpen}
      onClose={closeUpdateModal}
      currentName={selectedCategory}
      onUpdate={handleUpdate}
    />
  </div>
  );
};

export default CategoryTable;
