"use client";
import CategoryService from "@/module/category/service/CategoryService";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import { PartnerDTO } from "@/module/partners/dto/PartnerDTO";
import PartnersService from "@/module/partners/service/PartnersService";
import Dropzone from "@/module/products/components/Dropzone";
import HeaderContainer from "@/module/products/components/HeaderContainer";
import ProductService from "@/module/products/service/ProductService";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import {
  loadCategories,
  retrieveCategoriesSuccess,
} from "@/store/category/category.reducers";
import { selectCategories } from "@/store/category/category.selectors";
import {
  loadItemCategories,
  retrieveItemCategoriesSuccess,
} from "@/store/itemcategory/itemCategory.reducers";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
import {
  loadSubcategories,
  retrieveSubcategoriesSuccess,
} from "@/store/subcategory/subcategory.reducers";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import React, {  useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const UpdateProductPage = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);
  const itemCategories = useSelector(selectItemCategories);

  const subcategoryService = useMemo(() => new SubcategoryService(), []);
  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);
  const productService = useMemo(() => new ProductService(), []);
  const partnersService = useMemo(() => new PartnersService(), []);

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const searchParams = useSearchParams();
  const productSku = decodeURIComponent(searchParams.get("sku") || "");

  useEffect(() => {
    productService.getProductBySku(productSku).then((product) => {
      setSku(product.sku);
      setName(product.name);
      setDescription(product.description);
      setItemCategory(product.itemCategory || "");
      setCategory(product.category || "");
      setSubCategory(product.subCategory || "");
      setPartnerName(product.partnerName || "");

      setBroschure(product.broschure ? new File([], product.broschure) : null);
      setTechnicalSheet(product.tehnic ? new File([], product.tehnic) : null);
      setVideoLink(product.linkVideo || "");
    });
  }, [productSku, productService]);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const [broschure, setBroschure] = useState<File | null>(null);
  const [technicalSheet, setTechnicalSheet] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        dispatch(loadCategories(fetchedCategories));
        dispatch(retrieveCategoriesSuccess());

        const fetchedSubcategories =
          await subcategoryService.getSubcategories();
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());

        const fetchedItemCategories =
          await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(fetchedItemCategories));
        dispatch(retrieveItemCategoriesSuccess());

        const fetchedPartners = await partnersService.getAllPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        toast.error((error as string) || "Error fetching data");
      }
    };

    fetchData();
  }, [
    categoryService,
    subcategoryService,
    itemCategoryService,
    partnersService,
    dispatch,
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImageFiles((prev) => {
        const newFiles = [...prev, ...acceptedFiles];
        setSelectedImage(acceptedFiles[acceptedFiles.length - 1]);
        return newFiles;
      });
    },
    accept: { "image/*": [] },
  });

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    if (selectedImage === imageFiles[index]) setSelectedImage(null);
  };

 

  return (
    <div className="container min-h-screen min-w-full grid grid-cols-3 grid-rows-10 gap-2 p-2">
      <HeaderContainer
        onCancel={() => {}}
        onSubmit={() => {}}
        isEditMode={true}
      />
      <motion.div
        className="col-[1/3] row-[2/6] bg-white p-6 rounded-xl shadow-md border border-gray-200"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          General Information
        </h2>
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
      <motion.div
        className="col-[3] row-[2/11] p-4 flex flex-col bg-white shadow-md rounded-lg border border-gray-200 gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Upload Images</h2>
          <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            {selectedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover"
                  onClick={() => setSelectedImage(file)}
                />
                <button
                  className="absolute top-1 right-1 text-red-500 text-sm p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-transform transform hover:scale-110 hover:text-red-600"
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

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Category</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcat) => (
              <option key={subcat.name} value={subcat.name}>
                {subcat.name}
              </option>
            ))}
          </select>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Item Category</option>
            {itemCategories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">Partner</h2>
          <select
            value={partnerName || ""}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Partner</option>
            {partners.map((partner) => (
              <option key={partner.name} value={partner.name}>
                {partner.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        className="col-[1/3] row-[6/11] p-5 bg-white shadow-md rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      >
        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Additional Resources
        </h2>

        <motion.div className="col-[1/3] row-[6/11] p-5 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-5 text-gray-800">
            Additional Resources
          </h2>

          <div className="mb-1">
            <label className="block mb-2 font-semibold text-gray-700 text-base">
              Broschure
            </label>
            <Dropzone
              fileType="broschure"
              currentFile={broschure}
              onFileDrop={(file) => setBroschure(file)}
            />
          </div>

          <div className="mb-1">
            <label className="block mb-2 font-semibold text-gray-700 text-base">
              Technical File
            </label>
            <Dropzone
              fileType="technicalSheet"
              currentFile={technicalSheet}
              onFileDrop={(file) => setTechnicalSheet(file)}
            />
          </div>
        </motion.div>

        <div className="mb-2">
          <label className="block mb-2 font-semibold text-gray-700 text-base">
            Link
          </label>
          <input
            type="url"
            placeholder="Enter link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateProductPage;
