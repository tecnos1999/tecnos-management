import ApiServer from "@/module/system/service/ApiServer";
import TagDTO from "../dto/TagDTO";

class TagService extends ApiServer {
  addTag = async (tagDTO: TagDTO, token: string): Promise<string> => {
    const response = await this.api<TagDTO, string>(
      `/tags/create`,
      "POST",
      tagDTO,
      token
    );
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to add tag");
    }
  };

  updateTag = async (
    name: string,
    tagDTO: TagDTO,
    token: string
  ): Promise<string> => {
    const response = await this.api<TagDTO, string>(
      `/tags/update/${name}`,
      "PUT",
      tagDTO,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to update tag");
    }
  };

  deleteTag = async (name: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/tags/delete/${name}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to delete tag");
    }
  };

  getAllTags = async (): Promise<TagDTO[]> => {
    const response = await this.api<null, TagDTO[]>(
      `/tags`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tags");
    }
  };

  getTagByName = async (name: string): Promise<TagDTO> => {
    const response = await this.api<null, TagDTO>(
      `/tags/${name}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tag");
    }
  };
}

export default TagService;
