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

const categoriesData: Category[] = [{'id': 1,
  'name': 'Category-1',
  'createdAt': '2023-11-13T19:47:00',
  'updatedAt': '2024-01-03T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 2,
  'name': 'Category-2',
  'createdAt': '2024-01-21T19:47:00',
  'updatedAt': '2024-03-03T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 3,
  'name': 'Category-3',
  'createdAt': '2024-08-05T19:47:00',
  'updatedAt': '2024-09-11T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 4,
  'name': 'Category-4',
  'createdAt': '2024-04-24T19:47:00',
  'updatedAt': '2024-05-12T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 5,
  'name': 'Category-5',
  'createdAt': '2024-06-10T19:47:00',
  'updatedAt': '2024-08-06T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 6,
  'name': 'Category-6',
  'createdAt': '2024-07-19T19:47:00',
  'updatedAt': '2024-08-22T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 7,
  'name': 'Category-7',
  'createdAt': '2024-02-09T19:47:00',
  'updatedAt': '2024-02-12T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 8,
  'name': 'Category-8',
  'createdAt': '2024-06-22T19:47:00',
  'updatedAt': '2024-07-09T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'},
   {'id': 5, 'name': 'Subcategory-5'}]},
 {'id': 9,
  'name': 'Category-9',
  'createdAt': '2024-04-13T19:47:00',
  'updatedAt': '2024-05-31T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 10,
  'name': 'Category-10',
  'createdAt': '2024-05-25T19:47:00',
  'updatedAt': '2024-06-17T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 11,
  'name': 'Category-11',
  'createdAt': '2023-12-16T19:47:00',
  'updatedAt': '2024-01-28T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 12,
  'name': 'Category-12',
  'createdAt': '2023-11-02T19:47:00',
  'updatedAt': '2023-11-27T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 13,
  'name': 'Category-13',
  'createdAt': '2024-06-19T19:47:00',
  'updatedAt': '2024-07-05T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 14,
  'name': 'Category-14',
  'createdAt': '2024-07-29T19:47:00',
  'updatedAt': '2024-09-20T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 15,
  'name': 'Category-15',
  'createdAt': '2024-04-21T19:47:00',
  'updatedAt': '2024-05-27T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 16,
  'name': 'Category-16',
  'createdAt': '2023-11-04T19:47:00',
  'updatedAt': '2023-11-25T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 17,
  'name': 'Category-17',
  'createdAt': '2024-07-17T19:47:00',
  'updatedAt': '2024-08-27T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 18,
  'name': 'Category-18',
  'createdAt': '2024-05-25T19:47:00',
  'updatedAt': '2024-06-20T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'},
   {'id': 5, 'name': 'Subcategory-5'}]},
 {'id': 19,
  'name': 'Category-19',
  'createdAt': '2024-08-29T19:47:00',
  'updatedAt': '2024-10-17T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 20,
  'name': 'Category-20',
  'createdAt': '2023-10-19T19:47:00',
  'updatedAt': '2023-12-05T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 21,
  'name': 'Category-21',
  'createdAt': '2024-08-07T19:47:00',
  'updatedAt': '2024-09-20T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 22,
  'name': 'Category-22',
  'createdAt': '2024-08-23T19:47:00',
  'updatedAt': '2024-09-12T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 23,
  'name': 'Category-23',
  'createdAt': '2024-09-01T19:47:00',
  'updatedAt': '2024-09-06T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'},
   {'id': 5, 'name': 'Subcategory-5'}]},
 {'id': 24,
  'name': 'Category-24',
  'createdAt': '2024-06-11T19:47:00',
  'updatedAt': '2024-06-24T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 25,
  'name': 'Category-25',
  'createdAt': '2024-02-21T19:47:00',
  'updatedAt': '2024-04-04T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 26,
  'name': 'Category-26',
  'createdAt': '2023-12-04T19:47:00',
  'updatedAt': '2024-01-23T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 27,
  'name': 'Category-27',
  'createdAt': '2024-05-19T19:47:00',
  'updatedAt': '2024-06-01T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 28,
  'name': 'Category-28',
  'createdAt': '2023-10-28T19:47:00',
  'updatedAt': '2023-12-09T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'},
   {'id': 5, 'name': 'Subcategory-5'}]},
 {'id': 29,
  'name': 'Category-29',
  'createdAt': '2024-04-19T19:47:00',
  'updatedAt': '2024-05-15T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 30,
  'name': 'Category-30',
  'createdAt': '2024-01-20T19:47:00',
  'updatedAt': '2024-02-29T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 31,
  'name': 'Category-31',
  'createdAt': '2024-08-20T19:47:00',
  'updatedAt': '2024-09-07T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 32,
  'name': 'Category-32',
  'createdAt': '2024-07-18T19:47:00',
  'updatedAt': '2024-08-18T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 33,
  'name': 'Category-33',
  'createdAt': '2023-10-29T19:47:00',
  'updatedAt': '2023-11-26T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 34,
  'name': 'Category-34',
  'createdAt': '2024-03-02T19:47:00',
  'updatedAt': '2024-04-25T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 35,
  'name': 'Category-35',
  'createdAt': '2024-05-03T19:47:00',
  'updatedAt': '2024-05-15T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 36,
  'name': 'Category-36',
  'createdAt': '2024-09-06T19:47:00',
  'updatedAt': '2024-10-08T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 37,
  'name': 'Category-37',
  'createdAt': '2024-04-19T19:47:00',
  'updatedAt': '2024-06-02T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 38,
  'name': 'Category-38',
  'createdAt': '2024-02-20T19:47:00',
  'updatedAt': '2024-03-03T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 39,
  'name': 'Category-39',
  'createdAt': '2023-12-28T19:47:00',
  'updatedAt': '2024-01-01T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 40,
  'name': 'Category-40',
  'createdAt': '2024-09-16T19:47:00',
  'updatedAt': '2024-11-04T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 41,
  'name': 'Category-41',
  'createdAt': '2024-02-19T19:47:00',
  'updatedAt': '2024-04-09T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 42,
  'name': 'Category-42',
  'createdAt': '2023-11-11T19:47:00',
  'updatedAt': '2024-01-09T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'},
   {'id': 5, 'name': 'Subcategory-5'}]},
 {'id': 43,
  'name': 'Category-43',
  'createdAt': '2024-08-26T19:47:00',
  'updatedAt': '2024-08-31T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'},
   {'id': 4, 'name': 'Subcategory-4'}]},
 {'id': 44,
  'name': 'Category-44',
  'createdAt': '2024-04-05T19:47:00',
  'updatedAt': '2024-05-28T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 45,
  'name': 'Category-45',
  'createdAt': '2024-02-03T19:47:00',
  'updatedAt': '2024-02-20T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 46,
  'name': 'Category-46',
  'createdAt': '2024-08-31T19:47:00',
  'updatedAt': '2024-10-25T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 47,
  'name': 'Category-47',
  'createdAt': '2024-02-18T19:47:00',
  'updatedAt': '2024-04-09T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'},
   {'id': 3, 'name': 'Subcategory-3'}]},
 {'id': 48,
  'name': 'Category-48',
  'createdAt': '2024-10-14T19:47:00',
  'updatedAt': '2024-11-22T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'},
   {'id': 2, 'name': 'Subcategory-2'}]},
 {'id': 49,
  'name': 'Category-49',
  'createdAt': '2024-05-31T19:47:00',
  'updatedAt': '2024-07-02T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]},
 {'id': 50,
  'name': 'Category-50',
  'createdAt': '2024-03-11T19:47:00',
  'updatedAt': '2024-04-24T19:47:00',
  'subCategories': [{'id': 1, 'name': 'Subcategory-1'}]}];


