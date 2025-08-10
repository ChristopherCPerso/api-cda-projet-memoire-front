import type { FilteredButtonProps } from "~/types/TypeSearchBar";
import { Icon } from "~/ui/Icon";

export default function FilteredButon({ icon, title }: FilteredButtonProps) {
  const handleButton = () => {
    console.log("Je clique sur le bouton");
  };

  return (
    <button
      className="border-coral hover:border-coral-dark hover:bg-coral/10 text-coral font-open flex w-fit cursor-pointer flex-row items-center rounded-lg border p-2.5 transition-all duration-300"
      onClick={handleButton}
    >
      <Icon name={icon} />
      {title}
    </button>
  );
}
