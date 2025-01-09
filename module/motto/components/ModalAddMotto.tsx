"use client";

import React, { useState } from "react";
import MottoDTO from "../dto/MottoDTO";

interface ModalAddMottoProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMotto: (newMotto: MottoDTO) => void;
}

const ModalAddMotto: React.FC<ModalAddMottoProps> = ({
  isOpen,
  onClose,
  onAddMotto,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMotto({ code: "", content });
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Add Motto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="motto"
              className="block text-sm font-medium text-gray-700"
            >
              Motto Text
            </label>
            <input
              type="text"
              id="motto"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your motto..."
              className="mt-2 block w-full rounded-lg border-2 p-3 text-sm text-gray-900 focus:ring-red-500 focus:border-red-500 border-gray-300 focus:outline-none shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddMotto;
