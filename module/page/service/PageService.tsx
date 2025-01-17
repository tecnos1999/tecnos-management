import ApiServer from "@/module/system/service/ApiServer";
import { PageDTO } from "../dto/PageDTO";

class PageService extends ApiServer {
  addPage = async (pageData: PageDTO, token: string, imageUrl: File | null): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "pageDTO",
      new Blob([JSON.stringify(pageData)], { type: "application/json" })
    );

    if (imageUrl) {
      formData.append("file", imageUrl);
    }

    const response = await this.api<FormData, string>(
      "/pages/create",
      "POST",
      formData,
      token
    );

    if (response.status === 201) {
      return await response.json(); 
    } else {
      throw new Error(response.message || "Failed to add Page.");
    }
  };

  updatePage = async (
    slug: string,
    pageDTO: PageDTO,
    token: string,
    imageUrl: File | null
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "pageDTO",
      new Blob([JSON.stringify(pageDTO)], { type: "application/json" })
    );

    if (imageUrl) {
      formData.append("file", imageUrl);
    }

    const response = await this.api<FormData, string>(
      `/pages/update/${slug}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update Page.");
    }
  };

  deletePage = async (slug: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/pages/delete/${slug}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete Page.");
    }
  };

  getPageBySlug = async (slug: string): Promise<PageDTO> => {
    const response = await this.api<null, PageDTO>(
      `/pages/${slug}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch Page.");
    }
  };

  getAllPages = async (): Promise<PageDTO[]> => {
    const response = await this.api<null, PageDTO[]>(
      "/pages",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch Pages.");
    }
  };
}

export default PageService;
