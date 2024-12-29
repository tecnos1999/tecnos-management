"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { PartnerDTO } from "../dto/PartnerDTO";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePartner: (
    partner: PartnerDTO,
    imageFile: File | null,
    catalogFile: File | null
  ) => void;
}

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  isOpen,
  onClose,
  onSavePartner,
}) => {
  const [partnerData, setPartnerData] = useState({
    name: "",
    description: "",
    logo: null as File | null,
    catalogFile: null as File | null,
  });
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[], field: "logo" | "catalogFile") => {
    const file = acceptedFiles[0];
    setPartnerData((prev) => ({ ...prev, [field]: file }));

    if (field === "logo") {
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = (field: "logo" | "catalogFile") => {
    setPartnerData((prev) => ({ ...prev, [field]: null }));
    if (field === "logo") {
      setPreviewLogo(null);
    }
  };

  const handleSave = () => {
    const { name, description, logo, catalogFile } = partnerData;

    if (!name || !description) {
      alert("Name and description are required.");
      return;
    }

    const newPartner: PartnerDTO = {
      name,
      description,
      catalogFile: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: "",
    };

    onSavePartner(newPartner, logo, catalogFile);
    onClose();
  };

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "logo"),
      accept: { "image/*": [] },
      maxFiles: 1,
    });

  const {
    getRootProps: getCatalogRootProps,
    getInputProps: getCatalogInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "catalogFile"),
    accept: { "application/pdf": [] },
    maxFiles: 1,
  });

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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-left text-red-500">
              Add New Partner
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Partner Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={partnerData.name}
                    onChange={(e) =>
                      setPartnerData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter partner name"
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
                    value={partnerData.description}
                    onChange={(e) =>
                      setPartnerData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="mt-2 block w-full rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4"
                    placeholder="Enter partner description"
                    rows={5}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Upload
                  </label>
                  <div
                    {...getLogoRootProps()}
                    className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                  >
                    <input {...getLogoInputProps()} />
                    {previewLogo ? (
                      <div className="relative">
                        <img
                          src={previewLogo}
                          alt="Logo Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-2 right-2 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile("logo");
                          }}
                        >
                          <FaTimesCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Drag & drop a logo, or click to select
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catalog Upload
                  </label>
                  <div
                    {...getCatalogRootProps()}
                    className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                  >
                    <input {...getCatalogInputProps()} />
                    {partnerData.catalogFile ? (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-800 truncate">
                          {partnerData.catalogFile.name}
                        </p>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile("catalogFile");
                          }}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Drag & drop a catalog file, or click to select
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-600"
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPartnerModal;
