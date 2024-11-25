"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ItemCategory } from "../models/ItemCategory";

interface ItemCategoryTableProps {
  currentItems: ItemCategory[];
  handleEdit: (item: ItemCategory) => void;
  handleDelete: (item: ItemCategory) => void;
}

const ItemCategoryTable: React.FC<ItemCategoryTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6">Item Category</th>
            <th className="py-3 px-6">SubCategory</th>
            <th className="py-3 px-6">Category</th>
            <th className="py-3 px-6">Product</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <motion.tr
              key={item.name+item.subcategoryName+item.categoryName}
              className="border-b border-gray-200 hover:bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.subcategoryName}</td>
              <td className="py-3 px-6">{item.categoryName}</td>
              <td className="py-3 px-6">{item.product}</td>
              <td className="py-3 px-6 flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemCategoryTable;
