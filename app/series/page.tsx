"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import SeriesService from "@/module/series/services/SeriesService";
import { SeriesDTO } from "@/module/series/dto/SeriesDTO";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import ModalSeries from "@/module/series/components/ModalSeries";
import SeriesTable from "@/module/series/components/SeriesTabel";
import ModalUpdateSeries from "@/module/series/components/ModalUpdateSeries";

const SeriesPage: React.FC = () => {
  const [seriesList, setSeriesList] = useState<SeriesDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState<SeriesDTO | null>(null);
  const [seriesToUpdate, setSeriesToUpdate] = useState<SeriesDTO | null>(null);

  const seriesService = useMemo(() => new SeriesService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const fetchedSeries = await seriesService.getAllSeries();
        setSeriesList(fetchedSeries);
      } catch (error) {
        toast.error(error as string || "Failed to fetch series.");
      }
    };

    fetchSeries();
  }, [seriesService]);

  const handleDeleteRequest = (series: SeriesDTO) => {
    setSeriesToDelete(series);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (seriesToDelete) {
      try {
        await seriesService.deleteSeries(seriesToDelete.code, user.token);
        setSeriesList((prev) =>
          prev.filter((item) => item.code !== seriesToDelete.code)
        );
        toast.success(`Series "${seriesToDelete.name}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string || "Failed to delete series.");
      }
    }
    setIsDialogOpen(false);
    setSeriesToDelete(null);
  };

  const handleAddSeries = async (newSeries: SeriesDTO, image: File | null) => {
    try {
      await seriesService.addSeries(newSeries, image, user.token);
      const updatedSeries = await seriesService.getAllSeries();
      setSeriesList(updatedSeries);
      toast.success("Series added successfully.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string || "Failed to add series.");
    }
  };

  const handleEditRequest = (series: SeriesDTO) => {
    setSeriesToUpdate(series);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSeries = async (
    updatedSeries: SeriesDTO,
    image: File | null
  ) => {
    try {
      await seriesService.updateSeries(
        updatedSeries.code,
        updatedSeries,
        image,
        user.token
      );
      const updatedSeriesList = await seriesService.getAllSeries();
      setSeriesList(updatedSeriesList);
      toast.success("Series updated successfully.");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(error as string || "Failed to update series.");
    }
  };

  const filteredSeries = seriesList.filter((series) =>
    series.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSeries.length / itemsPerPage);
  const currentItems = filteredSeries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex w-full h-full mt-4">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">Series</h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearch={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Series
          </button>
        </div>

        <ModalSeries
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddSeries={handleAddSeries}
        />

        <ModalUpdateSeries
          isOpen={isUpdateModalOpen}
          seriesItem={seriesToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateSeries={handleUpdateSeries}
        />

        <SeriesTable
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
          message={`Are you sure you want to delete the series "${seriesToDelete?.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SeriesPage;
