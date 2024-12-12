"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import PartnersService from "@/module/partners/service/PartnersService";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import PartnersTable from "@/module/partners/components/PartnersTable";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import { PartnerDTO } from "@/module/partners/dto/PartnerDTO";
import AddPartnerModal from "@/module/partners/components/AddPartnerModal";
import EditPartnerModal from "@/module/partners/components/EditPartnerModal";

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState<PartnerDTO | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerDTO | null>(
    null
  );
  const partnersService = useMemo(() => new PartnersService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const fetchedPartners = await partnersService.getAllPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        toast.error((error as string) || "Failed to fetch partners");
      }
    };

    fetchPartners();
  }, [partnersService]);

  const handleDeleteRequest = (partner: PartnerDTO) => {
    setPartnerToDelete(partner);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (partnerToDelete) {
      try {
        await partnersService.deletePartner(partnerToDelete.name, user.token);
        setPartners((prev) =>
          prev.filter((partner) => partner.name !== partnerToDelete.name)
        );
        toast.success(
          `Partner "${partnerToDelete.name}" deleted successfully.`
        );
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setPartnerToDelete(null);
  };

  const handleAddPartner = async (
    newPartner: PartnerDTO,
    logo: File | null,
    catalog: File | null
  ) => {
    try {
      const message = await partnersService.addPartner(
        newPartner,
        logo,
        catalog,
        user.token
      );
      setPartners((prev) => [...prev, newPartner]);
      toast.success(message);
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error((error as string) || "Failed to add partner");
    }
  };

  const handleEditPartner = async (
    updatedPartner: PartnerDTO,
    logo: File | null,
    catalog: File | null
  ) => {
    try {
      const message = await partnersService.updatePartner(
        updatedPartner.name,
        updatedPartner,
        logo,
        catalog,
        user.token
      );
      setPartners((prev) =>
        prev.map((partner) =>
          partner.name === updatedPartner.name ? updatedPartner : partner
        )
      );
      toast.success(message);
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error((error as string) || "Failed to update partner");
    }
  };

  const handleOpenEditModal = (partner: PartnerDTO) => {
    setPartnerToEdit(partner);
    setIsEditModalOpen(true);
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
            onClick={() => setIsAddModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Partner
          </button>
        </div>

        <AddPartnerModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSavePartner={handleAddPartner}
        />

        <EditPartnerModal
          isOpen={isEditModalOpen}
          partner={partnerToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSavePartner={handleEditPartner}
        />

        <PartnersTable
          currentItems={currentItems}
          handleEdit={handleOpenEditModal}
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
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PartnersPage;