"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import MottoDTO from "@/module/motto/dto/MottoDTO";
import MottoService from "@/module/motto/services/MottoService";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import ModalAddMotto from "@/module/motto/components/ModalAddMotto";
import MottoTable from "@/module/motto/components/MottoTable";
import Pagination from "@/module/category/components/Pagination";
import SearchBar from "@/module/category/components/SearchBar";
import Dialog from "@/components/Dialog";
import ModalUpdateMotto from "@/module/motto/components/ModalUpdateMotto";

const MottoPage: React.FC = () => {
  const [mottos, setMottos] = useState<MottoDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mottoToDelete, setMottoToDelete] = useState<MottoDTO | null>(null);
  const [mottoToEdit, setMottoToEdit] = useState<MottoDTO | null>(null); 

  const mottoService = useMemo(() => new MottoService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchMottos = async () => {
      try {
        const items = await mottoService.getAllMottos();
        setMottos(items || []);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch mottos."
        );
      }
    };

    fetchMottos();
  }, [mottoService]);

  const handleAddMotto = async (newMotto: MottoDTO) => {
    try {
      const message = await mottoService.addMotto(newMotto, user.token);
      setMottos((prev) => [...prev, newMotto]);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add motto."
      );
    }
  };

  const handleEditRequest = (motto: MottoDTO) => {
    setMottoToEdit(motto);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMotto = async (updatedMotto: MottoDTO) => {
    if (!updatedMotto.code) {
      toast.error("Invalid motto code.");
      return;
    }
    try {
      await mottoService.updateMotto(updatedMotto.code, updatedMotto, user.token);
      setMottos((prev) =>
        prev.map((motto) =>
          motto.code === updatedMotto.code ? updatedMotto : motto
        )
      );
      toast.success("Motto updated successfully.");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update motto."
      );
    }
  };

  const handleDeleteRequest = (motto: MottoDTO) => {
    setMottoToDelete(motto);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (mottoToDelete?.code) {
      try {
        await mottoService.deleteMotto(mottoToDelete.code, user.token);
        setMottos((prev) => prev.filter((m) => m.code !== mottoToDelete.code));
        toast.success("Motto deleted successfully.");
        setIsDialogOpen(false);
        setMottoToDelete(null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete motto."
        );
      }
    }
  };

  const filteredMottos = mottos.filter((motto) =>
    motto.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMottos.length / itemsPerPage);
  const currentItems = filteredMottos.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Mottos</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + Add Motto
          </button>
        </div>

        <MottoTable
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
          message={`Are you sure you want to delete the motto "${mottoToDelete?.content}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />

        <ModalAddMotto
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddMotto={handleAddMotto}
        />

        <ModalUpdateMotto
          isOpen={isUpdateModalOpen}
          motto={mottoToEdit}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateMotto={handleUpdateMotto}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MottoPage;
