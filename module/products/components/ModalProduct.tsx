"use client";
import React, { useState } from "react";
import { Product } from "@/module/products/models/Product";
import { ProductDTO } from "../dto/ProductDTO";

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newProduct: ProductDTO) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [broschure, setBroschure] = useState<File | null>(null);
  const [tehnic, setTehnic] = useState<File | null>(null);
  const [catalog, setCatalog] = useState<File | null>(null);
  const [linkVideo, setLinkVideo] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDocumentUpload = (setter: React.Dispatch<React.SetStateAction<File | null>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

    const handleSubmit = () => {
      const imageUrl = images.length > 0 ? URL.createObjectURL(images[0]) : "";
    
      const newProductDTO: ProductDTO = {
        sku,
        name,
        description,
        itemCategory: "default-category",  
        image: imageUrl,
        broschure: broschure ? URL.createObjectURL(broschure) : "",
        tehnic: tehnic ? URL.createObjectURL(tehnic) : "",
        catalog: catalog ? URL.createObjectURL(catalog) : "",
        linkVideo,
      };
    
      onCreate(newProductDTO);
      onClose();
    };
    

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageUpload} className="w-full border p-2 rounded" />

          <label>Upload Broschure:</label>
          <input type="file" onChange={handleDocumentUpload(setBroschure)} className="w-full border p-2 rounded" />

          <label>Upload Tehnic:</label>
          <input type="file" onChange={handleDocumentUpload(setTehnic)} className="w-full border p-2 rounded" />

          <label>Upload Catalog:</label>
          <input type="file" onChange={handleDocumentUpload(setCatalog)} className="w-full border p-2 rounded" />

          <input
            type="text"
            placeholder="Video Link"
            value={linkVideo}
            onChange={(e) => setLinkVideo(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Product
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
