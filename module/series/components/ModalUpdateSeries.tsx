"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { SeriesDTO } from "../dto/SeriesDTO";
import BlogService from "@/module/blog/services/BlogService";
import { BlogDTO } from "@/module/blog/dto/BlogDTO";

interface ModalUpdateSeriesProps {
  isOpen: boolean;
  onClose: () => void;
  seriesItem: SeriesDTO | null; 
  onUpdateSeries: (
    updatedSeries: SeriesDTO,
    image: File | null
  ) => void;
}

const ModalUpdateSeries: React.FC<ModalUpdateSeriesProps> = ({
  isOpen,
  onClose,
  seriesItem,
  onUpdateSeries,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    blogCodes: string[];
  }>({
    name: seriesItem?.name || "",
    description: seriesItem?.description || "",
    blogCodes: seriesItem?.blogCodes || [],
  });

  const [blogs, setBlogs] = useState<BlogDTO[]>([]);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>(
    seriesItem?.blogCodes || []
  );
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    seriesItem?.imageUrl || null
  );

  const blogService = useMemo(() => new BlogService(), []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        toast.error("Failed to fetch blogs.");
      }
    };

    if (isOpen) fetchBlogs();
  }, [isOpen, blogService]);

  useEffect(() => {
    if (seriesItem) {
      setFormData({
        name: seriesItem.name,
        description: seriesItem.description,
        blogCodes: seriesItem.blogCodes,
      });
      setSelectedBlogs(seriesItem.blogCodes);
      setPreviewImage(seriesItem.imageUrl || null);
    }
  }, [seriesItem]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlogSelection = (blogCode: string) => {
    setSelectedBlogs((prev) =>
      prev.includes(blogCode)
        ? prev.filter((code) => code !== blogCode)
        : [...prev, blogCode]
    );
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const imageDropzone = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error("Name and description are required.");
      return;
    }

    if (!seriesItem) {
      toast.error("No series selected to update.");
      return;
    }

    try {
      const updatedSeries: SeriesDTO = {
        ...seriesItem,
        name: formData.name,
        description: formData.description,
        blogCodes: selectedBlogs,
      };

      onUpdateSeries(updatedSeries, image);
      onClose();
    } catch (error) {
      toast.error("Failed to update series.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Edit Series
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  placeholder="Enter series name"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  rows={4}
                  placeholder="Enter series description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blogs (Select blogs to include)
                </label>
                <div className="grid grid-cols-3 gap-4 max-h-40 overflow-y-auto">
                  {blogs.map((blog) => (
                    <button
                      key={blog.code}
                      type="button"
                      onClick={() => handleBlogSelection(blog.code)}
                      className={`p-3 border rounded-lg ${
                        selectedBlogs.includes(blog.code)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {blog.title}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Series Image
                </label>
                <div
                  {...imageDropzone.getRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                >
                  <input {...imageDropzone.getInputProps()} />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Series Preview"
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      Drag & drop an image, or click to select
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalUpdateSeries;
