"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EventDTO from "../dto/EventDTO";

interface EventsTableProps {
  currentItems: EventDTO[];
  handleEdit: (event: EventDTO) => void;
  handleDelete: (event: EventDTO) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wide">
            <th className="py-3 px-6 rounded-l-lg">Image</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">External Link</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((event) => (
              <motion.tr
                key={event.eventCode}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6">
                  {event.image?.url ? (
                    <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={event.image.url}
                        alt={event.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                      <span className="text-[10px] text-center text-gray-500">
                        No Image
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {event.title}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {event.description}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {new Date(event.createdAt || "").toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  {event.externalLink ? (
                    <a
                      href={event.externalLink}
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
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
