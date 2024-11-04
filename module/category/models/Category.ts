import { Subcategory } from "@/module/subcategory/models/Subcategory";
import { MainSection } from "../enum/MainSection";

export interface Category{
    name: string;
    createdAt: Date;
    updatedAt: Date;
    mainSection: MainSection;
    subCategories: Subcategory[];
}