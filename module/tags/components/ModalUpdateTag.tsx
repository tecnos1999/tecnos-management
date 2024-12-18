"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SketchPicker } from "react-color";
import TagDTO from "../dto/TagDTO";

interface ModalUpdateTagProps {
  isOpen: boolean;
  tag: TagDTO | null;
  onClose: () => void;
  onUpdateTag: (updatedTag: TagDTO) => void;
}

const ModalUpdateTag: React.FC<ModalUpdateTagProps> = ({
  isOpen,
  tag,
  onClose,
  onUpdateTag,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#000000", // Default color
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name,
        color: tag.color,
      });
    }
  }, [tag]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: any) => {
    setFormData((prev) => ({ ...prev, color: color.hex }));
  };

  const handleSubmit = () => {
    if (tag) {
      onUpdateTag({
        ...tag,
        ...formData,
      });
    }
  };

  if (!isOpen || !tag) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Update Tag</h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
            disabled // Name is disabled to prevent changing it
          />
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Color
          </label>
          <SketchPicker
            color={formData.color}
            onChange={handleColorChange}
          />
          <div className="mt-2 text-sm text-gray-500">
            Selected color: {formData.color}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalUpdateTag;
