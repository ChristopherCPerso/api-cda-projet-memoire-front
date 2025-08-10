import type { LoaderFunctionArgs } from "react-router";
import { BentoMosaic } from "~/components/BentoMosaic";
import { RatingStars } from "~/components/ui/RatingStars";
import { Icon } from "~/ui/Icon";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
};

export default function PageRestaurantDetail() {
  const restaurant = {
    title: "Meet the meat",
    rating: 5,
    street: "25 bd de la République",
    postalcode: 31000,
    city: "Toulouse",
    phone: "05 62 61 58 96",
    restaurantImages: [
      { link: "https://picsum.photos/600/600?random=1" },
      { link: "https://picsum.photos/600/600?random=2" },
      { link: "https://picsum.photos/600/600?random=3" },
      { link: "https://picsum.photos/600/600?random=4" },
      { link: "https://picsum.photos/600/600?random=5" },
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt illum dolore tenetur laborum autem natus, voluptate consequatur reprehenderit repudiandae? Quisquam pariatur repudiandae totam temporibus.",
  };

  return (
    <section className="font-open container mx-auto flex flex-col gap-6">
      <div className="flex flex-row items-center gap-12">
        <h1 className="font-urbanist text-coral">{restaurant.title}</h1>
        <RatingStars rating={restaurant.rating} />
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <Icon name="cook" className="text-green-dark" />
          <p>Française </p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Icon name="location" className="text-green-dark" />
          <p>{`${restaurant.street} ${restaurant.postalcode} ${restaurant.city}`}</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Icon name="phone" className="text-green-dark" />
          <p>{restaurant.phone}</p>
        </div>
      </div>

      <BentoMosaic images={restaurant.restaurantImages} />

      <div className="flex flex-row gap-5 py-3">
        <div className="flex flex-col gap-12">
          <p className="text-base">{restaurant.description}</p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-blue-mid">Type de règlement</p>
              <hr className="mb-3 text-gray-300" />
              <p>CB, Ticket Restaurant, Chèque</p>
            </div>
            <div>
              <p className="text-blue-mid">Type de cuisine</p>
              <hr className="mb-3 text-gray-300" />
              <p>Française</p>
            </div>
            <div>
              <p className="text-blue-mid">Réservation</p>
              <hr className="mb-3 text-gray-300" />
              <p>Oui</p>
            </div>
          </div>
        </div>

        <div className="w-1/4">
          <p className="text-blue-mid text-xl">Horaire</p>
          <div className="flex flex-col p-1 text-base font-semibold">
            <div className="flex flex-row justify-between">
              <div className="w-1/3">Lundi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-gray-100 p-1">
              <div className="w-1/3">Mardi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between p-1">
              <div className="w-1/3">Mercredi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-gray-100 p-1">
              <div className="w-1/3">Jeudi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between p-1">
              <div className="w-1/3">Vendredi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-gray-100 p-1">
              <div className="w-1/3">Samedi</div>
              <div>
                <p>11h00 - 14h00</p>
                <p>19h00 - 23h30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between p-1">
              <div className="w-1/3">Dimanche</div>
              <div>
                <p>Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 overflow-hidden rounded-lg">
        <div className="w-full">
          <iframe
            width="100%"
            height="300"
            marginHeight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Toulouse+(TEst)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.mapsdirections.info/fr/calculer-la-population-sur-une-carte">
              calculer la population sur la carte
            </a>
          </iframe>
        </div>
      </div>
    </section>
  );
}
