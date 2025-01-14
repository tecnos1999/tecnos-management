"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { BlogDTO } from "../dto/BlogDTO";
import CaptionService from "@/module/caption/services/CaptionService";
import { CaptionDTO } from "@/module/caption/dto/CaptionDTO";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalUpdateBlogProps {
  isOpen: boolean;
  onClose: () => void;
  blogItem: BlogDTO | null;
  onUpdateBlog: (
    updatedBlog: BlogDTO,
    image: File | null,
    broschure: File | null
  ) => void;
}

const ModalUpdateBlog: React.FC<ModalUpdateBlogProps> = ({
  isOpen,
  onClose,
  blogItem,
  onUpdateBlog,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    viewUrl: string;
    captions: CaptionDTO[];
  }>({
    title: blogItem?.title || "",
    description: blogItem?.description || "",
    viewUrl: blogItem?.viewUrl || "",
    captions: blogItem?.captions || [],
  });

  const [captions, setCaptions] = useState<CaptionDTO[]>([]);
  const [selectedCaptions, setSelectedCaptions] = useState<CaptionDTO[]>([]);
  const [skuInput, setSkuInput] = useState<string>("");
  const [skuProducts, setSkuProducts] = useState<string[]>(
    blogItem?.skuProducts || []
  );
  const [image, setImage] = useState<File | null>(null);
  const [broschure, setBroschure] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    blogItem?.mainPhotoUrl || null
  );

  const captionService = useMemo(() => new CaptionService(), []);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const fetchedCaptions = await captionService.getAllCaptions();
        setCaptions(fetchedCaptions);
      } catch (error) {
        toast.error("Failed to fetch captions.");
      }
    };

    if (isOpen) fetchCaptions();
  }, [isOpen, captionService]);

  useEffect(() => {
    if (blogItem) {
      setFormData({
        title: blogItem.title,
        description: blogItem.description,
        viewUrl: blogItem.viewUrl || "",
        captions: blogItem.captions,
      });
      setSelectedCaptions(blogItem.captions || []);
      setSkuProducts(blogItem.skuProducts || []);
      setPreviewImage(blogItem.mainPhotoUrl || null);
    }
  }, [blogItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptionSelection = (caption: CaptionDTO) => {
    setSelectedCaptions((prev) =>
      prev.find((c) => c.code === caption.code)
        ? prev.filter((c) => c.code !== caption.code)
        : [...prev, caption]
    );
  };

  const handleAddSku = () => {
    if (skuInput.trim() && !skuProducts.includes(skuInput.trim())) {
      setSkuProducts((prev) => [...prev, skuInput.trim()]);
      setSkuInput("");
      toast.success("SKU added to the list.");
    } else {
      toast.error("SKU is empty or already in the list.");
    }
  };

  const handleRemoveSku = (sku: string) => {
    setSkuProducts((prev) => prev.filter((item) => item !== sku));
    toast.info("SKU removed from the list.");
  };

  const handleDrop = (acceptedFiles: File[], type: "image" | "broschure") => {
    const file = acceptedFiles[0];
    if (type === "image") {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else if (type === "broschure") {
      setBroschure(file);
    }
  };

  const imageDropzone = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "image"),
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const broschureDropzone = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "broschure"),
    accept: { "application/pdf": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    if (!blogItem) {
      toast.error("No blog selected to update.");
      return;
    }

    try {
      const updatedBlog: BlogDTO = {
        ...blogItem,
        title: formData.title,
        description: formData.description,
        viewUrl: formData.viewUrl,
        captions: selectedCaptions,
        skuProducts,
      };

      onUpdateBlog(updatedBlog, image, broschure);
      onClose();
    } catch (error) {
      toast.error("Failed to update blog.");
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
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh] relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-700">Edit Blog</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                  className="mt-2 rounded-lg shadow-sm border focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="viewUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  View URL
                </label>
                <input
                  type="text"
                  id="viewUrl"
                  name="viewUrl"
                  value={formData.viewUrl}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                  placeholder="Enter view URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image
                </label>
                <div
                  {...imageDropzone.getRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                >
                  <input {...imageDropzone.getInputProps()} />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Blog Preview"
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <p>Drag & drop an image or click to select</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Broschure File (PDF)
                </label>
                <div
                  {...broschureDropzone.getRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                >
                  <input {...broschureDropzone.getInputProps()} />
                  {broschure ? (
                    <p>{broschure.name}</p>
                  ) : (
                    <p>Drag & drop a PDF or click to select</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Product SKU
                </label>
                <div className="flex items-center mt-2 space-x-2">
                  <input
                    type="text"
                    id="sku"
                    value={skuInput}
                    onChange={(e) => setSkuInput(e.target.value)}
                    placeholder="Enter SKU"
                    className="block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                  />
                  <button
                    type="button"
                    onClick={handleAddSku}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Added SKUs:
                  </h3>
                  {skuProducts.length > 0 ? (
                    <ul className="space-y-1">
                      {skuProducts.map((sku) => (
                        <li
                          key={sku}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
                        >
                          <span className="text-gray-800">{sku}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSku(sku)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No SKUs added yet.</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Captions
                </label>
                <div className="grid grid-cols-3 gap-4 max-h-[15vh] overflow-y-auto">
                  {captions.map((caption) => (
                    <button
                      key={caption.code}
                      type="button"
                      onClick={() => handleCaptionSelection(caption)}
                      className={`p-3 border rounded-lg text-sm font-medium ${
                        selectedCaptions.some((c) => c.code === caption.code)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: caption.title }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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

export default ModalUpdateBlog;
