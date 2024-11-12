"use client";
import React, { useEffect, useMemo, useState, useContext } from "react";
import Dialog from "@/components/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "@/module/context/LoginProvider";
import LoginContextType from "@/module/context/LoginContextType";
import { Product } from "@/module/products/models/Product";
import ProductService from "@/module/products/service/ProductService";
import SearchBar from "@/module/category/components/SearchBar";
import ProductTable from "@/module/products/components/ProductTable";
import Pagination from "@/module/category/components/Pagination";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { user } = useContext(LoginContext) as LoginContextType;
  const token = user?.token ?? "";

  const productService = useMemo(() => new ProductService(), []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, [productService]);

  const handleDeleteRequest = (sku: string) => {
    setProductToDelete(sku);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await productService.deleteProduct(productToDelete, token);
        setProducts(products.filter((product) => product.sku !== productToDelete));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
      setIsDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEdit = (sku: string, updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.sku === sku ? { ...product, ...updatedProduct } : product
      )
    );
    toast.success("Product updated successfully");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 shadow-lg rounded-lg py-6 px-4">
        <h1 className="text-3xl font-bold text-left text-gray-700">Products</h1>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <button
          onClick={() => setIsModalOpen(true)} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
        >  
          <span>+ New Product</span>
        </button>
      </div>

      <ProductTable
        currentItems={currentItems}
        handleEdit={handleEdit}
        handleDelete={handleDeleteRequest}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <Dialog
        isOpen={isDialogOpen}
        message={`Are you sure you want to delete product with SKU: "${productToDelete}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDialogOpen(false)}
      />
{/* 
      {isModalOpen && (
        <ModalUpdateProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onUpdate={(updatedProduct) => {
            handleEdit(updatedProduct.sku, updatedProduct);
            setIsModalOpen(false);
          }}
        />
      )} */}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductsPage;
