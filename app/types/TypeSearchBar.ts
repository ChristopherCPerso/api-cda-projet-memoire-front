import type { ClassValue } from "clsx";
import type { IconName } from "~/assets/icons";

export interface SearchBar {
  isFiltered: boolean;
  className?: ClassValue;
}

export interface FilteredButtonProps {
  icon: IconName;
  title?: string;
}
