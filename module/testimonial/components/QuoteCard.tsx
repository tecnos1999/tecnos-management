import React from "react";
import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  author: string;
  job: string;
  company: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  job,
  company,
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-md w-80 h-96 bg-white border border-gray-200 p-6 flex flex-col justify-between group hover:shadow-lg transition-shadow duration-300"
      whileHover={{
        scale: 1.03,
        translateY: -5,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <blockquote className="relative p-4 text-sm italic text-gray-600 flex-1 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner group-hover:bg-gray-100 transition duration-300">
        <p
          className="text-center leading-relaxed"
          dangerouslySetInnerHTML={{ __html: quote }}
        />
        <span className="absolute text-5xl text-gray-300 top-2 left-4 font-bold">
          &#10077;
        </span>
        <span className="absolute text-5xl text-gray-300 bottom-2 right-4 font-bold">
          &#10078;
        </span>
      </blockquote>

      <div className="text-center mt-4 flex flex-col space-y-1">
        <h5 className="text-lg font-semibold text-gray-800 group-hover:text-red-500 transition duration-300">
          {author}
        </h5>
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          {job}
        </span>
        <span className="text-xs text-gray-400">{company}</span>
      </div>

      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[2px] bg-red-500 rounded-full"
        whileHover={{ width: "90%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default QuoteCard;
