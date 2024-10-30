'use client';
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import { toast } from "react-toastify";
import Dialog from "@/components/Dialog";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { loadSubcategories, retrieveSubcategoriesError, retrieveSubcategoriesLoading, retrieveSubcategoriesSuccess } from "@/store/subcategory/subcategory.reducers";
import ModalSubcategory from "@/module/subcategory/components/ModalSubcategory";
import SubcategoryTable from "@/module/subcategory/components/SubcategoryTable";

const SubcategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const subcategories = useSelector(selectSubcategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
  const subcategoryService = useMemo(() => new SubcategoryService(), []);


  useEffect(() => {
    const fetchSubcategories = async () => {
      dispatch(retrieveSubcategoriesLoading());
      try {
        const fetchedSubcategories = await subcategoryService.getSubcategories();
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());
      } catch (error) {
        dispatch(retrieveSubcategoriesError());
        console.error("Failed to fetch subcategories", error);
      }
    };

    fetchSubcategories();
  }, [dispatch , subcategoryService]);

  const handleDeleteRequest = (name: string) => {
    setSubcategoryToDelete(name);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (subcategoryToDelete) {
      try {
        await subcategoryService.deleteSubCategory(subcategoryToDelete);
        dispatch(
          loadSubcategories(
            subcategories.filter((subcategory) => subcategory.name !== subcategoryToDelete)
          )
        );
        toast.success(`Subcategory "${subcategoryToDelete}" deleted successfully.`);
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        toast.error("Failed to delete subcategory. Please try again.");
      }
    }
    setIsDialogOpen(false);
    setSubcategoryToDelete(null);
  };

  const handleEdit = async (name: string, updatedName: string) => {
    try {
      await subcategoryService.updateSubCategory(name, updatedName);
      dispatch(
        loadSubcategories(
          subcategories.map((subcategory) =>
            subcategory.name === name ? { ...subcategory, name: updatedName } : subcategory
          )
        )
      );
      toast.success(`Subcategory "${name}" updated to "${updatedName}" successfully.`);
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Failed to update subcategory. Please try again.");
    }
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubcategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubcategories.slice(indexOfFirstItem, indexOfLastItem);

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
          message={`Are you sure you want to delete "${subcategoryToDelete}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default SubcategoryPage;
