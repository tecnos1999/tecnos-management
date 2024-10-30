// ModalUpdateSubCategory.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";

interface ModalUpdateSubCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onUpdate: (updatedName: string) => void;
}

const ModalUpdateSubCategory: React.FC<ModalUpdateSubCategoryProps> = ({
  isOpen,
  onClose,
  currentName,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(currentName);
  const [isLoading, setIsLoading] = useState(false);
  const subcategoryService = new SubcategoryService();

  useEffect(() => {
    if (isOpen) {
      setUpdatedName(currentName); 
    }
  }, [isOpen, currentName]);

  const handleUpdate = async () => {
    if (!updatedName.trim()) {
      toast.error("Subcategory name cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      await subcategoryService.updateSubCategory(currentName, updatedName);
      toast.success(`Subcategory updated to "${updatedName}" successfully.`);
      onUpdate(updatedName);
      onClose();
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Failed to update subcategory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Update Subcategory</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="New subcategory name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 mb-4"
          disabled={isLoading}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateSubCategory;
