import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

interface DropzoneProps {
  fileType: string;
  currentFile: File | null;
  onFileDrop: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ fileType, currentFile, onFileDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
      }
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/xml": [".xml"],
    },
  });

  return (
    <div
      className={`border border-dashed border-gray-400 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition overflow-hidden ${
        currentFile ? "border-red-500" : ""
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {!currentFile ? (
        <p className="text-gray-500 text-base">Drag & drop or click to upload</p>
      ) : (
        <p className="text-red-600 text-base">{currentFile.name}</p>
      )}
    </div>
  );
};

export default Dropzone;
