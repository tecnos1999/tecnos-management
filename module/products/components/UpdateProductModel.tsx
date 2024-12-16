"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { ProductDTO } from "../dto/ProductDTO";
import AddDocumentsSection from "@/module/products/components/AddDocumentSection";
import DocumentsLinks from "@/module/documents/dto/DocumentsLinks";

interface UpdateProductModalProps {
  isOpen: boolean;
  product: ProductDTO;
  onClose: () => void;
  onUpdate: (updatedProduct: ProductDTO, images: File[], documents: DocumentsLinks) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onUpdate,
}) => {
  const [sku, setSku] = useState(product.sku);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category || "");
  const [subCategory, setSubCategory] = useState(product.subCategory || "");
  const [itemCategory, setItemCategory] = useState(product.itemCategory || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentsLinks>({
    broschure: null,
    technicalSheet: null,
    videoLink: product.linkVideo || "",
  });

  const handleDocumentsChange = useCallback(
    (updatedDocuments: DocumentsLinks) => {
      setDocuments(updatedDocuments);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImageFiles((prev) => {
        const newFiles = [...prev, ...acceptedFiles];
        setSelectedImage(acceptedFiles[acceptedFiles.length - 1]);
        return newFiles;
      });
    },
    accept: { "image/*": [] },
  });

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    if (selectedImage === imageFiles[index]) setSelectedImage(null);
  };

  const handleUpdate = () => {
    const updatedProduct: ProductDTO = {
      sku,
      name,
      description,
      category,
      subCategory,
      itemCategory,
      images: null, // Images are uploaded separately
      broschure: null, // Documents are handled separately
      tehnic: null,
      linkVideo: documents.videoLink || "",
      partnerName: product.partnerName || "",
    };

    onUpdate(updatedProduct, imageFiles, documents);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white min-w-[800px] p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Update Product</h2>
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="col-span-2 space-y-4">
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="SKU (Cannot be changed)"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Product Name"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Description"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {/* Add category options dynamically */}
            </select>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Subcategory</option>
              {/* Add subcategory options dynamically */}
            </select>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Item Category</option>
              {/* Add item category options dynamically */}
            </select>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Upload Images</h2>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 rounded-lg"
            >
              <input {...getInputProps()} />
              <p>Drag & drop or click to upload images</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {imageFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative group w-20 h-20 border rounded"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onClick={() => setSelectedImage(file)}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <AddDocumentsSection onDocumentsChange={handleDocumentsChange} />
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
