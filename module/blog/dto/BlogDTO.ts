import { CaptionDTO } from "@/module/caption/dto/CaptionDTO";

export interface BlogDTO {
    code: string;
    title: string;
    description: string;
    mainPhotoUrl: string | null;
    broschureUrl: string | null;
    viewUrl: string | null;
    seriesCode: string | null;
    active: boolean;
    captions : CaptionDTO[];
    skuProducts: string[];
  }
  