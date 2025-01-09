"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import WebinarDTO from "../dto/WebinarDTO";
import WebinarCard from "./WebinarCard";

interface ModalWebinarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWebinar: (webinar: WebinarDTO, image: File | null) => void;
}

const ModalWebinar: React.FC<ModalWebinarProps> = ({
  isOpen,
  onClose,
  onAddWebinar,
}) => {
  const [webinarData, setWebinarData] = useState<{
    title: string;
    externalLink: string;
    image: File | null;
  }>({
    title: "",
    externalLink: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWebinarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setWebinarData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setWebinarData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!webinarData.title) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const newWebinar: WebinarDTO = {
        webCode: `WEB${Date.now()}`,
        title: webinarData.title,
        externalLink: webinarData.externalLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onAddWebinar(newWebinar, webinarData.image);

      setWebinarData({
        title: "",
        externalLink: "",
        image: null,
      });
      setPreviewImage(null);
      setShowErrors(false);
      onClose();
      toast.success("Webinar added successfully!");
    } catch (error) {
      toast.error((error as string) || "Failed to add webinar.");
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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-6xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                Add New Webinar
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Webinar Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={webinarData.title}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !webinarData.title
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter webinar title"
                  />
                  {showErrors && !webinarData.title && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}

                  <label
                    htmlFor="externalLink"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    External Link
                  </label>
                  <input
                    type="url"
                    id="externalLink"
                    name="externalLink"
                    value={webinarData.externalLink}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter external link"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Webinar Image
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                  >
                    <input {...getInputProps()} />
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Webinar Preview"
                          className="w-[250px] h-[250px] object-cover rounded-lg"
                        />
                        <button
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
                      <p className="text-sm text-gray-500">
                        Drag & drop an image, or click to select
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center items-center flex-col">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Webinar Preview
                  </h3>
                  <WebinarCard
                    title={webinarData.title || "Webinar Title"}
                    link={webinarData.externalLink || "#"}
                    imageUrl={previewImage || "/placeholder.jpg"}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-600"
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

export default ModalWebinar;
