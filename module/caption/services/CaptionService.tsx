import ApiServer from "@/module/system/service/ApiServer";
import { CaptionDTO } from "../dto/CaptionDTO";

class CaptionService extends ApiServer {
  addCaption = async (
    captionDTO: CaptionDTO,
    image: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "caption",
      new Blob([JSON.stringify(captionDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("file", image); 
    }

    const response = await this.api<FormData, string>(
      "/captions/create",
      "POST",
      formData,
      token
    );

    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to add caption.");
    }
  };

  updateCaption = async (
    code: string,
    captionDTO: CaptionDTO,
    image: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "caption",
      new Blob([JSON.stringify(captionDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("file", image);
    }

    const response = await this.api<FormData, string>(
      `/captions/update/${code}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update caption.");
    }
  };

  deleteCaption = async (code: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/captions/delete/${code}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete caption.");
    }
  };

  getCaptionByCode = async (code: string): Promise<CaptionDTO> => {
    const response = await this.api<null, CaptionDTO>(
      `/captions/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch caption.");
    }
  };

  getAllCaptions = async (): Promise<CaptionDTO[]> => {
    const response = await this.api<null, CaptionDTO[]>(
      `/captions`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch captions.");
    }
  };
}

export default CaptionService;
