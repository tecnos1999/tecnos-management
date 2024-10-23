'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onUpdate: (updatedName: string) => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({
  isOpen,
  onClose,
  currentName,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(currentName);
  useEffect(() => {
    setUpdatedName(currentName);
  }, [currentName]);
  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(updatedName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-1/3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Update Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>

        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="Category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Update
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalUpdate;
