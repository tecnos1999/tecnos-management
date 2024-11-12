// src/interfaces/Product.ts

import { ItemCategory } from "@/module/itemcategory/models/ItemCategory";
import { Image } from "@/module/image/models/Image";
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
    images: Image[];
}
