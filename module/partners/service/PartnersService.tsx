import ApiServer from "@/module/system/service/ApiServer";
import { PartnerDTO } from "../dto/PartnerDTO";

class PartnersService extends ApiServer {

  addPartner = async (
    partnerDTO: PartnerDTO,
    image: File | null,
    catalogFile: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("partner", new Blob([JSON.stringify(partnerDTO)], { type: "application/json" }));
    if (image) formData.append("image", image);
    if (catalogFile) formData.append("catalogFile", catalogFile);

    const response = await this.api<FormData, string>(
      `/partners/create`,
      "POST",
      formData,
      token,
    );

    if (response.status === 201) {
      return await response.text(); 
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to add partner");
    }
  };

  updatePartner = async (
    name: string,
    partnerDTO: PartnerDTO,
    image: File | null,
    catalogFile: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("partner", new Blob([JSON.stringify(partnerDTO)], { type: "application/json" }));
    if (image) formData.append("image", image);
    if (catalogFile) formData.append("catalogFile", catalogFile);

    const response = await this.api<FormData, string>(
      `/partners/update/${name}`,
      "PUT",
      formData,
      token,
    );

    if (response.status === 200) {
      return await response.text(); 
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to update partner");
    }
  };

  deletePartner = async (name: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/partners/delete/${name}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text(); 
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to delete partner");
    }
  };

  getPartnerByName = async (name: string): Promise<PartnerDTO> => {
    const response = await this.api<null, PartnerDTO>(
      `/partners/${name}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch partner");
    }
  };

  getAllPartners = async (): Promise<PartnerDTO[]> => {
    const response = await this.api<null, PartnerDTO[]>(
      `/partners`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch partners");
    }
  };
}

export default PartnersService;
