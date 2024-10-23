"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategory from "../../module/category/components/ModalCategory";
import SearchBar from "@/module/category/components/SearchBar";
import CategoryTable from "../../module/category/components/CategoryTable";
import Pagination from "@/module/category/components/Pagination";
import CategoryService from "@/module/category/service/CategoryService";
import { selectCategorys } from "@/store/category/category.selectors";
import {
  loadCategorys,
  retrieveCategorysError,
  retrieveCategorysLoading,
  retrieveCategorysSuccess,
} from "@/store/category/category.reducers";
import { toast } from "react-toastify";

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategorys);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryService = new CategoryService();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(retrieveCategorysLoading());
      try {
        const fetchedCategories = await categoryService.getCategories();
        dispatch(loadCategorys(fetchedCategories));
        dispatch(retrieveCategorysSuccess());
      } catch (error) {
        dispatch(retrieveCategorysError());
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleDelete = async (name: string) => {
    try {
      await categoryService.deleteCategory(name);
      dispatch(loadCategorys(categories.filter(category => category.name !== name)));
  
      toast.success(`Category "${name}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting category:", error);
      
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const handleEdit = async (name: string, updatedName: string) => {
    try {
      await categoryService.updateCategory(name, updatedName);
      dispatch(
        loadCategorys(
          categories.map((category) =>
            category.name === name ? { ...category, name: updatedName } : category
          )
        )
      );
      toast.success(`Category "${name}" updated to "${updatedName}" successfully.`);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };
  

  return (
    <div className="flex w-full h-full mt-4">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">
            Category
          </h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Category
          </button>
        </div>

        <ModalCategory
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <CategoryTable
          currentItems={currentItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage} 
        />
      </div>
    </div>
  );
};

export default CategoryPage;
