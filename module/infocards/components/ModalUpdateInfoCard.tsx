"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { InfoCardDTO } from "../dto/InfoCardDTO";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import InfoCard from "./InfoCard";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ModalUpdateInfoCardProps {
  isOpen: boolean;
  infoCard: InfoCardDTO | null;
  onClose: () => void;
  onUpdateInfoCard: (updatedInfoCard: InfoCardDTO) => void;
}

const ModalUpdateInfoCard: React.FC<ModalUpdateInfoCardProps> = ({
  isOpen,
  infoCard,
  onClose,
  onUpdateInfoCard,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    features: string[];
  }>({
    title: "",
    description: "",
    features: [],
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (infoCard) {
      setFormData({
        title: infoCard.title,
        description: infoCard.description,
        features: infoCard.features || [],
      });
    }
  }, [infoCard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
      toast.success("Feature added.");
    } else {
      toast.error("Feature cannot be empty.");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
    toast.info("Feature removed.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    const updatedInfoCard: InfoCardDTO = {
      ...infoCard!,
      title: formData.title,
      description: formData.description,
      features: formData.features,
    };

    onUpdateInfoCard(updatedInfoCard);
    onClose();
  };

  if (!isOpen || !infoCard) return null;

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
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl relative flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Update InfoCard
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    className="mt-2 rounded-lg shadow-sm border focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="features"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Features
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      id="features"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      +
                    </button>
                  </div>
                  {formData.features.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {formData.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Preview
              </h3>
              <InfoCard
                title={formData.title}
                description={formData.description}
                features={formData.features}
                code={infoCard.code}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalUpdateInfoCard;
