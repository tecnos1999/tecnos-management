"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import CaptionService from "@/module/caption/services/CaptionService";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import { CaptionDTO } from "@/module/caption/dto/CaptionDTO";
import SearchBar from "@/module/category/components/SearchBar";
import CaptionTable from "@/module/caption/components/CaptionTable";
import Pagination from "@/module/category/components/Pagination";
import ModalCaption from "@/module/caption/components/ModalCaption";
import ModalUpdateCaption from "@/module/caption/components/ModalUpdateCaption";

const CaptionPage: React.FC = () => {
  const [captions, setCaptions] = useState<CaptionDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [captionToDelete, setCaptionToDelete] = useState<CaptionDTO | null>(null);
  const [captionToUpdate, setCaptionToUpdate] = useState<CaptionDTO | null>(null);

  const captionService = useMemo(() => new CaptionService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const fetchedCaptions = await captionService.getAllCaptions();
        setCaptions(fetchedCaptions);
      } catch (error) {
        toast.error(error as string || "Failed to fetch captions.");
      }
    };

    fetchCaptions();
  }, [captionService]);

  const handleDeleteRequest = (captionItem: CaptionDTO) => {
    setCaptionToDelete(captionItem);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (captionToDelete) {
      try {
        await captionService.deleteCaption(captionToDelete.code, user.token);
        setCaptions((prev) =>
          prev.filter((item) => item.code !== captionToDelete.code)
        );
        toast.success(`Caption "${captionToDelete.text}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string || "Failed to delete caption.");
      }
    }
    setIsDialogOpen(false);
    setCaptionToDelete(null);
  };

  const handleAddCaption = async (newCaption: CaptionDTO, image: File | null) => {
    try {
      const response = await captionService.addCaption(newCaption, image, user.token);
      const createdCaption = { ...newCaption, code: response };
      setCaptions((prev) => [...prev, createdCaption]);
      toast.success("Caption added successfully.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string || "Failed to add caption.");
    }
  };

  const handleEditRequest = (captionItem: CaptionDTO) => {
    setCaptionToUpdate(captionItem);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCaption = async (updatedCaption: CaptionDTO, image: File | null) => {
    try {
      await captionService.updateCaption(updatedCaption.code, updatedCaption, image, user.token);
      setCaptions((prev) =>
        prev.map((item) =>
          item.code === updatedCaption.code ? updatedCaption : item
        )
      );
      toast.success("Caption updated successfully.");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(error as string || "Failed to update caption.");
    }
  };

  const filteredCaptions = captions.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCaptions.length / itemsPerPage);
  const currentItems = filteredCaptions.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Captions</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Caption
          </button>
        </div>

        <ModalCaption
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddCaption={handleAddCaption}
        />

        <ModalUpdateCaption
          isOpen={isUpdateModalOpen}
          captionItem={captionToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateCaption={handleUpdateCaption}
        />

        <CaptionTable
          currentItems={currentItems}
          handleEdit={handleEditRequest}
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
          message={`Are you sure you want to delete the caption "${captionToDelete?.code}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CaptionPage;
