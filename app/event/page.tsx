"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import EventDTO from "@/module/event/dto/EventDTO";
import EventService from "@/module/event/service/EventService";
import ModalEvent from "@/module/event/components/ModalEvent";
import ModalUpdateEvent from "@/module/event/components/ModalUpdateEvent"; 
import EventsTable from "@/module/event/components/EventsTable";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventDTO | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventDTO | null>(null);
  const eventService = useMemo(() => new EventService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await eventService.getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        toast.error(error as string || "Failed to fetch events");
      }
    };

    fetchEvents();
  }, [eventService]);

  const handleDeleteRequest = (event: EventDTO) => {
    setEventToDelete(event);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        await eventService.deleteEvent(eventToDelete.eventCode, user.token);
        setEvents((prev) =>
          prev.filter((e) => e.eventCode !== eventToDelete.eventCode)
        );
        toast.success(`Event "${eventToDelete.title}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setEventToDelete(null);
  };

  const handleAddEvent = async (newEvent: EventDTO) => {
    try {
      const message = await eventService.addEvent(newEvent, user.token);
      setEvents((prev) => [...prev, newEvent]);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEditRequest = (event: EventDTO) => {
    setEventToEdit(event);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateEvent = async (
    updatedEvent: EventDTO,
    image: File | null
  ) => {
    try {
      const message = await eventService.updateEvent(updatedEvent, image, user.token);
      const updatedEvents = events.map((e) =>
        e.eventCode === updatedEvent.eventCode ? updatedEvent : e
      );
      setEvents(updatedEvents);
      toast.success(message);
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentItems = filteredEvents.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Events</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Event
          </button>
        </div>

        <ModalEvent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddEvent={handleAddEvent}
        />

        <ModalUpdateEvent
          isOpen={isUpdateModalOpen}
          event={eventToEdit}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateEvent={handleUpdateEvent}
        />

        <EventsTable
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
          message={`Are you sure you want to delete event "${eventToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EventPage;
