import ApiServer from "@/module/system/service/ApiServer";
import { Category } from "../models/Category";

class CategoryService extends ApiServer {
  createCategory = async (
    categoryName: string,
    token: string,
    mainSection: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/category/create?name=${categoryName}&mainSection=${mainSection}`,
      "POST",
      null,
      token
    );
    if (response.status === 201) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create category");
    }
  };

  getCategories = async (): Promise<Category[]> => {
    const response = await this.api<null, any>(
      `/category/findAll`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Category[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch categories");
    }
  };

  deleteCategory = async (
    categoryName: string,
    token: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/category/delete?name=${categoryName}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to delete category");
    }
  };

  updateCategory = async (
    categoryName: string,
    updatedName: string,
    token: string,
    updatedMainSection: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/category/update?name=${categoryName}&updatedName=${updatedName}&updatedMainSection=${updatedMainSection}`,
      "PUT",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to update category");
    }
  };
}

export default CategoryService;
