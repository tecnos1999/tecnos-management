import ApiServer from "@/module/system/service/ApiServer";
import { SeriesDTO } from "../dto/SeriesDTO";

class SeriesService extends ApiServer {

    
  addSeries = async (
    seriesDTO: SeriesDTO,
    image: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append(
      "series",
      new Blob([JSON.stringify(seriesDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await this.api<FormData, string>(
      "/series/create",
      "POST",
      formData,
      token
    );

    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to create series");
    }
  };


  updateSeries = async (
    code: string,
    seriesDTO: SeriesDTO,
    image: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append(
      "series",
      new Blob([JSON.stringify(seriesDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await this.api<FormData, string>(
      `/series/update/${code}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to update series");
    }
  };

 
  deleteSeries = async (code: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/series/delete/${code}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to delete series");
    }
  };


  getSeriesByCode = async (code: string): Promise<SeriesDTO> => {
    const response = await this.api<null, SeriesDTO>(
      `/series/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch series by code");
    }
  };

  getAllSeries = async (): Promise<SeriesDTO[]> => {
    const response = await this.api<null, SeriesDTO[]>(
      "/series",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch series");
    }
  };
}

export default SeriesService;
