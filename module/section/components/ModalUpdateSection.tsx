import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewSectionState } from "../dto/NewSectionState";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
interface ModalUpdateSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedSection: NewSectionState) => void;
  sectionData: NewSectionState | null;
}

const ModalUpdateSection: React.FC<ModalUpdateSectionProps> = ({
  isOpen,
  onClose,
  onUpdate,
  sectionData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    position: "left",
    image: null as File | null,
  });

  useEffect(() => {
    if (sectionData) {
      setFormData({
        title: sectionData.sections.title,
        content: sectionData.sections.content,
        position: sectionData.sections.position,
        image: sectionData.image || null,
      });
    }
  }, [sectionData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and content are required.");
      return;
    }

    const updatedSection: NewSectionState = {
      sections: {
        title: formData.title,
        content: formData.content,
        position: formData.position,
        imageUrl: "", 
      },
      image: formData.image,
    };

    onUpdate(updatedSection);
    onClose();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4">Update Section</h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Section Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter section title"
                className="block w-full rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                placeholder="Enter content"
                className="mt-2 rounded-lg shadow-sm border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Position
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.image && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {formData.image.name}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalUpdateSection;
