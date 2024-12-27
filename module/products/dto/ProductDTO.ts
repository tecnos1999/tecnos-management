
export interface ProductDTO {
    sku: string;
    name: string;
    description: string;
    category: string | null; 
    subCategory: string | null; 
    itemCategory: string | null; 
    images?: string[] | null; 
    imagesToKeep?: string[]  | null;
    imagesToRemove?: string[] | null; 
    broschure: string | null;
    tehnic: string | null;
    linkVideo: string | null;
    partnerName: string | null;
    tags: string[] | null;
}
