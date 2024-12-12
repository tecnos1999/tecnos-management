"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import WebinarDTO from "@/module/webinar/dto/WebinarDTO";
import WebinarService from "@/module/webinar/service/WebinarService";
import ModalWebinar from "@/module/webinar/components/ModalWebinar";
import WebinarsTable from "@/module/webinar/components/WebinarsTable";

const WebinarsPage: React.FC = () => {
  const [webinars, setWebinars] = useState<WebinarDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [webinarToDelete, setWebinarToDelete] = useState<WebinarDTO | null>(null);
  const webinarService = useMemo(() => new WebinarService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const fetchedWebinars = await webinarService.getAllWebinars();
        setWebinars(fetchedWebinars);
      } catch (error) {
        toast.error(error as string || "Failed to fetch webinars");
      }
    };

    fetchWebinars();
  }, [webinarService]);

  const handleDeleteRequest = (webinar: WebinarDTO) => {
    setWebinarToDelete(webinar);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (webinarToDelete) {
      try {
        await webinarService.deleteWebinar(webinarToDelete.webCode, user.token);
        setWebinars((prev) =>
          prev.filter((webinar) => webinar.webCode !== webinarToDelete.webCode)
        );
        toast.success(`Webinar "${webinarToDelete.title}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setWebinarToDelete(null);
  };

  const handleAddWebinar = async (newWebinar: WebinarDTO, image: File | null) => {
    try {
      const message = await webinarService.addWebinar(
        newWebinar,
        image,
        user.token
      );
      const updatedWebinars = await webinarService.getAllWebinars();
      setWebinars(updatedWebinars);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleUpdateWebinar = async (updatedWebinar: WebinarDTO, image: File | null) => {
    try {
      const message = await webinarService.updateWebinar(
        updatedWebinar.webCode, 
        updatedWebinar,
        image,
        user.token 
      );
      toast.success(message);
  
      const updatedWebinars = await webinarService.getAllWebinars();
      setWebinars(updatedWebinars);
    } catch (error) {
      toast.error(error as string);
    }
  };
  
  const filteredWebinars = webinars.filter((webinar) =>
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWebinars.length / itemsPerPage);
  const currentItems = filteredWebinars.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Webinars</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Webinar
          </button>
        </div>

        <ModalWebinar
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddWebinar={handleAddWebinar}
        />

        <WebinarsTable
          currentItems={currentItems}
          handleDelete={handleDeleteRequest}
          onUpdateWebinar={handleUpdateWebinar} 
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
          message={`Are you sure you want to delete webinar "${webinarToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default WebinarsPage;
