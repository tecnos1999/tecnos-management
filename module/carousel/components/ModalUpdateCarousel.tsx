"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import CarouselDTO from "../dto/CarouselDTO";

interface ModalUpdateCarouselProps {
  isOpen: boolean;
  item: CarouselDTO | null;
  onClose: () => void;
  onUpdateItem: (updatedItem: CarouselDTO, file: File | null) => void;
}

const ModalUpdateCarousel: React.FC<ModalUpdateCarouselProps> = ({
  isOpen,
  item,
  onClose,
  onUpdateItem,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!item) return;

    const updatedItem: CarouselDTO = {
      ...item,
    };

    onUpdateItem(updatedItem, file);
    setFile(null);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Carousel Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current File
            </label>
            <p className="text-gray-600 truncate max-w-xs">{item.fileUrl}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload New File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              accept="image/*,video/*"
            />
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
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateCarousel;
