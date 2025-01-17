"use client";
import ModalSection from "@/module/section/components/ModalSection";
import ModalUpdateSection from "@/module/section/components/ModalUpdateSection";
import { NewSectionState } from "@/module/section/dto/NewSectionState";
import { SectionDTO } from "@/module/section/dto/SectionDTO";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes, FaPlus } from "react-icons/fa";

export const PageForm = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [products, setProducts] = useState<string[]>([]);
  const [pageCodes, setPageCodes] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [newPageCode, setNewPageCode] = useState("");

  const [sections, setSections] = useState<SectionDTO[]>([]);
  const [newSection, setNewSection] = useState<NewSectionState[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<NewSectionState | null>(null);

  const handleImageChange = (imgUrl: string) => {
    setImageUrl(imgUrl);
  };

  const handleImageRemove = () => {
    setImageUrl(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageChange(reader.result as string);
      };
      if (file) reader.readAsDataURL(file);
    },
  });

  const handleAddProduct = () => {
    if (newProduct.trim()) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct("");
    }
  };

  const handleAddPageCode = () => {
    if (newPageCode.trim()) {
      setPageCodes([...pageCodes, newPageCode.trim()]);
      setNewPageCode("");
    }
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleRemovePageCode = (index: number) => {
    setPageCodes(pageCodes.filter((_, i) => i !== index));
  };

  const handleSaveSection = (newSectionData: NewSectionState) => {
    setNewSection((prev) => [...prev, newSectionData]);
    setIsModalOpen(false);
  };

  const handleEditSection = (index: number) => {
    if (!newSection) {
      return;
    }
    setSelectedSection(newSection[index]);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteSection = (index: number) => {
    setNewSection((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto min-h-screen py-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg py-4 px-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 pt-2">
          Create New Page
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full h-96 border rounded-lg bg-gray-100 flex items-center justify-center">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={imageUrl}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 text-gray-600 px-2 py-1"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No image selected</p>
              )}
            </div>
            <div
              {...getRootProps()}
              className="mt-4 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 px-6 py-4"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 text-sm">
                Click or drag to upload an image
              </p>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter slug"
              className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
              className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Link
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter link"
              className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Products (SKU)
            </label>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Enter product SKU"
                className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
              />
              <button
                onClick={handleAddProduct}
                className="py-2 px-4  text-white rounded-lg  bg-red-gradient from-red-500 to-red-700"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm"
                >
                  <span className="text-gray-700">{product}</span>
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className=" text-white rounded-lg p-1 bg-red-gradient from-red-500 to-red-700"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Subpages (Slug)
            </label>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newPageCode}
                onChange={(e) => setNewPageCode(e.target.value)}
                placeholder="Enter subpage slug"
                className="block w-full rounded-lg border-2 focus:ring-red-500 focus:border-red-500 focus:outline-none shadow-sm sm:text-sm py-2 px-4"
              />
              <button
                onClick={handleAddPageCode}
                className="py-2 px-4  text-white rounded-lg  bg-red-gradient from-red-500 to-red-700"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
            <ul className="space-y-2">
              {pageCodes.map((code, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 py-2 px-4 rounded-md shadow-sm"
                >
                  <span className="text-gray-700">{code}</span>
                  <button
                    onClick={() => handleRemovePageCode(index)}
                    className=" text-white rounded-lg p-1 bg-red-gradient from-red-500 to-red-700"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Add Section
          </button>
        </div>

        <ModalSection
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSection}
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Sections</h3>
          <ul className="mt-4 space-y-2">
            {newSection.map((section, index) => (
              <li
                key={index}
                className="bg-gray-100 py-2 px-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{section.sections.title}</h4>
                  <p className="text-sm text-gray-600">
                    {section.sections.title}
                  </p>
                  <span className="text-gray-500 text-sm">
                    {section.sections.position}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSection(index)}
                    className="py-1 px-2 bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSection(index)}
                    className="py-1 px-2 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <ModalUpdateSection
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onUpdate={(updatedSection) => {
              setNewSection((prev) =>
                prev.map((section, index) =>
                  section === selectedSection ? updatedSection : section
                )
              );
              setIsUpdateModalOpen(false);
              setSelectedSection(null);
            }}
            sectionData={selectedSection}
          />
        </div>
      </div>
    </div>
  );
};
