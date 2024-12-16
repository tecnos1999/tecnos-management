"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
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
import PartnersService from "@/module/partners/service/PartnersService";
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
import { motion } from "framer-motion";
import DocumentsLinks from "@/module/documents/dto/DocumentsLinks";
import { PartnerDTO } from "@/module/partners/dto/PartnerDTO";
import { determinePath } from "@/system/utils";

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
  const productService = useMemo(() => new ProductService(), []);
  const partnersService = useMemo(() => new PartnersService(), []);
  const { user } = useContext(LoginContext) as LoginContextType;

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const token = user?.token ?? "";

  const handleDocumentsChange = useCallback(
    (updatedDocuments: DocumentsLinks) => {
      setDocuments(updatedDocuments);
    },
    []
  );

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
        toast.error("Error fetching data.");
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

  const handleSubmit = async () => {
    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }

    if (!sku || !name || !description) {
      toast.error("SKU, Name, and Description are required.");
      return;
    }

    try {
      const productDTO = {
        sku,
        name,
        description,
        itemCategory,
        category,
        subCategory,
        images: null,
        broschure: null,
        tehnic: null,
        linkVideo: documents.videoLink || "",
        partnerName: partnerName,
      };

      await productService.createProduct(
        token,
        productDTO,
        imageFiles,
        documents.broschure || undefined,
        documents.technicalSheet || undefined
      );

      toast.success("Product created successfully!");
      router.push(determinePath("/products"));
    } catch (error) {
      toast.error((error as string) || "An error occurred.");
    }
  };

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
        onCancel={() => router.push(determinePath("/products"))}
        onSubmit={handleSubmit}
        isEditMode={false}
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
      >
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Upload Images</h2>
          {/* Imagine principală selectată */}
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

          {/* Lista imaginilor încărcate */}
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
      <AddDocumentsSection onDocumentsChange={handleDocumentsChange} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProductPage;
