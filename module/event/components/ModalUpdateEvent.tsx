"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import EventDTO from "../dto/EventDTO";
import EventCard from "./EventCard";
import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ModalUpdateEventProps {
  isOpen: boolean;
  event: EventDTO | null;
  onClose: () => void;
  onUpdateEvent: (updatedEvent: EventDTO, image: File | null) => void;
}

const ModalUpdateEvent: React.FC<ModalUpdateEventProps> = ({
  isOpen,
  event,
  onClose,
  onUpdateEvent,
}) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    externalLink: "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title || "",
        description: event.description || "",
        externalLink: event.externalLink || "",
        image: null,
      });
      setPreviewImage(event.imageUrl || null);
    }
  }, [event]);

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

  const handleSubmit = () => {
    if (!eventData.title || !eventData.description) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (event) {
        const updatedEvent: EventDTO = {
          ...event,
          title: eventData.title,
          description: eventData.description,
          externalLink: eventData.externalLink,
          updatedAt: new Date().toISOString(),
        };

        onUpdateEvent(updatedEvent, eventData.image);
        toast.success("Event updated successfully!");
        onClose();
      }
    } catch (error) {
      toast.error((error as string) || "Failed to update event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !event) return null;

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
                Update Event
              </h2>
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
                    className="mt-2"
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

export default ModalUpdateEvent;
