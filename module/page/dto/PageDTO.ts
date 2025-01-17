import { SectionDTO } from "@/module/section/dto/SectionDTO";

export interface PageDTO {
    slug: string;
    title: string;
    subtitle?: string;
    imageUrl?: string;
    link?: string;
    sections?: SectionDTO[];
    subPages?: PageDTO[];
    products?: string[]; 
  }