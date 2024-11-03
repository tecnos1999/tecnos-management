import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import { selectCategorys } from "@/store/category/category.selectors";
import { loadSubcategories } from "@/store/subcategory/subcategory.reducers";
import { loadCategorys } from "@/store/category/category.reducers";
import CategoryService from "@/module/category/service/CategoryService";
import { Category } from "@/module/category/models/Category";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

interface ModalSubcategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSubcategory: React.FC<ModalSubcategoryProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategorys);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";

  const subcategoryService = new SubcategoryService();
  const categoryService = new CategoryService();

  useEffect(() => {
    if (!isOpen) {
      setSubcategoryName("");
      setSelectedCategory(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const refreshData = async () => {
    try {
      const fetchedCategories = await categoryService.getCategories();
      const fetchedSubcategories = await subcategoryService.getSubcategories();

      dispatch(loadCategorys(fetchedCategories));
      dispatch(loadSubcategories(fetchedSubcategories));
    } catch (error) {
      toast.error(error as string || "Failed to refresh data.");
    }
  };

  const handleSave = async () => {
    if (!subcategoryName.trim()) {
      toast.error("Subcategory name cannot be empty.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    setIsLoading(true);
    try {
      await subcategoryService.createSubCategory(subcategoryName, selectedCategory, token);
      toast.success(`Subcategory "${subcategoryName}" created successfully.`);
      
      await refreshData();
      onClose();
    } catch (error) {
      toast.error(error as string);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Add New Subcategory</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <input
          type="text"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          placeholder="Subcategory name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 mb-4"
          disabled={isLoading}
        />

        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          disabled={isLoading}
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category: Category) => (
            <option key={category.name} value={category.name}>
              {category.name}
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
            onClick={handleSave}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSubcategory;
