import { NavLink, useLoaderData } from "react-router";
import { CardImageTitle } from "~/components/card/CardImageTitle";
import { Searchbar } from "~/components/SearchBar";
import { Icon } from "~/ui/Icon";
import type { Restaurants } from "~/types/TypesRestaurants";
import type { TypeCardImageTitle } from "~/types/TypeCardImageTitle";

export const loader = async () => {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/api/restaurants`);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (err: unknown) {
    console.error("Une erreur est survenue : ", err);
    throw new Response("Impossible de contacter le serveur de l'API.", {
      status: 503,
    });
  }
};

export default function PageRestaurant() {
  const restaurants = useLoaderData<Restaurants[]>();
  const cardData: TypeCardImageTitle[] = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    postalcode: restaurant.postalCode,
    city: restaurant.city,
    urlImg: restaurant.restaurantImages[0]?.link ?? "",
  }));

  return (
    <>
      <section className="container mx-auto flex flex-col gap-12">
        <div className="flex w-full flex-row justify-between">
          <Searchbar isFiltered={true} className="w-1/3" />
          <NavLink
            to="/restaurant/add"
            className="flex-rox text-coral font-open mt-3 flex h-5 w-full items-center justify-end gap-1 font-semibold"
          >
            Ajouter un restaurant
            <Icon name="add" />
          </NavLink>
        </div>

        <div className="p-5">
          <h1 className="font-urbanist text-red-400">Tous les Restaurants</h1>

          {cardData.length > 0 ? (
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
              {cardData.map((data) => {
                return <CardImageTitle key={data.id} {...data} />;
              })}
            </div>
          ) : (
            <div className="h-56 text-center">
              {" "}
              Encore aucun restaurant n'est répertorié
            </div>
          )}
        </div>
      </section>
    </>
  );
}
