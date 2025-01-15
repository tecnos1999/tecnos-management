"use client";
import React from "react";
import { motion } from "framer-motion";
import { InfoCardDTO } from "../dto/InfoCardDTO";

const InfoCard: React.FC<InfoCardDTO> = ({ title, description, features }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-[40vh]">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p
        className="text-sm text-gray-600 leading-relaxed overflow-hidden text-ellipsis "
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <motion.ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
        {features.slice(0, 3).map((feature, index) => (
          <motion.li key={index} whileHover={{ x: 10 }}>
            {feature}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default InfoCard;
