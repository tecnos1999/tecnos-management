import ApiServer from "@/module/system/service/ApiServer";
import NewsDTO from "../dto/NewsDTO";

class NewsService extends ApiServer {
  addNews = async (newsDTO: NewsDTO): Promise<string> => {
    const response = await this.api<NewsDTO, string>(
      `/news`,
      "POST",
      newsDTO,
      ""
    );
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to add news.");
    }
  };

  updateNews = async (uniqueCode: string, newsDTO: NewsDTO): Promise<string> => {
    const response = await this.api<NewsDTO, string>(
      `/news/${uniqueCode}`,
      "PUT",
      newsDTO,
      ""
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to update news.");
    }
  };

  deleteNews = async (uniqueCode: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/news/${uniqueCode}`,
      "DELETE",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to delete news.");
    }
  };

  getAllNews = async (): Promise<NewsDTO[]> => {
    const response = await this.api<null, NewsDTO[]>(
      `/news`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch news.");
    }
  };
}

export default NewsService;
