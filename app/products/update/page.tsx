"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductService from "@/module/products/service/ProductService";
import { ProductDTO } from "@/module/products/dto/ProductDTO";
import UpdateProductForm from "@/module/products/components/UpdateProductForm";

const UpdateProductPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const productService = new ProductService();

  const [product, setProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (sku) {
        try {
          const fetchedProduct = await productService.getProductBySku(sku);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Failed to fetch product:", error);
          router.push("/products");
        }
      }
    };

    fetchProduct();
  }, [sku, productService, router]);

  if (!product) return <div>Loading...</div>;

  return <UpdateProductForm product={product} />;
};

export default UpdateProductPage;
