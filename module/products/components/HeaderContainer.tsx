import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

interface HeaderContainerProps {
  onCancel: () => void;
  onSubmit: () => void;
  isEditMode: boolean; 
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  onCancel,
  onSubmit,
  isEditMode,
}) => {
  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.div
      className="col-span-3 row-[1/2] bg-white shadow-lg rounded-lg flex items-center justify-between px-6 py-4 border border-gray-200"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {isEditMode ? "Update Product" : "Add Product"}
      </h1>
      <div className="flex gap-4">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          <FaTimes className="text-lg" />
          <span className="text-sm font-medium">Cancel</span>
        </button>
        <button
          className={`${
            isEditMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-red-500 hover:bg-red-600"
          } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition`}
          onClick={onSubmit}
        >
          <FaCheck className="text-lg" />
          <span className="text-sm font-medium">
            {isEditMode ? "Update Product" : "Add Product"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default HeaderContainer;
