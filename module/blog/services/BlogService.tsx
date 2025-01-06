import ApiServer from "@/module/system/service/ApiServer";
import { BlogDTO } from "../dto/BlogDTO";

class BlogService extends ApiServer {
  addBlog = async (
    blogDTO: BlogDTO,
    image: File | null,
    broschure: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "blog",
      new Blob([JSON.stringify(blogDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    if (broschure) {
      formData.append("broschure", broschure);
    }

    const response = await this.api<FormData, string>(
      "/blogs/create",
      "POST",
      formData,
      token
    );

    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to add blog.");
    }
  };

  updateBlog = async (
    blogCode: string,
    blogDTO: BlogDTO,
    image: File | null,
    broschure: File | null,
    token: string
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "blog",
      new Blob([JSON.stringify(blogDTO)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    if (broschure) {
      formData.append("broschure", broschure);
    }

    const response = await this.api<FormData, string>(
      `/blogs/update/${blogCode}`,
      "PUT",
      formData,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to update blog.");
    }
  };

  deleteBlog = async (blogCode: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/blogs/delete/${blogCode}`,
      "DELETE",
      null,
      token
    );

    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error(response.message || "Failed to delete blog.");
    }
  };

  getBlogByCode = async (blogCode: string): Promise<BlogDTO> => {
    const response = await this.api<null, BlogDTO>(
      `/blogs/${blogCode}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch blog.");
    }
  };

  getAllBlogs = async (): Promise<BlogDTO[]> => {
    const response = await this.api<null, BlogDTO[]>(
      "/blogs",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch blogs.");
    }
  };
}

export default BlogService;
