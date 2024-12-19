"use client";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import ItemCategoryTable from "@/module/itemcategory/components/ItemCategoryTable";
import ModalCreateItemCategory from "@/module/itemcategory/components/ModalCreateItemCategory";
import ModalUpdateItemCategory from "@/module/itemcategory/components/ModalUpdateItemCategory";
import Dialog from "@/components/Dialog";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
import { loadItemCategories } from "@/store/itemcategory/itemCategory.reducers";
import { toast, ToastContainer } from "react-toastify";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import { ItemCategory } from "@/module/itemcategory/models/ItemCategory";

const ItemCategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const itemCategories = useSelector(selectItemCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";

  useEffect(() => {
    const fetchItemCategories = async () => {
      try {
        const fetchedCategories = await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(fetchedCategories));
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchItemCategories();
  }, [dispatch, itemCategoryService]);

  const handleCreate = async (name: string, subCategory: string, category: string) => {
    try {
      await itemCategoryService.createItemCategory(name, subCategory, category, token);
      const updatedCategories = await itemCategoryService.getItemCategories();
      dispatch(loadItemCategories(updatedCategories));
      toast.success(`Item Category "${name}" created successfully.`);
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleUpdate = async (
    updatedName: string,
    updatedSubCategory: string,
    updatedCategory: string
  ) => {
    if (selectedItem) {
      try {
        await itemCategoryService.updateItemCategory(
          selectedItem.name, 
          updatedName, 
          selectedItem.subcategoryName, 
          selectedItem.categoryName, 
          updatedSubCategory, 
          updatedCategory, 
          token 
        );
        const updatedCategories = await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(updatedCategories));
        toast.success(
          `Item Category updated to "${updatedName}" in subcategory "${updatedSubCategory}" under category "${updatedCategory}".`
        );
        setIsEditModalOpen(false);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        await itemCategoryService.deleteItemCategory(
          selectedItem.name,
          selectedItem.subcategoryName,
          selectedItem.categoryName,
          token
        );
        dispatch(
          loadItemCategories(
            itemCategories.filter((item) => item.name !== selectedItem.name)
          )
        );
        toast.success(`Item Category "${selectedItem.name}" deleted successfully.`);
        setIsDialogOpen(false);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const filteredItemCategories = (itemCategories || []).filter(
    (item) =>
      item.name &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const totalPages = Math.ceil(filteredItemCategories.length / itemsPerPage);
  const currentItems = filteredItemCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full h-full mt-4">
      <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-700">Item Categories</h1>
        <SearchBar searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)} />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          + New Item Category
        </button>
      </div>

      <ItemCategoryTable
        currentItems={currentItems}
        handleEdit={(item) => {
          setSelectedItem(item);
          setIsEditModalOpen(true);
        }}
        handleDelete={(item) => {
          setSelectedItem(item);
          setIsDialogOpen(true);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <ModalCreateItemCategory
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {isEditModalOpen && selectedItem && (
        <ModalUpdateItemCategory
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentName={selectedItem.name}
          currentSubCategory={selectedItem.subcategoryName}
          currentCategory={selectedItem.categoryName}
          onUpdate={handleUpdate}
        />
      )}

      <Dialog
        isOpen={isDialogOpen}
        message={`Are you sure you want to delete "${selectedItem?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ItemCategoryPage;
