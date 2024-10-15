'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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
    name: 'Electronics',
    createdAt: '2023-10-01T12:34:56',
    updatedAt: '2023-10-10T15:40:22',
    subCategories: [
      { id: 1, name: 'Smartphones' },
      { id: 2, name: 'Laptops' },
      { id: 3, name: 'Cameras' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    createdAt: '2023-09-15T08:12:34',
    updatedAt: '2023-10-01T10:05:22',
    subCategories: [
      { id: 4, name: 'Refrigerators' },
      { id: 5, name: 'Washing Machines' },
      { id: 6, name: 'Microwaves' },
    ],
  },
];

const CategoryPage: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const categories = categoriesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const toggleDropdown = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleSelectCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories(categories.map(category => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    alert(`Deleting categories: ${selectedCategories.join(', ')}`);
  };

  const handleEdit = () => {
    alert(`Editing categories: ${selectedCategories.join(', ')}`);
  };

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-3xl font-bold mb-6">Categories Overview</h1>

      <div className="mb-4 flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEdit}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-blue-300"
          disabled={selectedCategories.length === 0}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:bg-red-300"
          disabled={selectedCategories.length === 0}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Delete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert('Creating new category...')}
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create
        </motion.button>
      </div>

      <div className="w-full overflow-x-auto">
        <motion.table 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          className="min-w-full bg-white shadow-md rounded-lg"
        >
          <thead className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedCategories.length === categories.length}
                  className="form-checkbox h-4 w-4"
                />
              </th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Updated At</th>
              <th className="py-3 px-6 text-left">Subcategories</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {categories.map((category) => (
              <motion.tr 
                key={category.id} 
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <td className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectCategory(category.id)}
                    checked={selectedCategories.includes(category.id)}
                    className="form-checkbox h-4 w-4"
                  />
                </td>
                <td className="py-3 px-6 text-left">{category.id}</td>
                <td className="py-3 px-6 text-left">{category.name}</td>
                <td className="py-3 px-6 text-left">{new Date(category.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">{new Date(category.updatedAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown(category.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    {openDropdown === category.id ? 'Hide' : 'Show'}
                  </motion.button>
                  {openDropdown === category.id && (
                    <ul className="list-disc list-inside">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id}>{subCategory.name}</li>
                      ))}
                    </ul>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="flex justify-between items-center w-full mt-4">
        <div className="text-gray-600 text-sm">
          Rows per page: 
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="ml-2 p-1 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <div>
            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, categoriesData.length)} of {categoriesData.length}
          </div>
          <button
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
            className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page >= Math.ceil(categoriesData.length / rowsPerPage) - 1}
            className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
