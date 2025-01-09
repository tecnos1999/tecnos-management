"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import EventDTO from "../dto/EventDTO";
import EventCard from "./EventCard";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ModalEventProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventDTO, image: File | null) => void;
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setEventData((prev) => ({ ...prev, description: value }));
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
      const eventDTO: EventDTO = {
        eventCode: `EVT${Date.now()}`,
        title: eventData.title,
        description: eventData.description,
        externalLink: eventData.externalLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onAddEvent(eventDTO, eventData.image);

      toast.success("Event added successfully!");
      setEventData({
        title: "",
        description: "",
        externalLink: "",
        image: null,
      });
      setPreviewImage(null);
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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-6xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">
                Add New Event
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
                    } focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter event title"
                  />
                  {showErrors && !eventData.title && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}

                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={eventData.description}
                    onChange={handleDescriptionChange}
                    className={`mt-2 max-h-[40vh] ${
                      showErrors && !eventData.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {showErrors && !eventData.description && (
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
                    value={eventData.externalLink}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter external link"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
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

                <div className="flex justify-center items-center flex-col">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Event Preview
                  </h3>
                  <div className="flex justify-center flex-shrink-0 w-[320px]">
                    <EventCard
                      image={previewImage || "/placeholder.jpg"}
                      title={eventData.title || "Event Title"}
                      subtitle="Event Subtitle"
                      description={eventData.description || "Event description"}
                    />
                  </div>
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

export default ModalEvent;
