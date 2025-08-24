import { useEffect, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { BentoMosaic } from "~/components/BentoMosaic";
import { RatingStars } from "~/components/ui/RatingStars";
import type { Restaurants } from "~/types/TypesRestaurants";
import { Icon } from "~/ui/Icon";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params;
  const apiId = id.id;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/restaurants/${apiId}`,
    );
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    console.error("Une erreur est survenue : ", err);
    throw new Response("Impossible de contacter le serveur de l'API.", {
      status: 503,
    });
  }
};

export default function PageRestaurantDetail() {
  const restaurant = useLoaderData<Restaurants>();
  const [rating, setRating] = useState<number>();

  useEffect(() => {
    let ratingArray: number[] = [];

    restaurant.reviews.map((data) => {
      ratingArray.push(data.rating);
    });
    if (ratingArray.length === 0) setRating(0);

    const ratingArraySum = ratingArray.reduce((acc, val) => acc + val, 0);
    const ratingArrayMoy = ratingArraySum / ratingArray.length;

    const decimal = ratingArrayMoy - Math.floor(ratingArrayMoy);

    if (decimal < 0.5) {
      setRating(Math.floor(ratingArrayMoy));
    } else {
      setRating(Math.ceil(ratingArrayMoy));
    }
  }, [restaurant.reviews]);

  const formatTime = (dateString: Date) => {
    const date = new Date(dateString);
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const localHour = `${hour}h${minute === 0 ? "00" : minute}`;
    return localHour;
  };

  return (
    <section className="font-open container mx-auto flex flex-col gap-6">
      <div className="flex flex-row items-center gap-12">
        <h1 className="font-urbanist text-coral">{restaurant.name}</h1>
        <RatingStars rating={rating!} />
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <Icon name="cook" className="text-green-dark" />
          <p>Française </p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Icon name="location" className="text-green-dark" />
          <p>{`${restaurant.address} ${restaurant.postalCode} ${restaurant.city}`}</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Icon name="phone" className="text-green-dark" />
          <p>{restaurant.phone}</p>
        </div>
      </div>

      <BentoMosaic images={restaurant.restaurantImages} />

      <div className="flex flex-row gap-5 py-3">
        <div className="flex w-3/4 flex-col gap-12">
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
            {restaurant.openingHours.map((data) => {
              return (
                <div key={data.id} className="flex flex-row justify-between">
                  <div className="w-1/3">{data.daysOfWeek}</div>
                  <div>
                    {data.isClosed ? (
                      "Fermé"
                    ) : (
                      <>
                        <p>
                          {formatTime(data.openTime)} -
                          {formatTime(data.closeTime)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mb-8 overflow-hidden rounded-lg"></div>
    </section>
  );
}
