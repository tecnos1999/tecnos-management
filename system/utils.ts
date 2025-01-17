import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const determinePath = (path: string) => {
  return path ? `/admin/${path}` : `/admin/`;
};



export const freeIcons: { name: string; icon: IconDefinition }[] = (() => {
  const uniqueNames = new Set<string>();
  return Object.keys(Icons)
    .filter((key) => key.startsWith("fa"))
    .reduce((acc, key) => {
      const name = key.replace("fa", "").toLowerCase();
      if (!uniqueNames.has(name)) {
        uniqueNames.add(name);
        acc.push({ name, icon: Icons[key as keyof typeof Icons] as IconDefinition });
      }
      return acc;
    }, [] as { name: string; icon: IconDefinition }[]);
})();



export const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
