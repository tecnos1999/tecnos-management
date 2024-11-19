import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCategories } from "@/store/category/category.selectors";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { Category } from "@/module/category/models/Category";
import { Subcategory } from "@/module/subcategory/models/Subcategory";

interface ModalCreateItemCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, subCategory: string, category: string) => Promise<void>;
}

const ModalCreateItemCategory: React.FC<ModalCreateItemCategoryProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.categoryName === selectedCategory
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  const resetForm = () => {
    setName("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setFilteredSubcategories([]);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Item Category name is required.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    if (!selectedSubCategory) {
      toast.error("Please select a subcategory.");
      return;
    }

    setIsLoading(true);
    try {
      await onCreate(name, selectedSubCategory, selectedCategory);
      resetForm();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create item category.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Item Category</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Category Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 mb-4"
          disabled={isLoading}
        />
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 mb-4"
          disabled={isLoading}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category: Category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={selectedSubCategory || ""}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 mb-4"
          disabled={!selectedCategory || isLoading}
        >
          <option value="" disabled>
            Select Subcategory
          </option>
          {filteredSubcategories.map((subcategory: Subcategory) => (
            <option key={subcategory.name} value={subcategory.name}>
              {subcategory.name}
            </option>
          ))}
        </select>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateItemCategory;
