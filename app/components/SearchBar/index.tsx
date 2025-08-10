import { Icon } from "~/ui/Icon";

import FilteredButon from "./components/FilteredButton";
import type { SearchBar } from "~/types/TypeSearchBar";
import { cn } from "~/utils/ui";

export function Searchbar({ isFiltered, className }: SearchBar) {
  return (
    <>
      <div className={cn("flex w-full flex-col gap-3", className)}>
        <div className="shadow-atecna flex flex-row gap-2 rounded-full bg-white p-2 px-4">
          <Icon name="searchIcon" className="text-gray-400" />
          <label htmlFor="searchBar" className="sr-only">
            {" "}
            Rechercher un restaurant
          </label>
          <input
            id="searchBar"
            type="text"
            placeholder="Recherche un restaurant"
            className="font-open w-full px-2"
          />
        </div>
        {isFiltered ? (
          <div className="flex flex-row justify-between gap-3">
            <FilteredButon icon="filter" />
            <FilteredButon icon="cook" title="Cuisine" />
            <FilteredButon icon="creditCard" title="Type de paiement" />
          </div>
        ) : null}
      </div>
    </>
  );
}
