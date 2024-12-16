"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
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
import { ProductDTO } from "@/module/products/dto/ProductDTO";

interface UpdateProductFormProps {
  product: ProductDTO;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product }) => {
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

  const [sku, setSku] = useState(product.sku);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [itemCategory, setItemCategory] = useState(product.itemCategory || "");
  const [category, setCategory] = useState(product.category || "");
  const [subCategory, setSubCategory] = useState(product.subCategory || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentsLinks>({
    broschure: null,
    technicalSheet: null,
    videoLink: product.linkVideo || "",
  });
  const [partnerName, setPartnerName] = useState(product.partnerName || "");
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

  const handleUpdate = async () => {
    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }
  
    if (!name || !description) {
      toast.error("Name and Description are required.");
      return;
    }
  
    // Helper function to convert File to string (base64)
    const fileToString = async (file: File | null): Promise<string | null> => {
      if (!file) return null;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Converts to base64 string
      });
    };
  
    try {
      const broschureString = await fileToString(documents.broschure);
      const technicalSheetString = await fileToString(documents.technicalSheet);
  
      const updatedProduct: ProductDTO = {
        sku,
        name,
        description,
        itemCategory,
        category,
        subCategory,
        images: null,
        broschure: broschureString, // Convert File to string
        tehnic: technicalSheetString, // Convert File to string
        linkVideo: documents.videoLink,
        partnerName,
      };
  
      await productService.updateProduct(
        token,
        sku,
        updatedProduct,
        imageFiles,
        documents.broschure || undefined,
        documents.technicalSheet || undefined
      );
  
      toast.success("Product updated successfully!");
      router.push("/products");
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
    <div className="container min-h-screen grid grid-cols-3 gap-4 p-4">
      <HeaderContainer
        onCancel={() => router.push("/products")}
        onSubmit={handleUpdate}
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
        className="col-span-1 p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg font-bold">Upload Images</h2>
          <div className="w-full h-64 border rounded-lg flex items-center justify-center">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            ) : (
              <span>No Image Selected</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((file, index) => (
              <div key={index} className="relative group w-20 h-20">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover w-full h-full"
                  onClick={() => setSelectedImage(file)}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-600"
                >
                  <FaTimesCircle />
                </button>
              </div>
            ))}
            <div {...getRootProps()} className="w-20 h-20 border-dashed">
              <input {...getInputProps()} />
              <span>+</span>
            </div>
          </div>
        </div>

        {/* Category & Partner Selection */}
        <div>
          <h2 className="text-lg font-bold">Category</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2"
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
            className="w-full border p-2"
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
            className="w-full border p-2"
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
          <h2 className="text-lg font-bold">Partner</h2>
          <select
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full border p-2"
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

export default UpdateProductForm;
