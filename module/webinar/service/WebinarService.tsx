import ApiServer from "@/module/system/service/ApiServer";
import WebinarDTO from "../dto/WebinarDTO";

class WebinarService extends ApiServer {
  // Adaugă webinar
  addWebinar = async (webinarDTO: WebinarDTO, token: string): Promise<string> => {
    const response = await this.api<WebinarDTO, string>(
      `/webinars/create`,
      "POST",
      webinarDTO,
      token
    );
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to add webinar");
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
