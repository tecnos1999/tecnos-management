import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface ModalUpdateItemCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onUpdate: (updatedName: string) => void;
}

const ModalUpdateItemCategory: React.FC<ModalUpdateItemCategoryProps> = ({
  isOpen,
  onClose,
  currentName,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(currentName);

  useEffect(() => {
    if (isOpen) {
      setUpdatedName(currentName);
    }
  }, [isOpen, currentName]);

  const handleUpdate = () => {
    if (!updatedName.trim()) {
      toast.error("Item Category name cannot be empty.");
      return;
    }
    onUpdate(updatedName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold text-gray-700">Update Item Category</h2>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="New Item Category Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateItemCategory;
