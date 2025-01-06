"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import BlogService from "@/module/blog/services/BlogService";
import { BlogDTO } from "@/module/blog/dto/BlogDTO";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

import Dialog from "@/components/Dialog";
import SearchBar from "@/module/category/components/SearchBar";
import Pagination from "@/module/category/components/Pagination";
import BlogsTable from "@/module/blog/components/BlogsTable";
import ModalBlog from "@/module/blog/components/ModalBlog";
import ModalUpdateBlog from "@/module/blog/components/ModalUpdateBlog";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogDTO | null>(null);
  const [blogToUpdate, setBlogToUpdate] = useState<BlogDTO | null>(null);

  const blogService = useMemo(() => new BlogService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        toast.error(error as string || "Failed to fetch blogs.");
      }
    };

    fetchBlogs();
  }, [blogService]);

  const handleDeleteRequest = (blog: BlogDTO) => {
    setBlogToDelete(blog);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      try {
        await blogService.deleteBlog(blogToDelete.code, user.token);
        setBlogs((prev) =>
          prev.filter((blog) => blog.code !== blogToDelete.code)
        );
        toast.success(`Blog "${blogToDelete.title}" deleted successfully.`);
      } catch (error) {
        toast.error(error as string || "Failed to delete blog.");
      }
    }
    setIsDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleAddBlog = async (
    newBlog: BlogDTO,
    image: File | null,
    broschure: File | null
  ) => {
    try {
      await blogService.addBlog(newBlog, image, broschure, user.token);
      const updatedBlogs = await blogService.getAllBlogs();
      setBlogs(updatedBlogs);
      toast.success("Blog added successfully.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to add blog.");
    }
  };

  const handleEditRequest = (blog: BlogDTO) => {
    setBlogToUpdate(blog);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateBlog = async (
    updatedBlog: BlogDTO,
    image: File | null,
    broschure: File | null
  ) => {
    try {
      await blogService.updateBlog(
        updatedBlog.code,
        updatedBlog,
        image,
        broschure,
        user.token
      );
      const updatedBlogs = await blogService.getAllBlogs();
      setBlogs(updatedBlogs);
      toast.success("Blog updated successfully.");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to update blog.");
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentItems = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex w-full h-full mt-4">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">Blogs</h1>
          <SearchBar searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
          >
            + New Blog
          </button>
        </div>

        <ModalBlog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBlog={handleAddBlog}
        />

        <ModalUpdateBlog
          isOpen={isUpdateModalOpen}
          blogItem={blogToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateBlog={handleUpdateBlog}
        />

        <BlogsTable
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
          message={`Are you sure you want to delete the blog "${blogToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default BlogsPage;
