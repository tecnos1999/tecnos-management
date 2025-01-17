import ApiServer from "@/module/system/service/ApiServer";
import { SectionDTO } from "../dto/SectionDTO";

class SectionService extends ApiServer {
  addSection = async (
    sectionDTO: SectionDTO,
    token: string,
    image?: File
  ): Promise<SectionDTO> => {
    const formData = new FormData();

    formData.append(
      "section",
      new Blob([JSON.stringify(sectionDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await this.api<FormData, SectionDTO>(
      "/sections/create",
      "POST",
      formData,
      token
    );

    if (response.status === 201) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to add Section.");
    }
  };

  deleteSection = async (sectionId: number, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/sections/delete/${sectionId}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete Section.");
    }
  };

  getSectionsByPageId = async (pageId: number): Promise<SectionDTO[]> => {
    const response = await this.api<null, SectionDTO[]>(
      `/sections/page/${pageId}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch Sections.");
    }
  };

  updateSection = async (
    sectionId: number,
    sectionDTO: SectionDTO,
    token: string,
    image?: File
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "section",
      new Blob([JSON.stringify(sectionDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await this.api<FormData, string>(
      `/sections/update/${sectionId}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update Section.");
    }
  };
}

export default SectionService;
