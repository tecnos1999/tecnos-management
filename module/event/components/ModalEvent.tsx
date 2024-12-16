"use client";

import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import EventDTO from "../dto/EventDTO";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

interface ModalEventProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventDTO) => void;
}

const ModalEvent: React.FC<ModalEventProps> = ({
  isOpen,
  onClose,
  onAddEvent,
}) => {
  const [eventData, setEventData] = useState<{
    title: string;
    description: string;
    externalLink: string;
    image: File | null;
  }>({
    title: "",
    description: "",
    externalLink: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

    const { user } = useContext(LoginContext) as LoginContextType;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setEventData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setEventData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventData.title || !eventData.description) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      

      const newEvent: EventDTO = {
        eventCode: `EVT${Date.now()}`,
        title: eventData.title,
        description: eventData.description,
        externalLink: eventData.externalLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: imageUrl
          ? { url: imageUrl, type: eventData.image?.type || "" }
          : undefined,
      };

      toast.success("Event added successfully!");
      onAddEvent(newEvent);

      setEventData({
        title: "",
        description: "",
        externalLink: "",
        image: null,
      });
      setPreviewImage(null);
      setShowErrors(false);
      onClose();
    } catch (error) {
      toast.error((error as string) || "Failed to add event.");
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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-left text-red-500">
              Add New Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !eventData.title
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter event title"
                  />
                  {showErrors && !eventData.title && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !eventData.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter event description"
                    rows={5}
                  />
                  {showErrors && !eventData.description && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
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
                    name="externalLink"
                    value={eventData.externalLink}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter external link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Image
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
                          alt="Event Preview"
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
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
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

export default ModalEvent;
