"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import TestimonialDTO from "../dto/TestimonialDTO";
import QuoteCard from "./QuoteCard";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTestimonialData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialChange = (value: string) => {
    setTestimonialData((prev) => ({ ...prev, testimonial: value }));
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
        code: `TST${Date.now()}`,
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
      toast.error((error as string) || "Failed to add testimonial.");
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
                Add New Testimonial
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
                    } focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter name"
                  />
                  {showErrors && !testimonialData.name && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}

                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={testimonialData.position}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter position"
                  />

                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={testimonialData.company}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter company"
                  />

                  <label
                    htmlFor="testimonial"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Testimonial
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={testimonialData.testimonial}
                    onChange={handleTestimonialChange}
                    className={`mt-2 ${
                      showErrors && !testimonialData.testimonial
                        ? "border-red-500 focus:outline-none"
                        : "border-gray-300"
                    }`}
                  />
                  {showErrors && !testimonialData.testimonial && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Testimonial Preview
                  </h3>
                  <QuoteCard
                    quote={testimonialData.testimonial || "Testimonial text"}
                    author={testimonialData.name || "Author Name"}
                    job={testimonialData.position || "Position"}
                    company={testimonialData.company || "Company Name"}
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

export default ModalTestimonial;
