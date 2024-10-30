import ApiServer from "@/module/system/service/ApiServer";
import { ItemCategory } from "../models/ItemCategory";

class ItemCategoryService extends ApiServer {
  
  createItemCategory = async (name: string, subCategory: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/create?name=${name}&subCategory=${subCategory}`,
      "POST",
      null,
      ""
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
      return Promise.reject("Failed to fetch item categories");
    }
  };

  deleteItemCategory = async (name: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/delete?name=${name}`,
      "DELETE",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      return Promise.reject("Failed to delete item category");
    }
  };

  updateItemCategory = async (name: string, updatedName: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/update?name=${name}&updatedName=${updatedName}`,
      "PUT",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to create item category");
    }
  };

  findItemCategoryByName = async (name: string): Promise<ItemCategory> => {
    const response = await this.api<null, any>(
      `/itemcategory/find?name=${name}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ItemCategory;
    } else {
      return Promise.reject("Failed to find item category");
    }
  };
}

export default ItemCategoryService;
