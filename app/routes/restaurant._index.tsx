import { NavLink, type LoaderFunctionArgs } from "react-router";
import { CardImageTitle } from "~/components/card/CardImageTitle";
import { Searchbar } from "~/components/SearchBar";
import { Icon } from "~/ui/Icon";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
};

export default function PageRestaurant() {
  const restaurant = {
    title: "Meet the meat",
    rating: 5,
    street: "25 bd de la République",
    postalcode: 31000,
    city: "Toulouse",
    urlImg:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/63/cc/1d/du-rouge-du-blanc-du.jpg?w=900&h=500&s=1",
  };

  return (
    <>
      <section className="container mx-auto flex flex-col gap-12">
        <div className="flex w-full flex-row justify-between">
          <Searchbar isFiltered={true} className="w-1/3" />
          <NavLink
            to="/"
            className="flex-rox text-coral font-open mt-3 flex h-5 w-full items-center justify-end gap-1 font-semibold"
          >
            Ajouter un restaurant
            <Icon name="add" />
          </NavLink>
        </div>

        <div className="p-5">
          <h1 className="font-urbanist text-red-400">Tous les Restaurants</h1>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
          </div>
        </div>
      </section>
    </>
  );
}
