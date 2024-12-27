import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import WebinarDTO from "../dto/WebinarDTO";
import ModalUpdateWebinar from "./ModalUpdateWebinar"; // Importă modalul

interface WebinarsTableProps {
  currentItems: WebinarDTO[];
  handleDelete: (webinar: WebinarDTO) => void;
  onUpdateWebinar: (updatedWebinar: WebinarDTO, image: File | null) => void;
}

const WebinarsTable: React.FC<WebinarsTableProps> = ({
  currentItems,
  handleDelete,
  onUpdateWebinar,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [webinarToUpdate, setWebinarToUpdate] = useState<WebinarDTO | null>(
    null
  );

  const handleEdit = (webinar: WebinarDTO) => {
    setWebinarToUpdate(webinar);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setWebinarToUpdate(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Image</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">External Link</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((webinar) => (
              <motion.tr
                key={webinar.webCode}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6">
                  {webinar.imageUrl ? (
                    <div className="w-[100px] h-[100px] flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={webinar.imageUrl}
                        alt={webinar.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px] bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-[10px] text-center text-gray-500">
                        No Image
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {webinar.title}
                </td>
                <td className="py-3 px-6">
                  {webinar.externalLink ? (
                    <a
                      href={webinar.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      Visit
                    </a>
                  ) : (
                    <span className="text-gray-500">No Link</span>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {new Date(webinar.createdAt || "").toLocaleDateString()}
                </td>
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(webinar)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(webinar)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No webinars found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isUpdateModalOpen && webinarToUpdate && (
        <ModalUpdateWebinar
          isOpen={isUpdateModalOpen}
          webinar={webinarToUpdate}
          onClose={closeUpdateModal}
          onUpdateWebinar={(updatedWebinar, image) => {
            onUpdateWebinar(updatedWebinar, image);
            closeUpdateModal();
          }}
        />
      )}
    </div>
  );
};

export default WebinarsTable;
