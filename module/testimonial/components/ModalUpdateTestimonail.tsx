"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonialDTO from "../dto/TestimonialDTO";

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

  const handleSubmit = () => {
    if (testimonial) {
      onUpdateTestimonial({
        ...testimonial,
        ...formData,
      });
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
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Update Testimonial</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
        <textarea
          name="testimonial"
          value={formData.testimonial}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <div className="flex justify-end space-x-4">
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
