"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TestimonialDTO from "../dto/TestimonialDTO";

interface ModalTestimonialProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTestimonial: (testimonial: TestimonialDTO) => void;
}

const ModalTestimonial: React.FC<ModalTestimonialProps> = ({
  isOpen,
  onClose,
  onAddTestimonial,
}) => {
  const [testimonialData, setTestimonialData] = useState<{
    name: string;
    position: string;
    company: string;
    testimonial: string;
  }>({
    name: "",
    position: "",
    company: "",
    testimonial: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestimonialData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testimonialData.name || !testimonialData.testimonial) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const newTestimonial: TestimonialDTO = {
        code: `TST${Date.now()}`, // Generare cod unic
        name: testimonialData.name,
        position: testimonialData.position,
        company: testimonialData.company,
        testimonial: testimonialData.testimonial,
      };

      toast.success("Testimonial added successfully!");
      onAddTestimonial(newTestimonial);

      setTestimonialData({
        name: "",
        position: "",
        company: "",
        testimonial: "",
      });
      setShowErrors(false);
      onClose();
    } catch (error) {
      toast.error(error as string || "Failed to add testimonial.");
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
              Add New Testimonial
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={testimonialData.name}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !testimonialData.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter name"
                  />
                  {showErrors && !testimonialData.name && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={testimonialData.position}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter position"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={testimonialData.company}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="testimonial"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Testimonial
                  </label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    value={testimonialData.testimonial}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !testimonialData.testimonial
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter testimonial"
                    rows={5}
                  />
                  {showErrors && !testimonialData.testimonial && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
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

export default ModalTestimonial;
