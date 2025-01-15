"use client";
import React from "react";
import { motion } from "framer-motion";
import { InfoCardDTO } from "../dto/InfoCardDTO";

const InfoCard: React.FC<InfoCardDTO> = ({ title, description, features }) => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p
        className="text-md text-gray-500 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
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
