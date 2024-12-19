import ApiServer from "@/module/system/service/ApiServer";
import { ItemCategory } from "../models/ItemCategory";
import { ItemCategoryDTO } from "../dto/ItemCategoryDTO";

class ItemCategoryService extends ApiServer {
  createItemCategory = async (
    name: string,
    subCategory: string,
    categoryName: string,
    token: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/create?name=${name}&subCategory=${subCategory}&categoryName=${categoryName}`,
      "POST",
      null,
      token
    );

    if (response.ok) {
      return await response.text();
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create item category");
  };

  getItemCategories = async (): Promise<ItemCategoryDTO[]> => {
   
    const response = await this.api<null, any>(
      `/itemcategory/all`,
      "GET",
      null,
      ""
    );

    if (response.ok) {
      return await response.json();
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch item categories");
  
  };

  deleteItemCategory = async (
    name: string,
    subCategory: string,
    categoryName: string,
    token: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/delete?name=${name}&subCategoryName=${subCategory}&categoryName=${categoryName}`,
      "DELETE",
      null,
      token
    );

    if (response.ok) {
      return await response.text();
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete item category");
  };

  updateItemCategory = async (
    name: string,
    updatedName: string,
    subCategory: string,
    categoryName: string,
    updatedSubCategoryName: string,
    updatedCategoryName: string,
    token: string
  ): Promise<string> => {
    const response = await this.api<null, any>(
      `/itemcategory/update?name=${encodeURIComponent(name)}&updatedName=${encodeURIComponent(updatedName)}&subCategoryName=${encodeURIComponent(subCategory)}&categoryName=${encodeURIComponent(categoryName)}&updatedSubCategoryName=${encodeURIComponent(updatedSubCategoryName)}&updatedCategoryName=${encodeURIComponent(updatedCategoryName)}`,
      "PUT",
      null,
      token
    );
  
    if (response.ok) {
      return await response.text();
    }
  
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update item category");
  };
  
}

export default ItemCategoryService;
