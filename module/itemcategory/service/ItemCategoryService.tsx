import ApiServer from "@/module/system/service/ApiServer";
import { ItemCategory } from "../models/ItemCategory";

class ItemCategoryService extends ApiServer {
  
  createItemCategory = async (name: string, subCategory: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/create?name=${name}&subCategory=${subCategory}`,
      "POST",
      null,
      token
    );
    if (response.status === 201) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create item category");
    }
  };

  getItemCategories = async (): Promise<ItemCategory[]> => {
    const response = await this.api<null, any>(
      `/itemcategory/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ItemCategory[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create item category");
    }
  };

  deleteItemCategory = async (name: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/delete?name=${name}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create item category");
    }
  };

  updateItemCategory = async (name: string, updatedName: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/update?name=${name}&updatedName=${updatedName}`,
      "PUT",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create item category");
    }
  };
}

export default ItemCategoryService;
