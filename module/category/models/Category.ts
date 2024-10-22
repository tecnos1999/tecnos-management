import { Subcategory } from "@/module/subcategory/models/Subcategory";

export interface Category{
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subcategory: Subcategory[];
}