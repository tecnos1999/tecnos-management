"use client";

import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import PartnerDTO from "@/module/partners/dto/PartnersDTO";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import DocumentService from "@/module/documents/service/DocumentService";

interface ModalPartnerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: PartnerDTO) => void;
}

const ModalPartner: React.FC<ModalPartnerProps> = ({
  isOpen,
  onClose,
  onAddPartner,
}) => {
  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token || "";

  const [partnerData, setPartnerData] = useState<{
    name: string;
    description: string;
    catalogFile: File | null;
    logo: File | null;
  }>({
    name: "",
    description: "",
    catalogFile: null,
    logo: null,
  });

  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const documentService = new DocumentService();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (acceptedFiles: File[], field: "catalogFile" | "logo") => {
    const file = acceptedFiles[0];
    setPartnerData((prev) => ({ ...prev, [field]: file }));

    if (field === "logo") {
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = (field: "catalogFile" | "logo") => {
    setPartnerData((prev) => ({ ...prev, [field]: null }));

    if (field === "logo") {
      setPreviewLogo(null);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!partnerData.name || !partnerData.description) {
      setShowErrors(true);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      let logoUrl = "";
      let catalogUrl = "";
  
      if (partnerData.logo) {
        toast.info("Uploading logo...");
        const uploadedLogo = await documentService.uploadDocument(
          partnerData.logo,
          token
        );
        logoUrl = uploadedLogo.url;
      }
  
      if (partnerData.catalogFile) {
        toast.info("Uploading catalog...");
        const uploadedCatalog = await documentService.uploadDocument(
          partnerData.catalogFile,
          token
        );
        catalogUrl = uploadedCatalog.url;
      }
  
      const newPartner: PartnerDTO = {
        name: partnerData.name,
        description: partnerData.description,
        catalogFile: catalogUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: logoUrl
          ? { url: logoUrl, type: partnerData.logo?.type || "" }
          : { url: "", type: "" },
      };
  
      toast.success("Partner added successfully!");
  
      onAddPartner(newPartner);
  
      setPartnerData({
        name: "",
        description: "",
        catalogFile: null,
        logo: null,
      });
      setPreviewLogo(null);
      setShowErrors(false);
      onClose();
    } catch (error) {
      toast.error(error as string || "Failed to add partner.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

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
            <form onSubmit={handleSubmit} className="space-y-8">
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
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !partnerData.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter partner name"
                  />
                  {showErrors && !partnerData.name && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border-2 ${
                      showErrors && !partnerData.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-red-500 focus:ring-red-500 shadow-sm sm:text-sm py-2 px-4`}
                    placeholder="Enter partner description"
                    rows={5}
                  />
                  {showErrors && !partnerData.description && (
                    <p className="text-sm text-red-500 mt-1">
                      This field is required.
                    </p>
                  )}
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
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPartner;
