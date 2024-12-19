import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const determinePath = (path: string) => {
  return path ? `/admin/${path}` : `/admin/`;
};



export const freeIcons: { name: string; icon: IconDefinition }[] = Object.keys(Icons)
  .filter((key) => key.startsWith("fa")) // Doar iconițele care încep cu `fa`
  .map((key) => ({
    name: key.replace("fa", "").toLowerCase(), // Transformăm numele în format prietenos
    icon: Icons[key as keyof typeof Icons] as IconDefinition,
  }));
