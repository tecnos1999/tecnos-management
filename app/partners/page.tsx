"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
// import ModalPartner from "@/module/partners/components/ModalPartner";
// import ModalUpdatePartner from "@/module/partners/components/ModalUpdatePartner";
import PartnersDTO from "@/module/partners/dto/PartnersDTO";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import PartnersTable from "@/module/partners/components/PartnersTable";
import ModalPartner from "@/module/partners/components/ModalPartner";

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnersDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnersDTO | null>(null);
  const [partnerToEdit, setPartnerToEdit] = useState<PartnersDTO | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);




  const handleDeleteRequest = (partner: PartnersDTO) => {
    setPartnerToDelete(partner);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log(partnerToDelete);
  };

  const openEditModal = (partner: PartnersDTO) => {
    setPartnerToEdit(partner);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setPartnerToEdit(null);
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const currentItems = filteredPartners.slice(
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
            Partners
          </h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Partner
          </button>
        </div>

        <ModalPartner isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <PartnersTable
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
          message={`Are you sure you want to delete partner "${partnerToDelete?.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
{/* 
        {partnerToEdit && (
          <ModalUpdatePartner
            isOpen={isEditModalOpen}
            onClose={handleEditClose}
            partner={partnerToEdit}
          />
        )} */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PartnersPage;
