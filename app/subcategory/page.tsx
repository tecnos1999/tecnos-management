"use client";
import React, { useEffect, useMemo, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import {
  loadSubcategories,
  retrieveSubcategoriesError,
  retrieveSubcategoriesLoading,
  retrieveSubcategoriesSuccess,
} from "@/store/subcategory/subcategory.reducers";
import ModalSubcategory from "@/module/subcategory/components/ModalSubcategory";
import ModalUpdateSubCategory from "@/module/subcategory/components/ModalUpdateSubCategory";
import SubcategoryTable from "@/module/subcategory/components/SubcategoryTable";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

const SubcategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const subcategories = useSelector(selectSubcategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
  const [subcategoryToEdit, setSubcategoryToEdit] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const subcategoryService = useMemo(() => new SubcategoryService(), []);
  
  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";

  useEffect(() => {
    const fetchSubcategories = async () => {
      dispatch(retrieveSubcategoriesLoading());
      try {
        const fetchedSubcategories = await subcategoryService.getSubcategories();
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());
      } catch (error) {
        dispatch(retrieveSubcategoriesError());
        toast.info(error as string);        
      }
    };

    fetchSubcategories();
  }, [dispatch, subcategoryService]);

  const openEditModal = (name: string) => {
    setSubcategoryToEdit(name);
    setIsEditModalOpen(true);
  };

  const handleDeleteRequest = (name: string) => {
    setSubcategoryToDelete(name);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (subcategoryToDelete) {
      try {
        await subcategoryService.deleteSubCategory(subcategoryToDelete, token);
        dispatch(
          loadSubcategories(
            subcategories.filter((subcategory) => subcategory.name !== subcategoryToDelete)
          )
        );
        toast.success(`Subcategory "${subcategoryToDelete}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setSubcategoryToDelete(null);
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubcategories.length / itemsPerPage);
  const currentItems = filteredSubcategories.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Subcategory</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Subcategory
          </button>
        </div>

        <ModalSubcategory isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <SubcategoryTable
          currentItems={currentItems}
          handleEdit={openEditModal}  
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
          message={`Are you sure you want to delete "${subcategoryToDelete}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />

        <ModalUpdateSubCategory
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentName={subcategoryToEdit ?? ""}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubcategoryPage;
