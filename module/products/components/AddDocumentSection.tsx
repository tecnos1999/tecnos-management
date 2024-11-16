import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const AddDocumentsSection: React.FC = () => {
  const [broschure, setBroschure] = useState<File | null>(null);
  const [technicalSheet, setTechnicalSheet] = useState<File | null>(null);
  const [catalog, setCatalog] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>("");

  const handleDrop = useCallback((acceptedFiles: File[], type: string) => {
    const file = acceptedFiles[0];
    if (!file) return;

    switch (type) {
      case "broschure":
        setBroschure(file);
        break;
      case "technicalSheet":
        setTechnicalSheet(file);
        break;
      case "catalog":
        setCatalog(file);
        break;
      default:
        toast.error("Invalid file type");
    }
  }, []);

  const createDropzone = (fileType: string, currentFile: File | null) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (files) => handleDrop(files, fileType),
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc", ".docx"],
        "application/xml": [".xml"],
      },
    });

    const dropzoneProps = getRootProps();

    return (
      <div
        className={`border border-dashed border-gray-400 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition ${
          currentFile ? "border-red-500" : ""
        }`}
        {...dropzoneProps}
      >
        <input {...getInputProps()} />
        {!currentFile ? (
          <p className="text-gray-500 text-base">
            Drag & drop or click to upload
          </p>
        ) : (
          <p className="text-red-600 text-base">{currentFile.name}</p>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="col-[1/3] row-[6/11] p-5 bg-white shadow-md rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
    >
      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Additional Resources
      </h2>

      <div className="mb-1">
        <label className="block mb-2 font-semibold text-gray-700 text-base">
          Broschure
        </label>
        {createDropzone("broschure", broschure)}
      </div>

      <div className="mb-1">
        <label className="block mb-2 font-semibold text-gray-700 text-base">
          Technical File
        </label>
        {createDropzone("technicalSheet", technicalSheet)}
      </div>

      <div className="mb-1">
        <label className="block mb-2 font-semibold text-gray-700 text-base">
          Catalog Document
        </label>
        {createDropzone("catalog", catalog)}
      </div>

      <div className="mb-2">
        <label className="block mb-2 font-semibold text-gray-700 text-base">
          Link
        </label>
        <input
          type="url"
          placeholder="Enter link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </motion.div>
  );
};

export default AddDocumentsSection;
