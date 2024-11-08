export const determinePath = (path: string) => {
    if (typeof window !== "undefined" && window.location.host === "localhost:8080") {
      return path ? `/admin/${path}` : `/admin/`;
    }
    return path;
  };
  