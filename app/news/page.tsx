"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@/module/category/components/Pagination";
import SearchBar from "@/module/category/components/SearchBar";
import Dialog from "@/components/Dialog";
import NewsDTO from "@/module/news/dto/NewsDTO";
import NewsService from "@/module/news/services/NewsService";
import TagService from "@/module/tags/services/TagService"; 
import ModalNews from "@/module/news/components/ModalNews";
import NewsTable from "@/module/news/components/NewsTable";
import ModalUpdateNews from "@/module/news/components/ModalUpdateNews";
import TagDTO from "@/module/tags/dto/TagDTO";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsDTO[]>([]);
  const [availableTags, setAvailableTags] = useState<TagDTO[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NewsDTO | null>(null);
  const [newsToUpdate, setNewsToUpdate] = useState<NewsDTO | null>(null);

  const newsService = useMemo(() => new NewsService(), []);
  const tagService = useMemo(() => new TagService(), []); 

  const { user } = useContext(LoginContext) as LoginContextType;

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
        if (newsToDelete.code === undefined) {
          throw new Error("News code is missing.");
        }
        await newsService.deleteNews(newsToDelete.code, user.token);
        setNews((prev) =>
          prev.filter((item) => item.code !== newsToDelete.code)
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
      const response = await newsService.addNews(newNews, user.token);
      toast.success("News added successfully.");
      setNews((prev) => [...prev, response as NewsDTO]);
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

      if (updatedNews.code === undefined) {
        throw new Error("News code is missing.");
      }
      const message = await newsService.updateNews(
        updatedNews.code,
        updatedNews,
        user.token
      );
      setNews((prev) =>
        prev.map((item) =>
          item.code === updatedNews.code ? updatedNews : item
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
          availableTags={availableTags}
        />

        <ModalUpdateNews
          isOpen={isUpdateModalOpen}
          newsItem={newsToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateNews={handleUpdateNews}
          availableTags={availableTags} 
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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default NewsPage;
