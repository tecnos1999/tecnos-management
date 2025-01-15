import TagDTO from "@/module/tags/dto/TagDTO";

interface NewsDTO {
    code?: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    tags: TagDTO[];
    icon: string;
    link: string;
  }
  
  export default NewsDTO;
  