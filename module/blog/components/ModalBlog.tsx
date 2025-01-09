"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { BlogDTO } from "../dto/BlogDTO";
import CaptionService from "@/module/caption/services/CaptionService";
import { CaptionDTO } from "@/module/caption/dto/CaptionDTO";

// Dynamically import ReactQuill
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ModalBlogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlog: (
    newBlog: BlogDTO,
    image: File | null,
    broschure: File | null
  ) => void;
}

const ModalBlog: React.FC<ModalBlogProps> = ({
  isOpen,
  onClose,
  onAddBlog,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    viewUrl: string;
  }>({
    title: "",
    description: "",
    viewUrl: "",
  });

  const [captions, setCaptions] = useState<CaptionDTO[]>([]);
  const [selectedCaptions, setSelectedCaptions] = useState<CaptionDTO[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [broschure, setBroschure] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const captionService = useMemo(() => new CaptionService(), []);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const fetchedCaptions = await captionService.getAllCaptions();
        const inactiveCaptions = fetchedCaptions.filter(
          (caption) => !caption.active
        );
        setCaptions(inactiveCaptions);
      } catch (error) {
        toast.error("Failed to fetch captions.");
      }
    };

    if (isOpen) fetchCaptions();
  }, [isOpen, captionService]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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

  const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !stripHtmlTags(formData.description).trim()) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      const newBlog: BlogDTO = {
        code: "",
        title: formData.title,
        description: formData.description,
        mainPhotoUrl: null,
        broschureUrl: null,
        viewUrl: formData.viewUrl || "",
        seriesCode: null,
        active: false,
        captions: selectedCaptions,
      };

      onAddBlog(newBlog, image, broschure);
      onClose();
    } catch (error) {
      toast.error("Failed to add blog.");
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                Add New Blog
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
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
                  className={`mt-2 block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
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
                  className="mt-2 max-h-[20vh] overflow-auto   rounded-lg shadow-sm border focus:ring-red-500 focus:border-red-500"
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
                  className={`mt-2 block w-full rounded-lg border-2 focus:border-red-500 focus:ring-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4`}
                  placeholder="Enter view URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Captions (Select from inactive)
                </label>
                <div className="grid grid-cols-3 gap-4 max-h-40 overflow-y-auto">
                  {captions.map((caption) => (
                    <button
                      key={caption.code}
                      type="button"
                      onClick={() => handleCaptionSelection(caption)}
                      className={`p-3 border rounded-lg ${
                        selectedCaptions.some((c) => c.code === caption.code)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: caption.text }}
                    ></button>
                  ))}
                </div>
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
                    <p className="text-sm text-gray-500">
                      Drag & drop an image, or click to select
                    </p>
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
                    <p className="text-sm text-gray-500">{broschure.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Drag & drop a PDF, or click to select
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalBlog;
