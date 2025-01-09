"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { SketchPicker } from "react-color";
import TagDTO from "../dto/TagDTO";

interface ModalTagProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (tag: TagDTO) => void;
}

const ModalTag: React.FC<ModalTagProps> = ({ isOpen, onClose, onAddTag }) => {
  const [tagData, setTagData] = useState<{ name: string; color: string }>({
    name: "",
    color: "#000000",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTagData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: any) => {
    setTagData((prev) => ({ ...prev, color: color.hex }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tagData.name) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const newTag: TagDTO = {
        name: tagData.name,
        color: tagData.color,
      };

      toast.success("Tag added successfully!");
      onAddTag(newTag);

      setTagData({ name: "", color: "#000000" });
      setShowErrors(false);
      onClose();
    } catch (error) {
      toast.error((error as string) || "Failed to add tag.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Add New Tag</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tag Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={tagData.name}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-lg border-2 ${
                    showErrors && !tagData.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
                  placeholder="Enter tag name"
                />
                {showErrors && !tagData.name && (
                  <p className="text-xs text-red-500 mt-1">
                    Please provide a tag name.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tag Color
                </label>
                <SketchPicker
                  color={tagData.color}
                  onChange={handleColorChange}
                  className="shadow-md rounded-lg"
                />
                <div className="mt-2 text-sm text-gray-500">
                  Selected color:{" "}
                  <span
                    style={{ backgroundColor: tagData.color }}
                    className="inline-block w-4 h-4 rounded-full border ml-1"
                  ></span>{" "}
                  {tagData.color}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalTag;
