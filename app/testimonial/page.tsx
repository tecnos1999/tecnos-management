"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import TestimonialDTO from "@/module/testimonial/dto/TestimonialDTO";
import TestimonialService from "@/module/testimonial/service/TestimonialService";
import ModalTestimonial from "@/module/testimonial/components/ModalTestimonial";
import TestimonialsTable from "@/module/testimonial/components/TestimonialsTable";


const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<TestimonialDTO | null>(
    null
  );
  const testimonialService = useMemo(() => new TestimonialService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const fetchedTestimonials = await testimonialService.getAllTestimonials();
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        toast.error(error as string || "Failed to fetch testimonials");
      }
    };

    fetchTestimonials();
  }, [testimonialService]);

  const handleDeleteRequest = (testimonial: TestimonialDTO) => {
    setTestimonialToDelete(testimonial);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (testimonialToDelete) {
      try {
        await testimonialService.deleteTestimonial(testimonialToDelete.code, user.token);
        setTestimonials((prev) =>
          prev.filter((testimonial) => testimonial.code !== testimonialToDelete.code)
        );
        toast.success(
          `Testimonial from "${testimonialToDelete.name}" deleted successfully.`
        );
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setTestimonialToDelete(null);
  };

  const handleAddTestimonial = async (newTestimonial: TestimonialDTO) => {
    try {
      const message = await testimonialService.addTestimonial(newTestimonial, user.token);
      setTestimonials((prev) => [...prev, newTestimonial]);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const currentItems = filteredTestimonials.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Testimonials</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Testimonial
          </button>
        </div>

        <ModalTestimonial
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTestimonial={handleAddTestimonial}
        />

        <TestimonialsTable
          currentItems={currentItems}
          handleEdit={() => {}}
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
          message={`Are you sure you want to delete the testimonial from "${testimonialToDelete?.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TestimonialsPage;
