"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import WebinarDTO from "../dto/WebinarDTO";

interface ModalUpdateWebinarProps {
  isOpen: boolean;
  webinar: WebinarDTO | null;
  onClose: () => void;
  onUpdateWebinar: (updatedWebinar: WebinarDTO, image: File | null) => void;
}

const ModalUpdateWebinar: React.FC<ModalUpdateWebinarProps> = ({
  isOpen,
  webinar,
  onClose,
  onUpdateWebinar,
}) => {
  const [title, setTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (webinar) {
      setTitle(webinar.title || "");
      setExternalLink(webinar.externalLink || "");
      setPreviewImage(webinar.image?.url || null); // Preview pentru imaginea curentă
    }
  }, [webinar]);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Actualizăm preview-ul pentru imaginea nouă
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = () => {
    if (webinar) {
      onUpdateWebinar({ ...webinar, title, externalLink }, image); // Transmitem imaginea nouă, dacă există
      onClose();
    }
  };

  if (!isOpen || !webinar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Update Webinar</h2>

        {/* Title Input */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />

        {/* External Link Input */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          External Link
        </label>
        <input
          type="text"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />

        {/* Image Preview */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Preview
        </label>
        <div className="mb-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Webinar Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          ) : (
            <span className="text-gray-500 text-sm">No image available</span>
          )}
        </div>

        {/* Drag-and-Drop Input */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload New Image (optional)
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-500">
            Drag & drop an image, or click to select
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateWebinar;
