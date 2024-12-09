import ApiServer from "@/module/system/service/ApiServer";
import TestimonialDTO from "../dto/TestimonialDTO";

class TestimonialService extends ApiServer {
  addTestimonial = async (
    testimonialDTO: TestimonialDTO,
    token: string
  ): Promise<string> => {
    const response = await this.api<TestimonialDTO, string>(
      `/testimonials/create`,
      "POST",
      testimonialDTO,
      token
    );
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error("Failed to add testimonial");
    }
  };

  deleteTestimonial = async (code: string, token: string): Promise<string> => {
    const response = await this.api<null, string>(
      `/testimonials/delete/${code}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      return await response.text();
    } else {
      throw new Error("Failed to delete testimonial");
    }
  };

  getAllTestimonials = async (): Promise<TestimonialDTO[]> => {
    const response = await this.api<null, TestimonialDTO[]>(
      `/testimonials`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch testimonials");
    }
  };

  getTestimonialByCode = async (code: string): Promise<TestimonialDTO> => {
    const response = await this.api<null, TestimonialDTO>(
      `/testimonials/${code}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch testimonial");
    }
  };
}

export default TestimonialService;