const CategoryPage: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categoriesData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  const handleChangePage = (newPage: number) => {
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
    <div className="flex flex-col items-center bg-gray-100 p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Categories Overview</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-6xl">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEdit}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-blue-300"
          disabled={selectedCategories.length === 0}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 disabled:bg-red-300"
          disabled={selectedCategories.length === 0}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Delete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert('Creating new category...')}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create
        </motion.button>
      </div>

      <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-lg shadow-lg">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-w-full bg-white text-left text-gray-800"
        >
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              <th className="py-3 px-6">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedCategories.length === categories.length && categories.length > 0}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
              </th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
              <th className="py-3 px-6">Subcategories</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {categories.map((category) => (
              <motion.tr
                key={category.id}
                className="border-b hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <td className="py-3 px-6">
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectCategory(category.id)}
                    checked={selectedCategories.includes(category.id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                </td>
                <td className="py-3 px-6">{category.id}</td>
                <td className="py-3 px-6">{category.name}</td>
                <td className="py-3 px-6">{new Date(category.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6">{new Date(category.updatedAt).toLocaleString()}</td>
                <td className="py-3 px-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => toggleDropdown(category.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {openDropdown === category.id ? 'Hide' : 'Show'}
                  </motion.button>
                  {openDropdown === category.id && (
                    <ul className="mt-2">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id} className="text-sm text-gray-700">
                          {subCategory.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="flex justify-between items-center w-full max-w-6xl mt-6 text-gray-700">
        <div className="flex items-center">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="ml-2 p-2 border border-gray-300 rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className="flex items-center">
          <span>
            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredCategories.length)} of{' '}
            {filteredCategories.length}
          </span>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="ml-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(filteredCategories.length / rowsPerPage) - 1}
            className="ml-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
