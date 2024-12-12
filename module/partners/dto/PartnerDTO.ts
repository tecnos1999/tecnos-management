import ImageDTO from "@/module/image/dto/ImageDTO";

export interface PartnerDTO {
  name: string;
  description: string;
  catalogFile?: string; 
  createdAt?: string;
  updatedAt?: string;
  image?: ImageDTO;
}
