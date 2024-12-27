"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import WebinarDTO from "../dto/WebinarDTO";

interface ModalUpdateWebinarProps {
  isOpen: boolean;
  webinar: WebinarDTO | null;
  onClose: () => void;
  onUpdateWebinar: (updatedWebinar: WebinarDTO, image: File | null) => void;
}

const ModalUpdateWebinar: React.FC<ModalUpdateWebinarProps> = ({
  isOpen,
  webinar,
  onClose,
  onUpdateWebinar,
}) => {
  const [title, setTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (webinar) {
      setTitle(webinar.title || "");
      setExternalLink(webinar.externalLink || "");
      setPreviewImage(webinar.imageUrl || null);
    }
  }, [webinar]);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = () => {
    if (webinar) {
      const updatedWebinar: WebinarDTO = {
        ...webinar,
        title,
        externalLink,
        updatedAt: new Date().toISOString(),
      };

      onUpdateWebinar(updatedWebinar, image);
      onClose();
    }
  };

  if (!isOpen || !webinar) return null;

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
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Update Webinar</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter webinar title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="externalLink"
                    className="block text-sm font-medium text-gray-700"
                  >
                    External Link
                  </label>
                  <input
                    type="url"
                    id="externalLink"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter external link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="mb-4">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Webinar Preview"
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No image available</span>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload New Image (optional)
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                  >
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-500">
                      Drag & drop an image, or click to select
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSubmit}
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-600"
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

export default ModalUpdateWebinar;
