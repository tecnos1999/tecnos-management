"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import { InfoCardDTO } from "@/module/infocards/dto/InfoCardDTO";
import InfoCardService from "@/module/infocards/service/InfoCardService";
import ModalInfoCard from "@/module/infocards/components/ModalInfoCard";
import InfoCardsTable from "@/module/infocards/components/InfoCardsTable";
import ModalUpdateInfoCard from "@/module/infocards/components/ModalUpdateInfoCard";

const InfoCardsPage: React.FC = () => {
  const [infoCards, setInfoCards] = useState<InfoCardDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [infoCardToDelete, setInfoCardToDelete] = useState<InfoCardDTO | null>(
    null
  );
  const [infoCardToUpdate, setInfoCardToUpdate] = useState<InfoCardDTO | null>(
    null
  );

  const infoCardService = useMemo(() => new InfoCardService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchInfoCards = async () => {
      try {
        const fetchedInfoCards = await infoCardService.getAllInfoCards();
        setInfoCards(fetchedInfoCards);
      } catch (error) {
        toast.error((error as string) || "Failed to fetch InfoCards.");
      }
    };

    fetchInfoCards();
  }, [infoCardService]);

  const handleDeleteRequest = (infoCard: InfoCardDTO) => {
    setInfoCardToDelete(infoCard);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (infoCardToDelete) {
      try {
        await infoCardService.deleteInfoCard(infoCardToDelete.code, user.token);
        setInfoCards((prev) =>
          prev.filter((infoCard) => infoCard.code !== infoCardToDelete.code)
        );
        toast.success(
          `InfoCard "${infoCardToDelete.title}" deleted successfully.`
        );
      } catch (error) {
        toast.error((error as string) || "Failed to delete InfoCard.");
      }
    }
    setIsDialogOpen(false);
    setInfoCardToDelete(null);
  };

  const handleAddInfoCard = async (newInfoCard: InfoCardDTO) => {
    try {
      await infoCardService.addInfoCard(newInfoCard, user.token);
      console.log("InfoCard added successfully.");
      const updatedInfoCards = await infoCardService.getAllInfoCards();
      console.log(updatedInfoCards);
      setInfoCards(updatedInfoCards);
      toast.success("InfoCard added successfully.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to add InfoCard.");
    }
  };

  const handleEditRequest = (infoCard: InfoCardDTO) => {
    setInfoCardToUpdate(infoCard);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateInfoCard = async (updatedInfoCard: InfoCardDTO) => {
    try {
      const resp = await infoCardService.updateInfoCard(
        updatedInfoCard.code,
        updatedInfoCard,
        user.token
      );
      const updatedInfoCards = await infoCardService.getAllInfoCards();
      setInfoCards(updatedInfoCards);
      toast.success(resp);
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to update InfoCard.");
    }
  };

  const filteredInfoCards = infoCards.filter((infoCard) =>
    infoCard.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInfoCards.length / itemsPerPage);
  const currentItems = filteredInfoCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex w-full h-full mt-4">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">
            InfoCards
          </h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearch={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New InfoCard
          </button>
        </div>

        <ModalInfoCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddInfoCard={handleAddInfoCard}
        />

        <ModalUpdateInfoCard
          isOpen={isUpdateModalOpen}
          infoCard={infoCardToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateInfoCard={handleUpdateInfoCard}
        />

        <InfoCardsTable
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
          message={`Are you sure you want to delete the InfoCard "${infoCardToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default InfoCardsPage;
