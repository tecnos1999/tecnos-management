export interface BlogDTO {
    code: string;
    title: string;
    description: string;
    mainPhotoUrl: string | null;
    broschureUrl: string | null;
    viewUrl: string | null;
    seriesCode: string | null;
    active: boolean;
    captionCodes: string[];
  }
  