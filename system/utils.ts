export const determinePath = (path: string) => {
  return path ? `/admin/${path}` : `/admin/`;
};
