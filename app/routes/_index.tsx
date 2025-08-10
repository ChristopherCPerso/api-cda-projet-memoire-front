import type { LoaderFunctionArgs } from "react-router";
import { CardImageTitle } from "~/components/card/CardImageTitle";
import { Searchbar } from "~/components/SearchBar/index";

export function loader({ context }: LoaderFunctionArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home() {
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
      <section className="relative h-[700px] w-full">
        <img
          src="/img/home-bg.jpg"
          className="z-0 h-full w-full object-cover"
          alt=""
        />

        <div className="absolute top-0 left-0 z-20 flex h-full w-1/2 items-center ps-28 backdrop-blur-xs">
          <div className="flex w-1/2 flex-col gap-6">
            <h1 className="w-3/4 text-white">Rechercher un restaurant</h1>
            <Searchbar isFiltered={false} />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <div>
          <h2>Les petits nouveaux</h2>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <div>
          <h2>Les mieux notés</h2>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <div>
          <h2>Les restaus français</h2>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
            <CardImageTitle {...restaurant} />
          </div>
        </div>
      </section>
    </>
  );
}

export function meta() {
  return [
    { title: "Atecnadvisor" },
    { name: "description", content: "Bienvenue sur le site interne d'atecna" },
  ];
}
