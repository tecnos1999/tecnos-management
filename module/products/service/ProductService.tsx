import ApiServer from "@/module/system/service/ApiServer";
import { Product } from "../models/Product";
import { ProductDTO } from "../dto/ProductDTO";

class ProductService extends ApiServer {
  
  createProduct = async (productDTO: ProductDTO, token: string): Promise<string> => {
    const response = await this.api<ProductDTO, any>(
      `/product`,
      "POST",
      productDTO,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create product");
    }
  };

  getProductBySku = async (sku: string): Promise<Product> => {
    const response = await this.api<null, any>(
      `/product/${sku}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Product;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch product");
    }
  };

  deleteProduct = async (sku: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/product/${sku}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to delete product");
    }
  };

  updateProduct = async (sku: string, updatedProductDTO: ProductDTO, token: string): Promise<string> => {
    const response = await this.api<ProductDTO, any>(
      `/product/${sku}`,
      "PUT",
      updatedProductDTO,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to update product");
    }
  };

  getProducts = async (): Promise<Product[]> => {
    const response = await this.api<null, any>(
      `/product/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Product[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch products");
    }
  };
}

export default ProductService;
