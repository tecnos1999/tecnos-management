import ApiServer from "@/module/system/service/ApiServer";
import { Subcategory } from "../models/Subcategory";

class SubCategoryService extends ApiServer {
  
  createSubCategory = async (name: string, category: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/subcategory/create?name=${name}&category=${category}`,
      "POST",
      null,
      token
    );
    if (response.status === 201) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create subcategory");
    }
  };

  getSubcategories = async (): Promise<Subcategory[]> => {
    const response = await this.api<null, any>(
      `/subcategory/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Subcategory[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch subcategories");
    }
  };

  deleteSubCategory = async (name: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/subcategory/delete?name=${name}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to delete subcategory");
    }
  };

  updateSubCategory = async (name: string, updatedName: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/subcategory/update?name=${name}&updatedName=${updatedName}`,
      "PUT",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to update subcategory");
    }
  };
}

export default SubCategoryService;
