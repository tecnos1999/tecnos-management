// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EventCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  subtitle,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center  w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-4">
      <motion.article
        className="relative w-full bg-white shadow-lg transition-shadow duration-500 hover:shadow-2xl overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="overflow-hidden bg-black h-[180px] md:h-[200px]"
          animate={{ height: isHovered ? "120px" : "180px" }}
          transition={{ duration: 0.5 }}
        >
          <a href="#">
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              width={500}
              height={300}
              unoptimized
            />
          </a>
        </motion.header>

        <motion.div
          className="relative p-4 h-[150px] md:h-[165px]"
          animate={{ height: isHovered ? "250px" : "150px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="m-0 mb-1 text-black text-xl font-bold uppercase">
            <a href="#">{title}</a>
          </h2>
          <span className="text-red-700">
          {description.replace(/(<([^>]+)>)/gi, "").split(" ").slice(0, 2).join(" ")}
          </span>
          <motion.p
            className="absolute left-5 right-5 bottom-[50px] m-0 text-gray-600 leading-6"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 45,
            }}
            transition={{ duration: 0.3 }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </motion.div>
      </motion.article>
    </div>
  );
};

export default EventCard;
