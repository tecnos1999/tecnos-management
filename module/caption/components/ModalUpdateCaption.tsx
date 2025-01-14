"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { CaptionDTO } from "../dto/CaptionDTO";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalUpdateCaptionProps {
  isOpen: boolean;
  captionItem: CaptionDTO | null;
  onClose: () => void;
  onUpdateCaption: (updatedCaption: CaptionDTO, image: File | null) => void;
}

const ModalUpdateCaption: React.FC<ModalUpdateCaptionProps> = ({
  isOpen,
  captionItem,
  onClose,
  onUpdateCaption,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    text: string;
    position: string;
    image: File | null;
  }>({
    title: "",
    text: "",
    position: "left",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (captionItem) {
      setFormData({
        title: captionItem.title,
        text: captionItem.text,
        position: captionItem.position,
        image: null,
      });
      setPreviewImage(captionItem.photoUrl || null);
    }
  }, [captionItem]);

  // Pentru select și input de tip text (cum e title)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pentru textul WYSIWYG (ReactQuill)
  const handleTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, text: value }));
  };

  // Handlers pentru upload imagine
  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // Funcția care se apelează la click pe "Save"
  const handleSubmit = () => {
    if (!captionItem) {
      toast.error("No caption selected for update.");
      return;
    }

    if (!formData.text.trim()) {
      toast.error("Text is required.");
      return;
    }

    const updatedCaption: CaptionDTO = {
      ...captionItem,
      title: formData.title,       // <-- adăugăm și title
      text: formData.text,
      position: formData.position,
    };

    onUpdateCaption(updatedCaption, formData.image);
    onClose();
  };

  if (!isOpen || !captionItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl  max-h-[90vh]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-700">Update Caption</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Input pentru Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-2 p-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Write a caption title..."
                />
              </div>

              {/* Editor text (ReactQuill) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <div className="mt-2 border border-gray-300 rounded-lg shadow-sm focus-within:ring-red-500 focus-within:border-red-500">
                  <ReactQuill
                    theme="snow"
                    value={formData.text}
                    onChange={handleTextChange}
                    className="max-h-80"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                  />
                </div>
              </div>

              {/* Select position */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-2 p-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              {/* Upload Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-[250px] h-[250px] object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & drop an image, or click to select</p>
                  )}
                </div>
              </div>

              {/* Butoane de acțiune */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600"
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalUpdateCaption;
