export interface ProductDTO {
    sku: string;
    name: string;
    description: string;
    itemCategory: string | null;  
    image: string | null;
    broschure: string | null;
    tehnic: string | null ;
    catalog: string | null;
    linkVideo: string | null;
}