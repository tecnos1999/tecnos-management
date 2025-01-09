"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsDTO from "../dto/NewsDTO";
import TagDTO from "@/module/tags/dto/TagDTO";
import { freeIcons } from "@/system/utils";

// Import dinamic pentru ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalUpdateNewsProps {
  isOpen: boolean;
  newsItem: NewsDTO | null;
  onClose: () => void;
  onUpdateNews: (updatedNews: NewsDTO) => void;
  availableTags: TagDTO[];
}

const ModalUpdateNews: React.FC<ModalUpdateNewsProps> = ({
  isOpen,
  newsItem,
  onClose,
  onUpdateNews,
  availableTags,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    shortDescription: string;
    longDescription: string;
    tags: TagDTO[];
    icon: string;
  }>({
    title: "",
    shortDescription: "",
    longDescription: "",
    tags: [],
    icon: "",
  });

  const [selectedTags, setSelectedTags] = useState<TagDTO[]>([]);

  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title,
        shortDescription: newsItem.shortDescription,
        longDescription: newsItem.longDescription,
        tags: newsItem.tags || [],
        icon: newsItem.icon || "",
      });
      setSelectedTags(newsItem.tags || []);
    }
  }, [newsItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShortDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, shortDescription: value }));
  };

  const handleLongDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, longDescription: value }));
  };

  const handleTagSelect = (tag: TagDTO) => {
    const alreadySelected = selectedTags.some((t) => t.name === tag.name);
    if (alreadySelected) {
      setSelectedTags((prev) => prev.filter((t) => t.name !== tag.name));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setFormData((prev) => ({ ...prev, tags: selectedTags }));
  };

  const handleIconSelect = (iconName: string) => {
    setFormData((prev) => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newsItem) {
      const updatedNews: NewsDTO = {
        code: newsItem.code,
        ...formData,
        tags: selectedTags,
      };

      onUpdateNews(updatedNews);
      onClose();
    }
  };

  if (!isOpen || !newsItem) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-700">Update News</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`mt-2 block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <ReactQuill
              value={formData.shortDescription}
              onChange={handleShortDescriptionChange}
              className="mt-1 max-h-[12vh] overflow-auto"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Long Description
            </label>
            <ReactQuill
              value={formData.longDescription}
              onChange={handleLongDescriptionChange}
              className="mt-1 max-h-[12vh] overflow-auto"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Tags
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.name}
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTags.some((t) => t.name === tag.name)
                      ? "bg-red-500 text-white border-red-600"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Icon
            </label>
            <div className="grid grid-cols-6 gap-4 max-h-48 overflow-y-auto p-2">
              {freeIcons.map((iconOption) => (
                <button
                  key={iconOption.name}
                  type="button"
                  onClick={() => handleIconSelect(iconOption.name)}
                  className={`p-3 rounded-lg border ${
                    formData.icon === iconOption.name
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300"
                  }`}
                >
                  <FontAwesomeIcon icon={iconOption.icon} size="2x" />
                </button>
              ))}
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
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalUpdateNews;
