"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import TagDTO from "@/module/tags/dto/TagDTO";
import TagService from "@/module/tags/services/TagService";
import ModalTag from "@/module/tags/components/ModalTag";
import ModalUpdateTag from "@/module/tags/components/ModalUpdateTag";
import TagsTable from "@/module/tags/components/TagsTable";


const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<TagDTO | null>(null);
  const [tagToUpdate, setTagToUpdate] = useState<TagDTO | null>(null);

  const tagService = useMemo(() => new TagService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await tagService.getAllTags();
        setTags(fetchedTags);
      } catch (error) {
        toast.error(error as string || "Failed to fetch tags");
      }
    };

    fetchTags();
  }, [tagService]);

  const handleDeleteRequest = (tag: TagDTO) => {
    setTagToDelete(tag);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (tagToDelete) {
      try {
        await tagService.deleteTag(tagToDelete.name, user.token);
        setTags((prev) => prev.filter((tag) => tag.name !== tagToDelete.name));
        toast.success(`Tag "${tagToDelete.name}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setTagToDelete(null);
  };

  const handleAddTag = async (newTag: TagDTO) => {
    try {
      const message = await tagService.addTag(newTag, user.token);
      setTags((prev) => [...prev, newTag]);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEditRequest = (tag: TagDTO) => {
    setTagToUpdate(tag);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateTag = async (updatedTag: TagDTO) => {
    try {
      const message = await tagService.updateTag(updatedTag.name, updatedTag, user.token);
      setTags((prev) =>
        prev.map((tag) => (tag.name === updatedTag.name ? updatedTag : tag))
      );
      toast.success(message);
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const currentItems = filteredTags.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">Tags</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Tag
          </button>
        </div>

        <ModalTag
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTag={handleAddTag}
        />

        <ModalUpdateTag
          isOpen={isUpdateModalOpen}
          tag={tagToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateTag={handleUpdateTag}
        />

        <TagsTable
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
          message={`Are you sure you want to delete the tag "${tagToDelete?.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TagsPage;
