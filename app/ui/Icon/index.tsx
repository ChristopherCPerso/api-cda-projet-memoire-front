import type { ClassValue } from "clsx";
import icons, { type IconName } from "~/assets/icons";
import { cn } from "~/utils/ui";

type IconProps = {
  name: IconName;
  className?: ClassValue;
};

export function Icon({ name, className }: IconProps) {
  const iconName: IconName = name;

  const IconComp = icons[iconName];

  return <IconComp className={cn("size-8", className)} />;
}
