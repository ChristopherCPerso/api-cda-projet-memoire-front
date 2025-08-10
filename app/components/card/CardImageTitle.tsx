import { NavLink } from "react-router";
import type { TypeCardImageTitle } from "~/types/TypeCardImageTitle";
import { RatingStars } from "../ui/RatingStars";

export function CardImageTitle({
  id,
  name,
  rating,
  address,
  postalcode,
  city,
  urlImg,
}: TypeCardImageTitle) {
  return (
    <NavLink to={`/restaurant/${id}`}>
      <div className="w-full scale-95 rounded-md shadow-md transition-transform duration-300 ease-out hover:scale-100 hover:shadow-lg">
        <img
          src={urlImg}
          alt=""
          className="h-[232px] w-full rounded-t-md object-cover"
        />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-row justify-between">
            <h3 className="">{name}</h3>
            <RatingStars rating={rating!} />
          </div>
          <div className="flex flex-row gap-2 text-base">
            <div className="rounded-full bg-gray-200 p-2">
              Cuisine Française
            </div>
            <div className="rounded-full bg-gray-200 p-2">
              Cuisine Traditionnelle
            </div>
          </div>
          <div>
            <p>{address}</p>
            <p>
              {postalcode} {city}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
