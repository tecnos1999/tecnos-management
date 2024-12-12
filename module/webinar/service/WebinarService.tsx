import ApiServer from "@/module/system/service/ApiServer";
import WebinarDTO from "../dto/WebinarDTO";

class WebinarService extends ApiServer {

  addWebinar = async (
    webinarDTO: WebinarDTO,
    image: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
  
    formData.append(
      "webinar",
      new Blob([JSON.stringify(webinarDTO)], { type: "application/json" })
    );
  
    if (image) {
      formData.append("image", image);
    }
  
    const response = await this.api<FormData, string>(
      `/webinars/create`, 
      "POST",
      formData,
      token
    );
  
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to add webinar with image");
    }
  };

   // Actualizează un webinar
   updateWebinar = async (
    webCode: string, 
    webinarDTO: WebinarDTO, 
    image: File | null, 
    token: string
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "webinar",
      new Blob([JSON.stringify(webinarDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await this.api<FormData, string>(
      `/webinars/update`, 
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to update webinar");
    }
  };
  

  // Șterge webinar
  deleteWebinar = async (webCode: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/webinars/delete/${webCode}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to delete webinar");
    }
  };

  // Obține toate webinariile
  getAllWebinars = async (): Promise<WebinarDTO[]> => {
    const response = await this.api<null, WebinarDTO[]>(
      `/webinars`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch webinars");
    }
  };

  // Obține un webinar după cod
  getWebinarByCode = async (webCode: string): Promise<WebinarDTO> => {
    const response = await this.api<null, WebinarDTO>(
      `/webinars/${webCode}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch webinar");
    }
  };

  
}

export default WebinarService;
