import ApiServer from "@/module/system/service/ApiServer";
import { ProductDTO } from "../dto/ProductDTO";

class ProductService extends ApiServer {
  createProduct = async (
    token: string,
    productDTO: ProductDTO,
    imageFiles: File[] = [],
    broschureFile?: File,
    tehnicFile?: File
  ): Promise<string> => {
    const formData = new FormData();
    formData.append(
      "productDTO",
      new Blob([JSON.stringify(productDTO)], { type: "application/json" })
    );

    imageFiles.forEach((file) => formData.append("images", file));

    if (broschureFile) formData.append("broschure", broschureFile);
    if (tehnicFile) formData.append("tehnic", tehnicFile);

    const response = await this.api<FormData, any>(
      `/product/`,
      "POST",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create product");
    }
  };

  updateProduct = async (
    token: string,
    sku: string,
    formData: FormData
  ): Promise<string> => {
    const response = await this.api<FormData, any>(
      `/product/${sku}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to update product");
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
      return await response.text();
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to delete product");
    }
  };

  getProductBySku = async (sku: string): Promise<ProductDTO> => {
    const response = await this.api<null, any>(
      `/product/${sku}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return (await response.json()) as ProductDTO;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch product");
    }
  };

  getProducts = async (): Promise<ProductDTO[]> => {
    const response = await this.api<null, any>(`/product/all`, "GET", null, "");

    if (response.status === 200) {
      return (await response.json()) as ProductDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch products");
    }
  };
}

export default ProductService;
