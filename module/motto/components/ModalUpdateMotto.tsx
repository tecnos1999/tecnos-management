"use client";

import React, { useEffect, useState } from "react";
import MottoDTO from "../dto/MottoDTO";

interface ModalUpdateMottoProps {
  isOpen: boolean;
  motto: MottoDTO | null;
  onClose: () => void;
  onUpdateMotto: (updatedMotto: MottoDTO) => void;
}

const ModalUpdateMotto: React.FC<ModalUpdateMottoProps> = ({
  isOpen,
  motto,
  onClose,
  onUpdateMotto,
}) => {
  const [content, setContent] = useState<string>(motto?.content|| "");

  useEffect(() => {
    if (motto) {
      setContent(motto.content);
    }
  }, [motto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Motto text cannot be empty.");
      return;
    }

    if (!motto) return;

    const updatedMotto: MottoDTO = {
      ...motto,
      content,
    };

    onUpdateMotto(updatedMotto);
    onClose();
  };

  if (!isOpen || !motto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Motto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Motto Text
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Update Motto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateMotto;
