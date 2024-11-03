"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCategoryTable from "@/module/itemcategory/components/ItemCategoryTable";
import ModalCreateItemCategory from "@/module/itemcategory/components/ModalCreateItemCategory";
import Pagination from "@/module/category/components/Pagination";
import SearchBar from "@/module/category/components/SearchBar";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import Dialog from "@/components/Dialog";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
import {
  loadItemCategories,
  retrieveItemCategoriesLoading,
  retrieveItemCategoriesError,
  retrieveItemCategoriesSuccess,
} from "@/store/itemcategory/itemCategory.reducers";
import { toast, ToastContainer } from "react-toastify";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

const ItemsCategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const itemCategories = useSelector(selectItemCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemCategoryToDelete, setItemCategoryToDelete] = useState<
    string | null
  >(null);
  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";


  useEffect(() => {
    const fetchItemCategories = async () => {
      dispatch(retrieveItemCategoriesLoading());
      try {
        const fetchedItemCategories = await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(fetchedItemCategories));
        dispatch(retrieveItemCategoriesSuccess());
      } catch (error) {
        dispatch(retrieveItemCategoriesError());
        toast.error(error as string);
      }
    };
  
    fetchItemCategories();
  }, [dispatch, itemCategoryService]);

  const handleCreate = async (name: string, subCategory: string) => {
    try {
      await itemCategoryService.createItemCategory(name, subCategory, token);
      const updatedCategories = await itemCategoryService.getItemCategories();
      dispatch(loadItemCategories(updatedCategories));
      toast.success(`Item Category "${name}" created successfully.`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEdit = async (name: string, updatedName: string) => {
    try {
      await itemCategoryService.updateItemCategory(name, updatedName, token);
      const updatedCategories = await itemCategoryService.getItemCategories();
      dispatch(loadItemCategories(updatedCategories));
      toast.success(
        `Item Category "${name}" updated to "${updatedName}" successfully.`
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDeleteRequest = (name: string) => {
    setItemCategoryToDelete(name);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemCategoryToDelete) {
      try {
        await itemCategoryService.deleteItemCategory(itemCategoryToDelete, token);
        const updatedCategories = await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(updatedCategories));
        toast.success(
          `Item Category "${itemCategoryToDelete}" deleted successfully.`
        );
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setItemCategoryToDelete(null);
  };

  const filteredItemCategories = itemCategories.filter((itemCategory) =>
    itemCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItemCategories.length / itemsPerPage);
  const currentItems = filteredItemCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <div className="flex w-full h-full mt-4">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">
            Items Category
          </h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            + New Item Category
          </button>
        </div>

        <ModalCreateItemCategory
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreate}
        />

        <ItemCategoryTable
          currentItems={currentItems}
          handleEdit={handleEdit}
          handleDelete={handleDeleteRequest}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />

        <Dialog
          isOpen={isDialogOpen}
          message={`Are you sure you want to delete "${itemCategoryToDelete}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ItemsCategoryPage;
