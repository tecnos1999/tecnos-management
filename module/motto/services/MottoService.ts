import ApiServer from "@/module/system/service/ApiServer";
import MottoDTO from "../dto/MottoDTO";

class MottoService extends ApiServer {
  async getAllMottos(): Promise<MottoDTO[]> {
    const response = await this.api<null, MottoDTO[]>("/motto", "GET", null, "");
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch mottos.");
    }
  }

  async addMotto(newMotto: MottoDTO, token: string): Promise<string> {
    const response = await this.api<MottoDTO, string>(
      "/motto/create",
      "POST",
      newMotto,
      token
    );
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to add motto.");
    }
  }

  async updateMotto(code: string, updatedMotto: MottoDTO, token: string): Promise<string> {
    const response = await this.api<MottoDTO, string>(
      `/motto/update/${code}`,
      "PUT",
      updatedMotto,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update motto.");
    }
  }

  async deleteMotto(code: string, token: string): Promise<string> {
    const response = await this.api<null, string>(
      `/motto/delete/${code}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete motto.");
    }
  }
}

export default MottoService;
