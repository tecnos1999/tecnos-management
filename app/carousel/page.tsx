"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import ModalCarousel from "@/module/carousel/components/ModalCarousel";
import ModalUpdateCarousel from "@/module/carousel/components/ModalUpdateCarousel";
import CarouselTable from "@/module/carousel/components/CarouselTable";
import CarouselDTO from "@/module/carousel/dto/CarouselDTO";
import CarouselService from "@/module/carousel/services/CarouselService";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";

const CarouselPage: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CarouselDTO | null>(null);
  const [itemToUpdate, setItemToUpdate] = useState<CarouselDTO | null>(null);

  const carouselService = useMemo(() => new CarouselService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  const fetchCarouselItems = async () => {
    try {
      const items = await carouselService.getAllCarouselItems();
      setCarouselItems(items || []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch carousel items."
      );
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, [carouselService]);

  const handleDeleteRequest = (item: CarouselDTO) => {
    setItemToDelete(item);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete?.code) {
      try {
        await carouselService.deleteCarouselItem(itemToDelete.code, user.token);
        toast.success("Carousel item deleted successfully.");
        fetchCarouselItems(); 
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete carousel item."
        );
      }
    }
    setIsDialogOpen(false);
    setItemToDelete(null);
  };

  const handleAddItem = async (newItem: CarouselDTO, file: File) => {
    try {
      await carouselService.addCarouselItem(newItem, file, user.token);
      toast.success("Carousel item added successfully.");
      setIsModalOpen(false);
      fetchCarouselItems(); 
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add carousel item."
      );
    }
  };

  const handleEditRequest = (item: CarouselDTO) => {
    setItemToUpdate(item);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateItem = async (updatedItem: CarouselDTO, file: File | null) => {
    if (!updatedItem.code) {
      toast.error("Invalid item code.");
      return;
    }
    try {
      await carouselService.updateCarouselItem(updatedItem.code, updatedItem, file, user.token);
      toast.success("Carousel item updated successfully.");
      setIsUpdateModalOpen(false);
      fetchCarouselItems();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update carousel item."
      );
    }
  };

  const filteredItems = carouselItems.filter((item) =>
    item.fileUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Carousel</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Item
          </button>
        </div>

        <ModalCarousel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddItem={handleAddItem}
        />

        <ModalUpdateCarousel
          isOpen={isUpdateModalOpen}
          item={itemToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateItem={handleUpdateItem}
        />

        <CarouselTable
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
          message={`Are you sure you want to delete the item "${itemToDelete?.fileUrl}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CarouselPage;
