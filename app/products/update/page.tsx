"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";
import ProductService from "@/module/products/service/ProductService";
import Dropzone from "@/module/products/components/Dropzone";
import HeaderContainer from "@/module/products/components/HeaderContainer";
import CategoryService from "@/module/category/service/CategoryService";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import PartnersService from "@/module/partners/service/PartnersService";
import {
  loadCategories,
  retrieveCategoriesSuccess,
} from "@/store/category/category.reducers";
import {
  loadSubcategories,
  retrieveSubcategoriesSuccess,
} from "@/store/subcategory/subcategory.reducers";
import {
  loadItemCategories,
  retrieveItemCategoriesSuccess,
} from "@/store/itemcategory/itemCategory.reducers";
import { selectCategories } from "@/store/category/category.selectors";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
import { PartnerDTO } from "@/module/partners/dto/PartnerDTO";
import { ProductDTO } from "@/module/products/dto/ProductDTO";
import { motion } from "framer-motion";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";

const UpdateProductPage = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [broschure, setBroschure] = useState<File | null>(null);
  const [technicalSheet, setTechnicalSheet] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string }[]>([]);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const productSku = decodeURIComponent(searchParams.get("sku") || "");

  const productService = useMemo(() => new ProductService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);
  const subcategoryService = useMemo(() => new SubcategoryService(), []);
  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const partnersService = useMemo(() => new PartnersService(), []);
  const {user} = useContext(LoginContext) as LoginContextType;  

  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);
  const itemCategories = useSelector(selectItemCategories);
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
  useEffect(() => {
    const loadData = async () => {
      try {
        const product = await productService.getProductBySku(productSku);
        setSku(product.sku);
        setName(product.name);
        setDescription(product.description);
        setItemCategory(product.itemCategory || "");
        setCategory(product.category || "");
        setSubCategory(product.subCategory || "");
        setPartnerName(product.partnerName || "");
        setBroschure(
          product.broschure ? new File([], product.broschure) : null
        );
        setTechnicalSheet(product.tehnic ? new File([], product.tehnic) : null);
        setVideoLink(product.linkVideo || "");
        setExistingImages(product.images || []);

        const [
          fetchedCategories,
          fetchedSubcategories,
          fetchedItemCategories,
          fetchedPartners,
        ] = await Promise.all([
          categoryService.getCategories(),
          subcategoryService.getSubcategories(),
          itemCategoryService.getItemCategories(),
          partnersService.getAllPartners(),
        ]);

        dispatch(loadCategories(fetchedCategories));
        dispatch(retrieveCategoriesSuccess());
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());
        dispatch(loadItemCategories(fetchedItemCategories));
        dispatch(retrieveItemCategoriesSuccess());
        setPartners(fetchedPartners);
      } catch (error) {
        toast.error("Error loading data");
      }
    };
    loadData();
  }, [productSku, productService]);

  const handleUpdate = async () => {
    try {
      // Construiește DTO-ul pentru produs
      const updatedProductDTO: ProductDTO = {
        sku,
        name,
        description,
        category,
        subCategory,
        itemCategory,
        partnerName: partnerName || "",
        linkVideo: videoLink,
        broschure: broschure ? broschure.name : null,
        tehnic: technicalSheet ? technicalSheet.name : null,
      };
  
      // Pregătește datele pentru update
      const formData = new FormData();
      formData.append(
        "productDTO",
        new Blob([JSON.stringify(updatedProductDTO)], { type: "application/json" })
      );
  
      // Adaugă noile fișiere imagini
      imageFiles.forEach((file) => formData.append("images", file));
  
      // Adaugă fișierele broschure și tehnic
      if (broschure) {
        formData.append("broschure", broschure);
      }
      if (technicalSheet) {
        formData.append("tehnic", technicalSheet);
      }
  
      // Trimite request-ul către server
      await productService.updateProduct(user.token, productSku, formData);
  
      // Notificare de succes
      toast.success("Product updated successfully!");
    } catch (error) {
      // Tratare eroare
      console.error("Error updating product:", error);
      toast.error(
        error as string || "Failed to update product. Please try again later."
      );
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setImageFiles((prev) => [...prev, ...acceptedFiles]),
    accept: { "image/*": [] },
  });
  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="container min-h-screen p-4 grid grid-cols-3 gap-4">
      <HeaderContainer
        onCancel={() => {}}
        onSubmit={handleUpdate}
        isEditMode={true}
      />
      <motion.div
        className="col-[1/3] row-[2/6] bg-white p-6 rounded-xl shadow-md border border-gray-200"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2 className="text-xl font-bold mb-4">General Information</h2>
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </motion.div>

      <motion.div
        className="col-[3] row-[2/11] p-4 flex flex-col bg-white shadow-md rounded-lg border border-gray-200 gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-4">Images</h2>
          <div className="flex gap-2">
          {existingImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.url} className="w-20 h-20 object-cover" />
              <button onClick={() => handleRemoveExistingImage(index)}>
                <FaTimesCircle className="text-red-600 absolute top-0 right-0" />
              </button>
            </div>
          ))}
          {imageFiles.map((file, index) => (
            <div key={index} className="relative">
              <img src={URL.createObjectURL(file)} className="w-20 h-20 object-cover" />
              <button onClick={() => handleRemoveNewImage(index)}>
                <FaTimesCircle className="text-red-600 absolute top-0 right-0" />
              </button>
            </div>
          ))}
          <div {...getRootProps()} className="border-dashed border rounded w-20 h-20 flex items-center justify-center">
            <input {...getInputProps()} />
            <span>+</span>
          </div>
        </div>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name + cat.createdAt} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.name + sub.createdAt} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Item Category</option>
            {itemCategories.map((item) => (
              <option key={item.name + item.createdAt} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <h2 className="text-lg font-bold mb-4">Partner</h2>
          <select
            value={partnerName || ""}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Partner</option>
            {partners.map((partner) => (
              <option
                key={partner.name + partner.createdAt}
                value={partner.name}
              >
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
        <h2 className="text-lg font-bold mb-4">Additional Resources</h2>
        <Dropzone
          fileType="broschure"
          currentFile={broschure}
          onFileDrop={setBroschure}
        />
        <Dropzone
          fileType="technicalSheet"
          currentFile={technicalSheet}
          onFileDrop={setTechnicalSheet}
        />
        <input
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          placeholder="Video Link"
          className="w-full p-2 mt-4 border rounded"
        />
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProductPage;
