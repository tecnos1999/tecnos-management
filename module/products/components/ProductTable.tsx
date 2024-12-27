"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ProductDTO } from "../dto/ProductDTO";
import { determinePath } from "@/system/utils";

interface ProductTableProps {
  currentItems: ProductDTO[];
  handleDelete: (sku: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  currentItems,
  handleDelete,
}) => {
  const router = useRouter();

  const handleEdit = (sku: string) => {
    router.push(determinePath(`/products/update?sku=${sku}`));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">SKU</th>
            <th className="py-3 px-6">Product</th>
            <th className="py-3 px-6">Category</th>
            <th className="py-3 px-6">SubCategory</th>
            <th className="py-3 px-6">Item Category</th>
            <th className="py-3 px-6 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <motion.tr
                key={product.sku}
                className="border-b border-gray-200 hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <td className="py-3 px-6">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/100"
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6">{product.sku}</td>
                <td className="py-3 px-6 max-w-xs truncate">{product.name}</td>
                <td className="py-3 px-6 max-w-xs truncate">{product.category}</td>
                <td className="py-3 px-6 max-w-xs truncate">{product.subCategory}</td>
                <td className="py-3 px-6 max-w-xs truncate">{product.itemCategory}</td>
                <td className="py-3 px-6 flex justify-center items-center space-x-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center w-8 h-8"
                    onClick={() => handleEdit(product.sku)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.sku)}
                    className="bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center w-8 h-8"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
