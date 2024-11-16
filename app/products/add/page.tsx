"use client";

import React, { useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import CategoryService from "@/module/category/service/CategoryService";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
import {
  loadCategories,
  retrieveCategoriesError,
  retrieveCategoriesLoading,
  retrieveCategoriesSuccess,
} from "@/store/category/category.reducers";
import {
  loadSubcategories,
  retrieveSubcategoriesError,
  retrieveSubcategoriesLoading,
  retrieveSubcategoriesSuccess,
} from "@/store/subcategory/subcategory.reducers";
import {
  loadItemCategories,
  retrieveItemCategoriesError,
  retrieveItemCategoriesLoading,
  retrieveItemCategoriesSuccess,
} from "@/store/itemcategory/itemCategory.reducers";
import { selectCategories } from "@/store/category/category.selectors";
import { motion } from "framer-motion";
import HeaderContainer from "@/module/products/components/HeaderContainer";
import { determinePath } from "@/system/utils";
import GeneralInformationContainer from "@/module/products/components/GeneralInformation";
import AddDocumentsSection from "@/module/products/components/AddDocumentSection";
const AddProductPage: React.FC = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);
  const itemCategories = useSelector(selectItemCategories);

  const subcategoryService = useMemo(() => new SubcategoryService(), []);
  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(retrieveCategoriesLoading());
      try {
        const fetchedCategories = await categoryService.getCategories();
        dispatch(loadCategories(fetchedCategories));
        dispatch(retrieveCategoriesSuccess());
      } catch (error) {
        dispatch(retrieveCategoriesError());
        toast.error((error as string) || "Error fetching categories");
      }
    };

    const fetchSubcategories = async () => {
      dispatch(retrieveSubcategoriesLoading());
      try {
        const fetchedSubcategories =
          await subcategoryService.getSubcategories();
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());
      } catch (error) {
        dispatch(retrieveSubcategoriesError());
        toast.error((error as string) || "Error fetching subcategories");
      }
    };

    const fetchItemCategories = async () => {
      dispatch(retrieveItemCategoriesLoading());
      try {
        const fetchedItemCategories =
          await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(fetchedItemCategories));
        dispatch(retrieveItemCategoriesSuccess());
      } catch (error) {
        dispatch(retrieveItemCategoriesError());
        toast.error((error as string) || "Error fetching item categories");
      }
    };

    fetchCategories();
    fetchSubcategories();
    fetchItemCategories();
  }, [dispatch, categoryService, subcategoryService, itemCategoryService]);

  const filteredSubcategories = subcategories.filter(
    (subcat) => subcat.categoryName === category
  );

  const filteredItemCategories = itemCategories.filter(
    (itemCat) => itemCat.subcategoryName === subCategory
  );

  const handleImageClick = (index: number) => {
    setSelectedImage(imageFiles[index]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);

    if (selectedImage === imageFiles[index]) {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async () => {
    const newProductDTO = {
      sku,
      name,
      description,
      itemCategory,
      category,
      subCategory,
      images: imageFiles.map((file) => URL.createObjectURL(file)),
    };

    try {
      toast.success("Product created successfully");
      router.push("/product");
    } catch (error) {
      toast.error("Error creating product");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImageFiles((prev) => [...prev, ...acceptedFiles]);
      if (!selectedImage && acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
      }
    },
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="container  min-h-screen min-w-full grid grid-cols-3 grid-rows-10 gap-2 p-2">
      <HeaderContainer
        onCancel={() => router.push(determinePath("product"))}
        onSubmit={handleSubmit}
      />
      <GeneralInformationContainer
        sku={sku}
        name={name}
        description={description}
        setSku={setSku}
        setName={setName}
        setDescription={setDescription}
      />
      <motion.div
        className="col-[3] row-[2/11] p-4 flex flex-col bg-white shadow-md rounded-lg border border-gray-200 gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Upload Img</h2>
          <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image Selected</span>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {imageFiles.map((file, index) => (
             <div
             key={index}
             className="relative group w-20 h-20 border border-gray-300 rounded-lg overflow-hidden cursor-pointer"
           >
             <img
               src={URL.createObjectURL(file)}
               alt={`Uploaded ${index + 1}`}
               className="w-full h-full object-cover"
               onClick={() => handleImageClick(index)}
             />
             <button
               className="absolute top-1 right-0 text-red-500 text-sm p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-transform transform hover:scale-105 hover:text-red-600"
               onClick={() => handleRemoveImage(index)}
               title="Remove Image"
             >
               <FaTimesCircle />
             </button>
           </div>
            ))}
            <div
              {...getRootProps()}
              className="w-20 h-20 border border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input {...getInputProps()} />
              <span className="text-2xl text-gray-400">+</span>
            </div>
          </div>
        </div>

        <div className="category space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Category</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md text-gray-800"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md text-gray-800"
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {filteredSubcategories.map((subcat) => (
              <option key={subcat.name} value={subcat.name}>
                {subcat.name}
              </option>
            ))}
          </select>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md text-gray-800"
          >
            <option value="" disabled>
              Select Item Category
            </option>
            {filteredItemCategories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <AddDocumentsSection />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProductPage;