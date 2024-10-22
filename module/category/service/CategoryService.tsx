import ApiServer from "@/module/system/service/ApiServer";
import { Category } from "../models/Category";

class CategoryService extends ApiServer {
  createCategory = async (categoryName: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/category/create?name=${categoryName}`,
      "POST",
      null,
      ""
    );
    if (response.status === 201) {
      const data = await response.text();
      return data;
    } else {
      return Promise.reject([]);
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
      return Promise.reject([]);
    }
  };

  deleteCategory = async (categoryName: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/category/delete?name=${categoryName}`,
      "DELETE",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.text();
      return data;
    } else {
      return Promise.reject([]);
    }
  };


    updateCategory = async (categoryName: string , updatedName : string): Promise<string> => {
        const response = await this.api<null, any>(
        `/category/update?name=${categoryName}&updatedName=${updatedName}`,
        "PUT",
        null,
        ""
        );
        if (response.status === 200) {
        const data = await response.text();
        return data;
        } else {
        return Promise.reject([]);
        }
    };
}

export default CategoryService;
