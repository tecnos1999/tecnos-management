import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCategories } from "@/store/category/category.selectors";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";

interface ModalUpdateItemCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentSubCategory: string;
  currentCategory: string;
  onUpdate: (updatedName: string, subCategory: string, category: string) => void;
}

const ModalUpdateItemCategory: React.FC<ModalUpdateItemCategoryProps> = ({
  isOpen,
  onClose,
  currentName,
  currentSubCategory,
  currentCategory,
  onUpdate,
}) => {
  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);

  const [updatedName, setUpdatedName] = useState(currentName);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(currentSubCategory);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setUpdatedName(currentName);
      setSelectedCategory(currentCategory);
      setSelectedSubCategory(currentSubCategory);
      updateAvailableSubcategories(currentCategory);
    }
  }, [isOpen, currentName, currentCategory, currentSubCategory]);

  const updateAvailableSubcategories = (category: string) => {
    const filtered = subcategories
      .filter((subcategory) => subcategory.categoryName === category)
      .map((subcategory) => subcategory.name);
    setAvailableSubcategories(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateAvailableSubcategories(category);
    setSelectedSubCategory(""); 
  };

  const handleUpdate = () => {
    if (!updatedName.trim()) {
      toast.error("Item Category name cannot be empty.");
      return;
    }
    if (!selectedCategory.trim()) {
      toast.error("Please select a valid category.");
      return;
    }
    if (!selectedSubCategory.trim()) {
      toast.error("Please select a valid subcategory.");
      return;
    }
    onUpdate(updatedName, selectedSubCategory, selectedCategory);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Update Item Category</h2>

        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="New Item Category Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
        />

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
          disabled={!selectedCategory}
        >
          <option value="" disabled>
            Select Subcategory
          </option>
          {availableSubcategories.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateItemCategory;
