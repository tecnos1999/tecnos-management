import { motion } from "framer-motion";

interface GeneralInformationProps {
  sku: string;
  name: string;
  description: string;
  setSku: (value: string) => void;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
}

const GeneralInformationContainer: React.FC<GeneralInformationProps> = ({
  sku,
  name,
  description,
  setSku,
  setName,
  setDescription,
}) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.div
      className="col-[1/3] row-[2/6] bg-white p-6 rounded-xl shadow-md border border-gray-200"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">General Information</h2>
      <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
      />
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md min-h-32 max-h-32 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
      />
    </motion.div>
  );
};

export default GeneralInformationContainer;
