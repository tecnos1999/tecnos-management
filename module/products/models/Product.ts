import { ItemCategory } from "@/module/itemcategory/models/ItemCategory";
import { Image } from "@/module/image/models/Image";
import { Category } from "@/module/category/models/Category";
import { Subcategory } from "@/module/subcategory/models/Subcategory";

export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    broschure: string;
    tehnic: string;
    catalog: string;
    linkVideo: string;
    createdAt: Date;
    updatedAt: Date;
    itemCategory: ItemCategory;
    category: Category;
    subCategory: Subcategory;
    images: Image[];
}
