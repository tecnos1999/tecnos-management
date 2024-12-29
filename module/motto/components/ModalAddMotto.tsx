"use client";

import React, { useState } from "react";
import MottoDTO from "../dto/MottoDTO";

interface ModalAddMottoProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMotto: (newMotto: MottoDTO) => void;
}

const ModalAddMotto: React.FC<ModalAddMottoProps> = ({ isOpen, onClose, onAddMotto }) => {
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Motto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
              required
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddMotto;
