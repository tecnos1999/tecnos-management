"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { PartnerDTO } from "../dto/PartnerDTO";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: PartnerDTO | null;
  onSavePartner: (
    updatedPartner: PartnerDTO,
    imageFile: File | null,
    catalogFile: File | null
  ) => void;
}

const EditPartnerModal: React.FC<EditPartnerModalProps> = ({
  isOpen,
  onClose,
  partner,
  onSavePartner,
}) => {
  const [partnerData, setPartnerData] = useState({
    name: partner?.name || "",
    description: partner?.description || "",
    logo: null as File | null,
    catalogFile: null as File | null,
  });
  const [previewLogo, setPreviewLogo] = useState<string | null>(
    partner?.imageUrl || null
  );

  useEffect(() => {
    if (partner) {
      setPartnerData({
        name: partner.name,
        description: partner.description,
        logo: null,
        catalogFile: null,
      });
      setPreviewLogo(partner.imageUrl || null);
    }
  }, [partner]);

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

    const updatedPartner: PartnerDTO = {
      name,
      description,
      catalogFile: partner?.catalogFile || "",
      createdAt: partner?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: previewLogo || partner?.imageUrl || "",
    };

    onSavePartner(updatedPartner, logo, catalogFile);
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
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-6xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Edit Partner</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={partnerData.name}
                    disabled
                    className="mt-2 block w-full rounded-lg border-2 border-gray-300 bg-gray-100 focus:outline-none focus:border-gray-300 shadow-sm py-2 px-4"
                    placeholder="Partner name cannot be edited"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={partnerData.description}
                    onChange={(value) =>
                      setPartnerData((prev) => ({
                        ...prev,
                        description: value,
                      }))
                    }
                    className="mt-2 shadow-sm focus:ring-red-500 focus:outline-none focus:border-red-500"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
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
                          className="w-full h-32 object-contain rounded-lg"
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

                  <label className="block text-sm font-medium text-gray-700 mt-4">
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

                <div>
                  <div className="flex justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Card Preview
                    </h3>
                  </div>
                  <div className="flex justify-center">
                    <motion.div
                      className="relative bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform transition-all duration-500"
                      style={{ width: "280px" }}
                    >
                      <div className="relative w-full h-40 bg-gray-100">
                        {previewLogo ? (
                          <Image
                            src={previewLogo}
                            alt={partnerData.name || "Preview"}
                            fill
                            className="object-contain p-4"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <span>No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="px-4 py-3 bg-gray-50 border-t">
                        <h3 className="text-lg font-bold text-gray-800">
                          {partnerData.name || "Partner Name"}
                        </h3>
                        <p
                          className="text-sm text-gray-500 mt-2 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              partnerData.description ||
                              "No description available",
                          }}
                        />
                      </div>

                      <div className="flex justify-between items-center px-4 py-3 bg-white">
                        {partnerData.catalogFile && (
                          <motion.a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="text-sm bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
                          >
                            Catalog
                          </motion.a>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="text-sm bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-all"
                        >
                          Produse
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  onClick={handleSave}
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

export default EditPartnerModal;
