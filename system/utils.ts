export const determinePath = (path: string) => {
    if (typeof window !== "undefined" && window.location.host === "localhost:8080") {
        return `/admin/${path}`;
    }
    return path;
};
