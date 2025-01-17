"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { NewSectionState } from "../dto/NewSectionState";

interface ModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSection: NewSectionState) => void;
}

const ModalSection: React.FC<ModalSectionProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    position: string;
    image: File | null;
  }>({
    title: "",
    content: "",
    position: "left",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    const newSection: NewSectionState = {
      sections: {
        title: formData.title,
        content: formData.content,
        position: formData.position,
        imageUrl: "",
      },
      image: formData.image,
    };

    onSave(newSection);
    setFormData({ title: "", content: "", position: "left", image: null });
    setPreviewImage(null);
    onClose();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    },
    accept: { "image/*": [] }, 
    maxFiles: 1,
  });
  
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
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4">Add New Section</h2>
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
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
              >
                <input {...getInputProps()} />
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-gray-500">
                    Drag & drop an image, or click to select
                  </p>
                )}
              </div>
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

export default ModalSection;
