import ApiServer from "@/module/system/service/ApiServer";
import CarouselDTO from "../dto/CarouselDTO";

class CarouselService extends ApiServer {
    addCarouselItem = async (
        carouselDTO: CarouselDTO,
        file: File,
        token: string
      ): Promise<string> => {
        const formData = new FormData();
        formData.append("carousel", new Blob([JSON.stringify(carouselDTO)], { type: "application/json" }));
        formData.append("file", file);
      
        const response = await this.api<FormData, string>(
          `/carousel/create`,
          "POST",
          formData,
          token,
        );
        if (response.status === 201) {
          return await response.text();
        } else {
          throw new Error(response.message || "Failed to add carousel item.");
        }
      };
      

  updateCarouselItem = async (
    code: string,
    carouselDTO: CarouselDTO,
    file: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append(
        "carousel",
        new Blob([JSON.stringify(carouselDTO)], { type: "application/json" })
      );
    if (file) {
      formData.append("file", file);
    }

    const response = await this.api<FormData, string>(
      `/carousel/update/${code}`,
      "PUT",
      formData,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update carousel item.");
    }
  };

  deleteCarouselItem = async (code: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/carousel/delete/${code}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete carousel item.");
    }
  };

  getAllCarouselItems = async (): Promise<CarouselDTO[]> => {
    const response = await this.api<null, CarouselDTO[]>(
      `/carousel`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch carousel items.");
    }
  };

  getAllImages = async (): Promise<CarouselDTO[]> => {
    const response = await this.api<null, CarouselDTO[]>(
      `/carousel/images`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch images.");
    }
  };

  getAllVideos = async (): Promise<CarouselDTO[]> => {
    const response = await this.api<null, CarouselDTO[]>(
      `/carousel/videos`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch videos.");
    }
  };

  getCarouselItemsOrderedByCreatedAt = async (): Promise<CarouselDTO[]> => {
    const response = await this.api<null, CarouselDTO[]>(
      `/carousel/ordered`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch ordered items.");
    }
  };
}

export default CarouselService;
