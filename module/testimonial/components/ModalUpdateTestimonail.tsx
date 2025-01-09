"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import QuoteCard from "./QuoteCard";
import TestimonialDTO from "../dto/TestimonialDTO";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalUpdateTestimonialProps {
  isOpen: boolean;
  testimonial: TestimonialDTO | null;
  onClose: () => void;
  onUpdateTestimonial: (updatedTestimonial: TestimonialDTO) => void;
}

const ModalUpdateTestimonial: React.FC<ModalUpdateTestimonialProps> = ({
  isOpen,
  testimonial,
  onClose,
  onUpdateTestimonial,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    testimonial: "",
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position || "",
        company: testimonial.company || "",
        testimonial: testimonial.testimonial,
      });
    }
  }, [testimonial]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value: string) => {
    setFormData((prev) => ({ ...prev, testimonial: value }));
  };

  const handleSubmit = () => {
    if (testimonial) {
      onUpdateTestimonial({
        ...testimonial,
        ...formData,
      });
      onClose();
    }
  };

  if (!isOpen || !testimonial) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-700">
            Update Testimonial
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonial
            </label>
            <ReactQuill
              theme="snow"
              value={formData.testimonial}
              onChange={handleQuillChange}
              className="mb-4"
            />
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <QuoteCard
              quote={formData.testimonial || "Testimonial Preview"}
              author={formData.name || "Author Name"}
              job={formData.position || "Position"}
              company={formData.company || "Company Name"}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalUpdateTestimonial;
