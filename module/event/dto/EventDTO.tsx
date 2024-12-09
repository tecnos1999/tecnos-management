import ImageDTO from "@/module/image/dto/ImageDTO";

export default interface EventDTO {
  eventCode: string; 
  title: string; 
  description: string; 
  externalLink?: string; 
  createdAt?: string; 
  updatedAt?: string; 
  image?: ImageDTO; 
}
