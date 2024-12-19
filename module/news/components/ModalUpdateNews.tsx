"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsDTO from "../dto/NewsDTO";
import TagDTO from "@/module/tags/dto/TagDTO";
import { freeIcons } from "@/system/utils";

interface ModalUpdateNewsProps {
  isOpen: boolean;
  newsItem: NewsDTO | null;
  onClose: () => void;
  onUpdateNews: (updatedNews: NewsDTO) => void;
  availableTags: TagDTO[]; // Lista de tag-uri disponibile
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <h2 className="text-xl font-bold mb-4">Update News</h2>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Long Description
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            ></textarea>
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
            <div className="grid grid-cols-6 gap-4 max-h-48 overflow-y-scroll">
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
                  <p className="text-xs mt-2">{iconOption.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Update News
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalUpdateNews;
