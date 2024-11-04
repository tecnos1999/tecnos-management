"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MainSection } from "../enum/MainSection";
import { MainSectionLabels } from "../enum/MainSectionLabels";

interface ModalUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentSection: string;
  onUpdate: (updatedName: string, updatedSection: string) => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({
  isOpen,
  onClose,
  currentName,
  currentSection,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(currentName);
  const [updatedSection, setUpdatedSection] = useState<string>(currentSection);

  useEffect(() => {
    if (isOpen) {
      setUpdatedName(currentName);
      setUpdatedSection(currentSection);
    }
  }, [isOpen, currentName, currentSection]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(updatedName,  updatedSection as string); 
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

        <select
          value={updatedSection}
          onChange={(e) => setUpdatedSection(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:border-red-500"
        >
          <option value="" disabled>
            Select Section
          </option>
          {Object.values(MainSection).map((sectionValue) => (
            <option key={sectionValue} value={sectionValue}>
              {MainSectionLabels[sectionValue as MainSection]}
            </option>
          ))}
        </select>

        {!updatedSection && (
          <p className="text-red-500 mt-2">
            Please select a section before saving.
          </p>
        )}

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
            disabled={!updatedSection}
          >
            Update
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalUpdate;
