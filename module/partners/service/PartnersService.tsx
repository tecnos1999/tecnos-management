import ApiServer from "@/module/system/service/ApiServer";
import PartnerDTO from "../dto/PartnersDTO";

class PartnersService extends ApiServer {
  // Add Partner
  addPartner = async (partnerDTO: PartnerDTO, token: string): Promise<string> => {
    const response = await this.api<PartnerDTO, string>(
      `/partners/create`,
      "POST",
      partnerDTO,
      token
    );
    if (response.status === 201) {
      const data = await response.text();
      return data; // Success message: "Partner added successfully."
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to add partner"
      );
    }
  };

  // Delete Partner
  deletePartner = async (name: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/partners/delete/${name}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data; // Success message: "Partner deleted successfully."
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to delete partner"
      );
    }
  };

  // Get Partner by Name
  getPartnerByName = async (name: string): Promise<PartnerDTO> => {
    const response = await this.api<null, any>(
      `/partners/${name}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as PartnerDTO; // Partner data object
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch partner"
      );
    }
  };

  // Get All Partners
  getAllPartners = async (): Promise<PartnerDTO[]> => {
    const response = await this.api<null, any>(
      `/partners`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as PartnerDTO[]
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch partners"
      );
    }
  };
}

export default PartnersService;
