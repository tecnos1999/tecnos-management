"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import WebinarDTO from "../dto/WebinarDTO";
import WebinarCard from "./WebinarCard";

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

  useEffect(() => {
    if (webinar) {
      setWebinarData({
        title: webinar.title || "",
        externalLink: webinar.externalLink || "",
        image: null,
      });
      setPreviewImage(webinar.imageUrl || null);
    }
  }, [webinar]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleSubmit = () => {
    if (webinar) {
      const updatedWebinar: WebinarDTO = {
        ...webinar,
        title: webinarData.title,
        externalLink: webinarData.externalLink,
        updatedAt: new Date().toISOString(),
      };

      onUpdateWebinar(updatedWebinar, webinarData.image);
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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-6xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Update Webinar</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
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
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter webinar title"
                  />

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
                          &times;
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
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
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
