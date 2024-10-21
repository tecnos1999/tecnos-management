'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalCategory from "@/components/ModalCategory";

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

const categoriesData: Category[] = [
  {
    id: 1,
    name: "Beauty Products",
    createdAt: "07/05/2023",
    updatedAt: "15/08/2023",
    subCategories: [
      { id: 1, name: "Makeup" },
      { id: 2, name: "Skincare" },
      { id: 3, name: "Haircare" },
      { id: 4, name: "Fragrances" },
    ],
  },
  {
    id: 2,
    name: "Electronics",
    createdAt: "12/06/2023",
    updatedAt: "15/09/2023",
    subCategories: [
      { id: 1, name: "Smartphones" },
      { id: 2, name: "Laptops" },
      { id: 3, name: "Cameras" },
      { id: 4, name: "Wearables" },
      { id: 5, name: "Accessories" },
    ],
  },
  {
    id: 3,
    name: "Home Appliances",
    createdAt: "22/08/2023",
    updatedAt: "05/10/2023",
    subCategories: [
      { id: 1, name: "Refrigerators" },
      { id: 2, name: "Washing Machines" },
      { id: 3, name: "Vacuum Cleaners" },
      { id: 4, name: "Air Conditioners" },
    ],
  },
  {
    id: 4,
    name: "Fashion",
    createdAt: "15/04/2023",
    updatedAt: "29/09/2023",
    subCategories: [
      { id: 1, name: "Men's Clothing" },
      { id: 2, name: "Women's Clothing" },
      { id: 3, name: "Shoes" },
      { id: 4, name: "Accessories" },
    ],
  },
  {
    id: 5,
    name: "Books",
    createdAt: "03/03/2023",
    updatedAt: "17/09/2023",
    subCategories: [
      { id: 1, name: "Fiction" },
      { id: 2, name: "Non-fiction" },
      { id: 3, name: "Science" },
      { id: 4, name: "Children's Books" },
    ],
  },
  {
    id: 6,
    name: "Automotive",
    createdAt: "10/02/2023",
    updatedAt: "12/09/2023",
    subCategories: [
      { id: 1, name: "Car Accessories" },
      { id: 2, name: "Motorcycle Parts" },
      { id: 3, name: "Car Maintenance" },
    ],
  },
  {
    id: 7,
    name: "Sports & Outdoors",
    createdAt: "18/05/2023",
    updatedAt: "10/10/2023",
    subCategories: [
      { id: 1, name: "Fitness Equipment" },
      { id: 2, name: "Camping Gear" },
      { id: 3, name: "Cycling" },
      { id: 4, name: "Outdoor Clothing" },
    ],
  },
  {
    id: 8,
    name: "Toys & Games",
    createdAt: "21/04/2023",
    updatedAt: "25/09/2023",
    subCategories: [
      { id: 1, name: "Action Figures" },
      { id: 2, name: "Board Games" },
      { id: 3, name: "Building Sets" },
      { id: 4, name: "Dolls" },
    ],
  },
  {
    id: 9,
    name: "Health & Wellness",
    createdAt: "30/07/2023",
    updatedAt: "13/10/2023",
    subCategories: [
      { id: 1, name: "Supplements" },
      { id: 2, name: "Fitness Trackers" },
      { id: 3, name: "Yoga Mats" },
      { id: 4, name: "Massage Tools" },
    ],
  },
  {
    id: 10,
    name: "Groceries",
    createdAt: "11/08/2023",
    updatedAt: "20/09/2023",
    subCategories: [
      { id: 1, name: "Fruits & Vegetables" },
      { id: 2, name: "Snacks" },
      { id: 3, name: "Beverages" },
      { id: 4, name: "Dairy Products" },
    ],
  },
];


const CategoryPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categoriesData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const [categories, setCategories] = useState(categoriesData);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const addCategory = (name: string) => {
    const newCategory = {
      id: categories.length + 1,
      name: name,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      subCategories: [],
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="flex ">
      <div className="w-full h-full mt-4">
        <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
          <h1 className="text-3xl font-bold text-left text-gray-700">Category</h1>
          <div className="flex items-center bg-gray-200 rounded-lg p-2 w-1/3">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 h-5 w-5"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent focus:outline-none px-2 w-full"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            <span>Add a new category</span>
          </button>
        </div>

        <ModalCategory
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addCategory}
        />

        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 rounded-l-lg">Category</th>
                <th className="py-3 px-6">Subcategories</th>
                <th className="py-3 px-6">Created On</th>
                <th className="py-3 px-6">Updated On</th>
                <th className="py-3 px-6 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((category) => (
                <motion.tr
                  key={category.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6">
                    {category.subCategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-lg mr-2"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-6">{category.createdAt}</td>
                  <td className="py-3 px-6">{category.updatedAt}</td>
                  <td className="py-3 px-6 flex items-center space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8">
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </button>
                    <button className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2 flex items-center justify-center w-8 h-8">
                      <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginare */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-500"
              >
                Previous
              </button>
              <div className="space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} rounded-lg`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-500"
              >
                Next
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
