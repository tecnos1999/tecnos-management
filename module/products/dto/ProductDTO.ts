import ImageDTO from "@/module/image/dto/ImageDTO";

export interface ProductDTO {
    sku: string;
    name: string;
    description: string;
    category: string | null;
    subCategory: string | null;
    itemCategory: string | null;  
    images: ImageDTO[] | null;
    broschure: string | null;
    tehnic: string | null ;
    catalog: string | null;
    linkVideo: string | null;
}