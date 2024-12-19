"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@/module/category/components/Pagination";
import SearchBar from "@/module/category/components/SearchBar";
import Dialog from "@/components/Dialog";
import NewsDTO from "@/module/news/dto/NewsDTO";
import NewsService from "@/module/news/services/NewsService";
import TagService from "@/module/tags/services/TagService"; // Importă serviciul pentru tag-uri
import ModalNews from "@/module/news/components/ModalNews";
import NewsTable from "@/module/news/components/NewsTable";
import ModalUpdateNews from "@/module/news/components/ModalUpdateNews";
import TagDTO from "@/module/tags/dto/TagDTO";

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsDTO[]>([]);
  const [availableTags, setAvailableTags] = useState<TagDTO[]>([]); // Tag-uri disponibile
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NewsDTO | null>(null);
  const [newsToUpdate, setNewsToUpdate] = useState<NewsDTO | null>(null);

  const newsService = useMemo(() => new NewsService(), []);
  const tagService = useMemo(() => new TagService(), []); // Inițializează serviciul pentru tag-uri

  // Fetch all news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await newsService.getAllNews();
        setNews(fetchedNews);
      } catch (error) {
        toast.error(error as string || "Failed to fetch news.");
      }
    };

    fetchNews();
  }, [newsService]);

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await tagService.getAllTags();
        setAvailableTags(fetchedTags);
      } catch (error) {
        toast.error(error as string || "Failed to fetch tags.");
      }
    };

    fetchTags();
  }, [tagService]);

  const handleDeleteRequest = (newsItem: NewsDTO) => {
    setNewsToDelete(newsItem);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (newsToDelete) {
      try {
        await newsService.deleteNews(newsToDelete.uniqueCode);
        setNews((prev) =>
          prev.filter((item) => item.uniqueCode !== newsToDelete.uniqueCode)
        );
        toast.success(`News "${newsToDelete.title}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string);
      }
    }
    setIsDialogOpen(false);
    setNewsToDelete(null);
  };

  const handleAddNews = async (newNews: NewsDTO) => {
    try {
      const message = await newsService.addNews(newNews);
      setNews((prev) => [...prev, newNews]);
      toast.success(message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEditRequest = (newsItem: NewsDTO) => {
    setNewsToUpdate(newsItem);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateNews = async (updatedNews: NewsDTO) => {
    try {
      const message = await newsService.updateNews(
        updatedNews.uniqueCode,
        updatedNews
      );
      setNews((prev) =>
        prev.map((item) =>
          item.uniqueCode === updatedNews.uniqueCode ? updatedNews : item
        )
      );
      toast.success(message);
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentItems = filteredNews.slice(
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
          <h1 className="text-3xl font-bold text-left text-gray-700">News</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New News
          </button>
        </div>

        <ModalNews
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddNews={handleAddNews}
          availableTags={availableTags} // Transmite tag-urile
        />

        <ModalUpdateNews
          isOpen={isUpdateModalOpen}
          newsItem={newsToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateNews={handleUpdateNews}
          availableTags={availableTags} // Transmite tag-urile
        />

        <NewsTable
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
          message={`Are you sure you want to delete the news "${newsToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default NewsPage;
