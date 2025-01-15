import ApiServer from "@/module/system/service/ApiServer";
import { InfoCardDTO } from "../dto/InfoCardDTO";

class InfoCardService extends ApiServer {
  addInfoCard = async (
    infoCardDTO: InfoCardDTO,
    token: string
  ): Promise<string> => {
    const response = await this.api<InfoCardDTO, string>(
      "/infocard/create",
      "POST",
      infoCardDTO,
      token,
    );
  
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to add InfoCard.");
    }
  };
  

  updateInfoCard = async (
    code: string,
    infoCardDTO: InfoCardDTO,
    token: string
  ): Promise<string> => {
   
    const response = await this.api<InfoCardDTO, string>(
      `/infocard/update/${code}`,
      "PUT",
      infoCardDTO,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update InfoCard.");
    }
  };

  deleteInfoCard = async (code: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/infocard/delete/${code}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete InfoCard.");
    }
  };

  getInfoCardByCode = async (code: string): Promise<InfoCardDTO> => {
    const response = await this.api<null, InfoCardDTO>(
      `/infocard/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch InfoCard.");
    }
  };

  getAllInfoCards = async (): Promise<InfoCardDTO[]> => {
    const response = await this.api<null, InfoCardDTO[]>(
      "/infocard",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch InfoCards.");
    }
  };
}

export default InfoCardService;
