"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CarouselDTO from "../dto/CarouselDTO";

interface ModalUpdateCarouselProps {
  isOpen: boolean;
  item: CarouselDTO | null;
  onClose: () => void;
  onUpdateItem: (updatedItem: CarouselDTO, file: File | null) => void;
}

const ModalUpdateCarousel: React.FC<ModalUpdateCarouselProps> = ({
  isOpen,
  item,
  onClose,
  onUpdateItem,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (item?.fileUrl) {
      setPreviewUrl(item.fileUrl); // Show the current file as the initial preview
    }
  }, [item]);

  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [], "video/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!item) return;

    const updatedItem: CarouselDTO = {
      ...item,
    };

    onUpdateItem(updatedItem, file);
    setFile(null);
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Update Carousel Item</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={`border-2 ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition hover:bg-gray-100`}
          >
            <input {...getInputProps()} />
            {previewUrl ? (
              <div className="w-full">
                {file?.type.includes("image") || (!file && item.type === "image") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-48 rounded-lg"
                  ></video>
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-center">
                  Drag & drop a file here, or click to select
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Supported formats: images and videos
                </p>
              </>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateCarousel;
