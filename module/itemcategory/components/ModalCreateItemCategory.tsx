import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { Subcategory } from "@/module/subcategory/models/Subcategory";

interface ModalCreateItemCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, subCategory: string) => Promise<void>;
}

const ModalCreateItemCategory: React.FC<ModalCreateItemCategoryProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const subcategories = useSelector(selectSubcategories);
  const [name, setName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setSelectedSubCategory(null);
    }
  }, [isOpen]);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Item Category name cannot be empty.");
      return;
    }
    if (!selectedSubCategory) {
      toast.error("Please select a subcategory.");
      return;
    }

    setIsLoading(true);
    try {
      await onCreate(name, selectedSubCategory);
      onClose();
    } catch (error:any) {
      console.error("Error creating item category:", error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold text-gray-700">Add New Item Category</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Category Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
          disabled={isLoading}
        />
        <select
          value={selectedSubCategory || ""}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
          disabled={isLoading}
        >
          <option value="" disabled>Select Subcategory</option>
          {subcategories.map((subcategory: Subcategory) => (
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
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
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
