import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CategoryService from "../service/CategoryService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  loadCategorys,
  retrieveCategorysSuccess,
  retrieveCategorysError,
} from "@/store/category/category.reducers";
import { LoginContext } from "@/module/context/LoginProvider";
import { MainSection } from "../enum/MainSection";
import { MainSectionLabels } from "../enum/MainSectionLabels";

interface ModalCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCategory: React.FC<ModalCategoryProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [mainSection, setMainSection] = useState<MainSection>(
    MainSection.ACASA
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categoryService = new CategoryService();

  const { user } = useContext(LoginContext) ?? {};
  const token = user?.token ?? "";

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      await categoryService.createCategory(categoryName, token, mainSection as string);
      toast.success(`Category "${categoryName}" created successfully.`);

      const updatedCategories = await categoryService.getCategories();
      dispatch(loadCategorys(updatedCategories));
      dispatch(retrieveCategorysSuccess());

      setCategoryName("");
      setMainSection(MainSection.ACASA);
      onClose();
    } catch (error) {
      dispatch(retrieveCategorysError());
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 w-1/3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">
              Add New Category
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>

          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            disabled={isLoading}
          />
          <select
            value={mainSection}
            onChange={(e) => setMainSection(e.target.value as MainSection)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:border-red-500"
            disabled={isLoading}
          >
            <option value="" disabled>
              Select Section
            </option>
            {Object.values(MainSection).map((section) => (
              <option key={section} value={section}>
                {MainSectionLabels[section]}
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
              className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ModalCategory;
