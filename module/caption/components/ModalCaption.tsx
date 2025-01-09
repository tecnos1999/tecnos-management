import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { CaptionDTO } from "../dto/CaptionDTO";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalCaptionProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCaption: (caption: CaptionDTO, image: File | null) => void;
}

const ModalCaption: React.FC<ModalCaptionProps> = ({
  isOpen,
  onClose,
  onAddCaption,
}) => {
  const [formData, setFormData] = useState<{
    text: string;
    position: string;
    image: File | null;
  }>({
    text: "",
    position: "left",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.text.trim()) {
      toast.error("Text is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newCaption: CaptionDTO = {
        code: `CAP${Date.now()}`,
        text: formData.text,
        position: formData.position,
        photoUrl: "",
        active: false,
      };

      onAddCaption(newCaption, formData.image);

      setFormData({
        text: "",
        position: "left",
        image: null,
      });
      setPreviewImage(null);
      onClose();
    } catch (error) {
      toast.error(error as string || "Failed to add caption.");
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
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <FaTimesCircle size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Add Caption
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Text
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.text}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, text: value }))
                  }
                  className="shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-100 focus:outline-none"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white rounded-full shadow p-2 hover:bg-red-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      Drag & drop an image, or click to select
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600"
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

export default ModalCaption;
