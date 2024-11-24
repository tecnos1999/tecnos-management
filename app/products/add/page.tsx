"use client";

import React, { useEffect, useState, useMemo, useContext, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SubcategoryService from "@/module/subcategory/service/SubcategoryService";
import CategoryService from "@/module/category/service/CategoryService";
import ItemCategoryService from "@/module/itemcategory/service/ItemCategoryService";
import ProductService from "@/module/products/service/ProductService";
import { selectSubcategories } from "@/store/subcategory/subcategory.selectors";
import { selectItemCategories } from "@/store/itemcategory/itemCategory.selectors";
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
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import AddDocumentsSection from "@/module/products/components/AddDocumentSection";
import HeaderContainer from "@/module/products/components/HeaderContainer";
import GeneralInformationContainer from "@/module/products/components/GeneralInformation";
import DocumentService from "@/module/documents/service/DocumentService";
import { motion } from "framer-motion";
import DocumentsLinks from "@/module/documents/dto/DocumentsLinks";

const AddProductPage: React.FC = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentsLinks>({
    broschure: null,
    technicalSheet: null,
    catalog: null,
    videoLink: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const subcategories = useSelector(selectSubcategories);
  const itemCategories = useSelector(selectItemCategories);

  const subcategoryService = useMemo(() => new SubcategoryService(), []);
  const itemCategoryService = useMemo(() => new ItemCategoryService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);
  const documentService = useMemo(() => new DocumentService(), []);
  const productService = useMemo(() => new ProductService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";
  const handleDocumentsChange = useCallback((updatedDocuments: DocumentsLinks) => {
    setDocuments(updatedDocuments);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        dispatch(loadCategories(fetchedCategories));
        dispatch(retrieveCategoriesSuccess());
        const fetchedSubcategories = await subcategoryService.getSubcategories();
        dispatch(loadSubcategories(fetchedSubcategories));
        dispatch(retrieveSubcategoriesSuccess());
        const fetchedItemCategories = await itemCategoryService.getItemCategories();
        dispatch(loadItemCategories(fetchedItemCategories));
        dispatch(retrieveItemCategoriesSuccess());
      } catch (error) {
        toast.error(error as string || "A apărut o eroare.");
      }
    };

    fetchData();
  }, [categoryService, subcategoryService, itemCategoryService, dispatch]);

  const filteredSubcategories = subcategories.filter(
    (subcat) => subcat.categoryName === category
  );

  const filteredItemCategories = itemCategories.filter((itemCat) => {
    return (
      itemCat.categoryName === category &&
      itemCat.subcategoryName === subCategory
    );
  });
  

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
    if (!token) {
      toast.error("Nu ești autentificat. Reîncearcă după autentificare.");
      return;
    }

    if (!sku || !name || !description) {
      toast.error("SKU, Name, și Description sunt obligatorii.");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Adaugă cel puțin o imagine pentru produs.");
      return;
    }

    try {
      toast.info("Se încarcă imaginile...");
      const uploadedImages = await documentService.uploadDocuments(imageFiles, token);

      if (!uploadedImages || uploadedImages.length === 0) {
        throw new Error("Nu s-au putut încărca imaginile.");
      }

      const uploadedDocuments = {
        broschure: documents.broschure
          ? (await documentService.uploadDocuments([documents.broschure], token))[0].url
          : null,
        technicalSheet: documents.technicalSheet
          ? (await documentService.uploadDocuments([documents.technicalSheet], token))[0].url
          : null,
        catalog: documents.catalog
          ? (await documentService.uploadDocuments([documents.catalog], token))[0].url
          : null,
        videoLink: documents.videoLink,
      };

      toast.success("Documentele au fost încărcate cu succes!");

      const newProductDTO = {
        sku,
        name,
        description,
        itemCategory,
        category,
        subCategory,
        images: uploadedImages.map((doc) => ({
          url: doc.url,
          type: doc.type,
        })),
        broschure: uploadedDocuments.broschure,
        tehnic: uploadedDocuments.technicalSheet,
        catalog: uploadedDocuments.catalog,
        linkVideo: uploadedDocuments.videoLink,
      };

      toast.info("Se salvează produsul...");
      await productService.createProduct(newProductDTO, token);

      toast.success("Produsul a fost creat cu succes!");
      // router.push("/product");
    } catch (error: any) {
      toast.error(error.message || "A apărut o eroare.");
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
    <div className="container min-h-screen min-w-full grid grid-cols-3 grid-rows-10 gap-2 p-2">
      <HeaderContainer
        onCancel={() => router.push("/product")}
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
      <AddDocumentsSection onDocumentsChange={handleDocumentsChange} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProductPage;
