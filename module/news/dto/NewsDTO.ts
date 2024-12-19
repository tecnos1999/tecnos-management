interface NewsDTO {
    code: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    tags: { name: string; color: string }[];
    icon: string;
  }
  
  export default NewsDTO;
  